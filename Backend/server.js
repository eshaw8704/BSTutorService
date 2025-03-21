import express from "express";
const app = express();
    app.get("/", (req,res) => 
    {res.send("Server is ready  at http://localhost:5000")});

app.listen(5000, ()  =>
{
    console.log("Server is ready at http://localhost:5000 hello")

});
