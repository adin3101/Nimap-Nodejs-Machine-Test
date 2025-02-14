import express from "express";
import { createProduct, deleteProduct, editProduct, getAllProducts, showCreateProductForm, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.get('/',getAllProducts);
router.get('/create', showCreateProductForm);

router.post('/create',createProduct);
router.get('/edit/:id',editProduct);
router.post('/update/:id',updateProduct);
router.get('/delete/:id',deleteProduct);

export default router;