const express=require('express');
const ejs=require("ejs");
const app =express()
const User = require("./model/models")
const applyUser=require('./model/applymodel')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const port = process.env.port ||5000;
app.get('/',(req,res)=>{
    res.send('welcome to snv solutions')
})
mongoose.connect('mongodb://localhost:27017/snv',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,

})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));
app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json());
app.listen(port,()=>{
    console.log ('just i created sever')
})
app.post('/snv',(req,res,next)=>{
const newuser = new User({
    name:req.body.name,
    email:req.body.email,
    subject:req.body.subject,
    message:req.body.message

})
newuser.save()
.then(()=>{
 res.json({success:true,message:'MESSAGE SUCCESSFULLY'})
})
.catch((err)=>{
   
    res.json({success:false,message:'MESSEGE SENDING FAILED'})
   })
}
)



app.post('/application',(req,res,next)=>{

const myUser = new applyUser({
    position:req.body.position,
    first_Name:req.body.firstName,
    last_Name:req.body.lastName,
    contry_Code:req.body.contry,
    teliphone:req.body.teliphone,
    email:req.body.email,
    gender:req.body.gender,
    address:req.body.address,
    education:req.body.education,
    work_expirience:req.body.work,
})
myUser.save()
.then(()=>{
 res.json({success:true,message:'APPLICATION FORM APPLY SUCCESSFULLY'})
})
.catch((err)=>{
   
    res.json({success:false,message:'APPLICATION FORM SENDING FAILED'})
   })
})






