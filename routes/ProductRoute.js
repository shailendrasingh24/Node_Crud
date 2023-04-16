const express = require ('express');
const molter = require ('multer')


//**************************All Controller Start ************/
const ProductController = require ('../Controller/ProductController');
const multer = require('multer');
//**************************All Controller End ************/


const router = express.Router();
const upload = multer({dest:"public/uploads"})

router.get ('/upload',ProductController. uploadSingleImageFrom);
router.post ('/upload',upload.single("pic"),ProductController.uploadFile);

router.post('/search',ProductController.searchProduct);

router.get ('/',ProductController.getProducts);
router.get ('/:id',ProductController.getSingleProduct);
router.post ('/create',ProductController.createProducts);
router.put ('/:id',ProductController.updateProducts);
router.delete ('/:id',ProductController.deleteSingleProducts);

//File Uploading GET Request for Form

module.exports = router;