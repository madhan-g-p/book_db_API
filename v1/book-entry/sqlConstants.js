const {check} = require("express-validator");
const {convertUnderScoresToCamelCase, finalValidator} = require("../../utilities/utilityFunctions");

const isValidDate= (value)=>new Date(value).toString() !== 'Invalid Date';



const isbnCheck =[check("isbn","isbn number must not be empty").notEmpty().isNumeric(),
(req,res,next)=>finalValidator(req,res,next)    
];

const bookDetailsCheck =[check("title","Title must not be empty").notEmpty().isAlpha(),
                check("author","Author Name must not be empty").notEmpty().isAlpha(),
                check("isbn","ISBn number must not be empty").notEmpty().isNumeric(),
                check("publicationDate").custom((value,{req})=>{
                    // publication date should not be future date 
                    if(isValidDate(value) && new Date() > new Date(value)){
                        return true
                    }else{
                        throw {message: "failure",statusCode: 406,
                        detail: "Publication Date should be a valid date",
                        path: "Error While Creating Booking Entry"};
                    }
                }),
(req,res,next)=>finalValidator(req,res,next)    
];

const SQL ={
    getBooks: async(client,params)=>{
       let dbResp=  await client.query(`SELECT * FROM books.details; `);
       if(dbResp.rowCount >=0 ){
        return dbResp.rows.map(convertUnderScoresToCamelCase);
       } else{
        throw { msg: "failure", desc: "error while fetching book details", path: "GET /book-entry api"}
       }
    },
    getBookOfISBN: async(client,params)=>{
        let dbResp =  await client.query(`SELECT * FROM books.details WHERE isbn = $1`,params);
        if(dbResp.rowCount>=0){
            return dbResp.rows.map(convertUnderScoresToCamelCase);
        }else{
            throw {msg: "failure",desc: "error while fetching book detail", path: "GET /vehicle-models api"}
        }
    },
    createBookEntry: async(client,params)=>{

        let dbResp = await client.query(` INSERT INTO books.details (title,author,isbn,publication_date)
                                                VALUES ($1,$2,$3,$4) RETURNING * ;`,params);
        if(dbResp.rowCount > 0){
            return dbResp.rows.map(convertUnderScoresToCamelCase);
        }else{
            throw {msg: "failure", desc: "error while creating book entry",path: "POST /book-entry api"}
        }
    },
    updateBookEntry: async(client,params)=>{

        let dbResp = await client.query(` UPDATE books.details SET 
                                                title = $1,
                                                author = $2,
                                                isbn = $3,
                                                publication_date = $4
                                                WHERE isbn = $3
                                                VALUES ($1,$2,$3,$4) RETURNING * ;`,params);
        if(dbResp.rowCount > 0){
            return dbResp.rows.map(convertUnderScoresToCamelCase);
        }else{
            throw {msg: "failure", desc: "error while updating book entry",path: "PUT /book-entry api"}
        }
    },
    deleteBookByISBN: async(client)=>{
        let dbResp = await client.query(`DELETE FROM books.details WHERE isbn = $1 RETURNING *;`,[req.params.isbn])
        if(dbResp.rowCount >= 0){
            return dbResp.rows.map(convertUnderScoresToCamelCase)
        }else{
            throw {msg: "failure", desc: "error while deleting book entry",path: "DELETE /book-entry api"}
        }
    }
}

module.exports = {
    SQL,
    bookDetailsCheck,isbnCheck
}