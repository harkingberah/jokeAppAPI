import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import axios from "axios";

const app=express();
const port=3000;
const API_URL="https://v2.jokeapi.dev/joke"
app.use(express.static("Public"))
app.use(express.urlencoded({extended:true}));

let getJoke;

app.get("/",(req,res)=>{
    res.render("index.ejs",{joke:"waiting for you to request a joke"})
})

app.post("/postjoke",(req,res)=>{
    getJoke=req.body["requestJoke"]
    console.log(getJoke);
    
})

app.post("/getjoke",async(req,res)=>{
    console.log(getJoke);
    try{
        if (!getJoke){
            res.status(400).send("Please submit a moke request first")
        }
      const result=await axios.get(`${API_URL}/${getJoke}`);
      console.log(result.data)
      res.render('index.ejs',{joke:result.data.setup})
      
    }
    catch(error){
        console.error(error.message);
        res.status(404).send("server error");
    }
})


app.listen(port,()=>{
    console.log(`listening from port ${port}`)
})
