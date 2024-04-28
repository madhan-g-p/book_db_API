const apis = [
    {url: "/book-entry",path: "./v1/book-entry/index"}
]

const apiRoutes =(app)=>{

   return apis.map((module)=>app.use(module.url,require(module.path)));
};


module.exports = apiRoutes;