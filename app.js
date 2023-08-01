const express = require("express")
const bodyParser=require("body-parser")
const cors=require("cors")
const helmet=require("helmet")
const morgan=require("morgan")
const app = express()
require("dotenv").config();
const mongoose = require('mongoose');

const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

if (process.env.NODE_ENV !== "production") {
  const mDb = mongoose.connection;
  mDb.on("open", () => {
    console.log("MongoDB connected");
  });
  mDb.on("error", (error) => {
    console.log(error);
  });
  app.use(morgan("tiny"));
}

//app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())



const userRouter=require("./src/routers/user.router")
const ticketRouter=require("./src/routers/ticket.router");
const hiringRouter=require("./src/routers/hiring.router");
//const tokensRouter=require("./src/routers/tokens.router");
const handleError=require("./src/utils/errorHandler");

app.use("/v1/user",userRouter);
app.use("/v1/ticket",ticketRouter);
app.use("/v1/hiring",hiringRouter);
//app.use("/v1/tokens",tokensRouter);


app.use('*', (req, res, next)=>{
    const error=new Error("Resources not found!")
    error.status=404;
    next(error);
});
app.use("*",(error,req,res,next)=>{
    handleError(error,res);
})
app.listen(port,()=>{
    console.log(`API is ready on http://localhost:${port}`);
});