const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const {globalErrorHandler} = require("./utilities/utilityFunctions");
const apiRoutes = require("./Routes");

app.use(cors());
app.use(express.json());

apiRoutes(app);

app.use("/test",(req,res)=>{
   return res.status(200).send("Server is running")
});

app.use(globalErrorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`Express is running in port ${process.env.PORT}`)
})