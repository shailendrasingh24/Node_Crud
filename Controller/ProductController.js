const { ObjectId } = require('mongoose');
const ProductModel = require('../model/ProductModel');
const path = require('path');
const fs = require ('fs');

const ProductController = {
    getProducts : function(req,res,next){   
        ProductModel.find({},(error,data)=>{
           if(error==null){
            if(typeof(data) == 'object'){
                if(Array.isArray(data)){
                    //console.log(data);
                    if(data.length > 0){
                        res.status(200).json({
                            code : "201",
                            massage : "Product Found Successfully",
                             status:true,
                            data:data,
                          error:false
                    });
                    }else{
                   res.status(404).json({
                  code : "404",
                 massage : " Data No Record Found",
                status:false,
                 data:[],
                 error:false
             });    
            }
           }
        }
    }
 })

 },
      
   createProducts:function (req,res,next){
               // console.log(req.body);   : body-parser package

                ProductModelObject = new ProductModel(req.body);
                ProductModelObject.save((error,data)=>{
                    if(error==null){
                        res.status(200).json({
                            code:"201",
                            massage:"Record Inserted Successfully",
                            status:true,
                            data:data,
                            error:false
                        });
                    }else{
                        res.status(404).json({
                            code:"404",
                            massage:"Oops Something went Wrong ",
                            status:false,
                            data:[],
                            error:false
                        });
                       }
                     
                     });
                  },
                  getSingleProduct: (req, res, next) =>
                  {
                      let ObjectId = req.params.id;
                      ProductModel.findOne({ _id: ObjectId }, (error, data) =>
                      {
                          if (error == null)
                          {
                              if (typeof (data) == 'object')
                              {
                                  if (Array.isArray(data))
                                  {
                                      // console.log('data is array of object');
                                  } else
                                  {
                                      // console.log("data is single object");
                                      if (data == null)
                                      {
                                          // console.log("Invalid data", data)
                                          res.status(404).json({
                                              code: "404",
                                              message: "No Record Found for id " + ObjectId,
                                              data: [],
                                              error: false
                                          })
                                      } else
                                      {
                                          // console.log("Valid data", data)
                                          res.status(200).json({
                                              code: "201",
                                              message: "Record Found for id " + ObjectId,
                                              status: true,
                                              data: data,
                                                  error: false
                                          });
                                      }
                                  }
                              } else
                              {
                                  console.log("Not a valid Object");
                              }
                          } else
                          {
                              console.log("Exception Occured");
                          }
                      })
                  },
   deleteSingleProducts:function(req,res,next){
            let ObjectId = req.params.id;

            ProductModel.deleteOne({_id:ObjectId},(error,data)=>{
                if(error == null){
                      res.status(200).json({
                     code:"201",
                     massage:"Record Deleted Successfully",
                     data:[],
                     status:true,
                     error:false,
                      });
                }else{
                   // console.log('Exception Occurred');
                   res.status(404).json({
                    code:"404",
                    massage:"Can Not Delete Record",
                    data:[],
                    status:false,
                    error:false,
                     });
                  }
              })
           },

   updateProducts:function(req,res,next){
    let ObjectId = req.params.id;
    ProductModel.findOne({_id:ObjectId},(error,data)=>{
        if(error==null){
            //
         console.log(data);
         data.name = req.body.name;
         data.brand = req.body.brand;
         data.price = req.body.price;

         data.save((err)=>{
             if(err==null){
                res.status(200).json({
                    code:"201",
                    massage:"Record Update Successfully",
                    data:[],
                    status:true,
                    error:false,
                     });
                 }else{
                    res.status(404).json({
                        code:"404",
                        massage:"No data Updated",
                        data:[],
                        status:false,
                        error:false,
                         });    
                      }
                   });
                }
             })
          },
          //Upload Method form
          uploadSingleImageFrom:function(req,res,next){

              let indexPage = path.join(__dirname,'../Pages/index.html')

              fs.readFile(indexPage,"utf-8",(error,data)=>{
                if (error == null){
                    res.send(data);
                }
              })
          },
          uploadFile:function(req,res,next){
            //console.log(req.file)

            if(req.file){

                let ext = req.file.originalname.split(".")[1];
                //console.log(ext);
                let targetFileName = req.file.fileName+"."+ext;
                fs.rename(req.file.path,`${req.file.destination}/${targetFileName}`,(error)=>{
                    res.send('File Uploaded Successfully and Renamed')
                });
            }

          },
          searchProduct:function(req,res,next){
               console.log(req.body)
          }
      }
module.exports = ProductController;