const express = require("express");
const routes = require("./routes/routes");
const userRoute = require('./routes/userRoutes')
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            
//   optionSuccessStatus:200,
// }
// app.use(cors(corsOptions));
app.use("/",routes);
app.use("/",userRoute);

app.use('/',(req,res,next)=>{
//res.send("server started");
})
app.use('/uploads',express.static("uploads"));
app.all("*",(req,res)=>{ res.send("route not exists")});

mongoose.connect("mongodb://0.0.0.0:27017/TODO",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> console.log("successfully connected") )
.catch((err)=>{
  console.log("this is error ++++++"+err)
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });