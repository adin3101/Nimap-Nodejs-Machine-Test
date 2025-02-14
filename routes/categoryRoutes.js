import express from 'express';
import { createCategory, deleteCategory, editCategory, getAllCategories, updateCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/',getAllCategories);
router.get('/create', (req, res) => res.render('categories/create'));
router.post('/create',createCategory);
router.get('/edit/:id',editCategory);
router.post('/update/:id',updateCategory);
router.get('/delete/:id',deleteCategory);

export default router;