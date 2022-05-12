'use strict';

const router = require("express").Router()
//const productSchema = require('../model/product.model')
const curdoperations = require('../model/crud.operations')
const constants = require('../constants/constants.status');


router.post('/addProduct', async(req,res)=>{
    try{
       curdoperations.addItem(req,res)       
    }catch(error){
        res.status(400).json({status:constants.USER_STATUS.FAILURE_STATUS, message:constants.USER_STATUS.NO_DATA}) 
    }
});

router.get('/getAllProducts',async(req,res)=>{
    try{
        curdoperations.getAllItems(req,res)
    }catch(error){
         res.status(400).json({status:constants.USER_STATUS.FAILURE_STATUS,message:constants.USER_STATUS.NO_DATA})
    }
});

router.get('/getSingleItem',async(req,res)=>{
    try{
        curdoperations.getSingleItem(req,res)
    }catch(error){
        res.status(400).json({status:constants.USER_STATUS.FAILURE_STATUS,message:constants.USER_STATUS.NO_DATA})
    }
});

router.put('/updateProduct',async(req,res)=>{
    try{
        curdoperations.updateItems(req,res)
    }catch(error){
        res.status(400).json({status:constants.USER_STATUS.FAILURE_STATUS,message:constants.USER_STATUS.NO_DATA})
    }
});

router.delete('/deleteProduct',async(req,res)=>{
    try{
        curdoperations.deleteProduct(req,res)
        
    }catch(error){
        res.status(400).json({status:constants.USER_STATUS.FAILURE_STATUS,message:constants.USER_STATUS.NO_DATA})
    }
})

router.get('/searchItem/:key',async(req,res)=>{
try{
    curdoperations.searchItem(req,res)
}catch(error){
    res.status(400).json({status:constants.USER_STATUS.FAILURE_STATUS,message:constants.USER_STATUS.NO_DATA})
}
});

router.get('/filterItemsPrice',async(req,res)=>{
try{
    curdoperations.priceFilter(req,res)
}catch(error){
    res.status(400).json({status:constants.USER_STATUS.FAILURE_STATUS,message:constants.USER_STATUS.NO_DATA})

}
})
module.exports = router;