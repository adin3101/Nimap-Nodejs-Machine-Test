import db from "../config/db.js";

export const getAllCategories = async(req, res)=>{
    try {
        const[categories] = await db.query('select * from categories');
        res.render('categories/index',{ categories });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const createCategory = async(req,res)=>{
    const {CategoryName} = req.body
    try {
        await db.query('insert into categories (CategoryName) values (?)', [CategoryName]);
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const editCategory = async (req,res)=>{
    const {id} = req.params;
    try {
        const [category] = await db.query('select * from categories where CategoryId = ?',[id]);
        res.render('categories/edit',{category: category[0 ]});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const updateCategory = async(req, res)=>{
    const {id} =req.params;
    const {CategoryName} = req.body;
    try {
        await db.query('update categories set CategoryName = ? where CategoryId = ?',[CategoryName,id]);
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const deleteCategory = async(req,res)=>{
    const {id} = req.params;
    try {
        await db.query('delete from categories where CategoryId = ?',[id]);
        res.redirect('/categories')
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};