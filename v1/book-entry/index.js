const router = require("express").Router();
const pool = require("../../dbConnection/db");
const { sendRes } = require("../../utilities/utilityFunctions");
const {SQL,bookDetailsCheck,isbnCheck} = require("./sqlConstants");


router.get('/',async(req,res,next)=>{
    await SQL.getBooks(pool)
            .then((asset)=>{
                return sendRes(res,200,'Successfully fetched book list',null,asset);
            })
            .catch((err)=>{
                next(err,req,res,next);
            })
});

router.get('/:isbn',isbnCheck,async(req,res,next)=>{
    await SQL.getBookOfISBN(pool,[req.params.isbn])
            .then((asset)=>{
                return sendRes(res,200,'Successfully fetched book of given isbn',null,asset);
            })
            .catch((err)=>{
                next(err,req,res,next);
            })
});

router.post('/',bookDetailsCheck,async(req,res,next)=>{
    const client = await pool.connect();
    const {title,author,isbn,publicationDate} = req.body;
    await client.query('BEGIN;');
    await SQL.createBookEntry(client,[title,author,isbn,publicationDate])
    .then(async(asset)=>{
                await client.query('COMMIT;');
                return sendRes(res,200,'Successfully Created book entry',null,asset);
            })
            .catch(async(err)=>{
                await client.query('ROLLBACK;');
                next(err,req,res,next)
            })
});

router.put('/:isbn',bookDetailsCheck,async(req,res,next)=>{
    const client = await pool.connect();
    const {title,author,isbn,publicationDate} = req.body;
    await client.query('BEGIN;');
    await SQL.updateBookEntry(client,[title,author,isbn,publicationDate])
    .then(async(asset)=>{
                await client.query('COMMIT;');
                return sendRes(res,200,'Successfully updated Book Entry',null,asset);
            })
            .catch(async(err)=>{
                await client.query('ROLLBACK;');
                next(err,req,res,next)
            })
});

router.delete('/:isbn',isbnCheck,async(req,res,next)=>{
    await SQL.deleteBookByISBN(pool,[req.params.isbn])
            .then(asset=>sendRes(res,200,'Successfully fetched all the bookings',null,asset))
            .catch(err=>next(err,req,res,next))
})
module.exports = router
