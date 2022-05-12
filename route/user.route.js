'use strict';
const router = require("express").Router()
//const bcrypt = require("bcrypt")
const userSchema = require('../model/user.model');
const curdoperations=require('../model/crud.operations')
var constants = require('../constants/constants.status');
const{validation} = require('../model/fieldsValidation')
const mailSending = require('../middleware/email')
//const {authVerification} = require('../middleware/auth');
const multer = require('multer');
const xlsx = require('xlsx');
const storageData = require('../middleware/multer');
const path = require('path');

const upload = multer({storage:storageData.storage})

router.post('/signUp',async(req,res)=>{
    try{
        const username = req.body.username;
        const email  = req.body.email;
        if(username){
            let userData = await userSchema.findOne({username:username}).exec();
            if(userData){
                 res.json({status:constants.USER_STATUS.FAILURE_STATUS, message:constants.USER_STATUS.USER_NAME_EXISTS})
            }else{
                if(email){
                    let userEmail = await userSchema.findOne({email:email}).exec();
                    if(userEmail){
                         res.json({status:constants.USER_STATUS.FAILURE_STATUS, message:constants.USER_STATUS.PASSWORD_EXISTS})
                }       
            }
        }  
        var result=curdoperations.signupSave(req,res)
        if(result){
          res.status(200).json({status:constants.USER_STATUS.SUCCESS_STATUS,message:constants.USER_STATUS.CREATED_SUCCESS})            
        }
        const toMail = email;
        console.log("toMail..."+toMail);
        const compose={
            from:"pinkyangelqueen123@gmail.com",
            to:toMail,
            fileName:'activeemail.ejs',
            details:{
                mail:toMail
            }
        }
        let mailData = await mailSending.mailSending(compose)
    }
    }catch(error){
        console.log(error.message)
       res.status(400).json({status:constants.USER_STATUS.FAILURE_STATUS,message:constants.USER_STATUS.NO_DATA})  
    }
});

 router.post('/userLogin',async(req,res)=>{
     try{
          curdoperations.loginPage(req,res)
     }catch(error){
          res.status(400).json({status:constants.USER_STATUS.FAILURE_STATUS,message:constants.USER_STATUS.NO_DATA})
     }
 });

 router.put('/userLogout/:uuid', async(req,res)=>{
     try{
         curdoperations.logoutpage(req,res)
     }catch(error){
          res.status(400).json({status:constants.USER_STATUS.FAILURE_STATUS, message:constants.USER_STATUS.NO_DATA})
     }
 });

 router.get('/accountVerify/:accountVerifyStatus/:mail',async(req,res)=>{
     try{
        var accountVerifyStatus=req.params.accountVerifyStatus;
        var mail=req.params.mail;
        console.log("Mail.....",mail)
        console.log("accountVerifyStatus..",accountVerifyStatus);
        const compose={
            from:"pinkyangelqueen123@gmail.com",
            to:mail,
            fileName:'welcomePage.ejs',
    
        }
        let mailData = await mailSending.mailSending(compose)
        await userSchema.findOneAndUpdate({email:req.params.mail},{accountVerifyStatus:req.params.accountVerifyStatus},{new:true}).exec()
        res.status(200).json({status:constants.USER_STATUS.SUCCESS_STATUS,message:constants.USER_STATUS.ACCOUNT_STATUS})            

     }catch(error){
         res.status(400).json({status:constants.USER_STATUS.FAILURE_STATUS,message:constants.USER_STATUS.NO_DATA})
     }
 });

 router.post('/uploadFile',upload.single('file'),async(req,res)=>{
     try{
         let path = './uploads/'+req.file.filename
         console.log("file...",req.file.filename)
         console.log("path...",path);
         let sheetDetail = xlsx.readFile(path);
         let sheetData = sheetDetail.SheetNames;
         let result = xlsx.utils.sheet_to_json(sheetDetail.Sheets[sheetData[0]])
         console.log("list..",result)
         return res.status(200).json({status:'success',message:'File upload success'})
     }catch(error){
         return res.status(500).json({status:'failure',message:error.message})
     }
 })
module.exports = router;