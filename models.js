const mongoose=require("./db")

const user_Schema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
})


const user_model=new mongoose.model("user",user_Schema)

module.exports={
    "User":user_model
}