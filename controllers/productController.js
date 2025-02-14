import db from "../config/db.js";

export const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  try {
    const [products] = await db.query(
      `
            SELECT p.ProductId, p.ProductName, c.CategoryName, c.CategoryId
            FROM products p
            JOIN categories c ON p.CategoryId = c.CategoryId
            LIMIT ? OFFSET ?
        `,
      [pageSize, offset]
    );
    res.render("products/index", { products, page, pageSize });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const showCreateProductForm = async (req, res) => {
    try {
        const [categories] = await db.query('SELECT * FROM categories');
        res.render('products/create', { categories });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const createProduct = async(req,res)=>{
    const {ProductName, CategoryId} = req.body;
    try {
        await db.query('Insert into products (ProductName, CategoryId) values (?,?)',[ProductName,CategoryId]);
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const editProduct = async(req,res)=>{
    const {id} = req.params;
    try {
        const [product] = await db.query("select * from products where ProductId = ?",[id]);
        const [categories] = await db.query("SELECT * FROM categories");
        res.render('products/edit',{product : product[0],categories : categories});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { ProductName, CategoryId } = req.body;
    try {
        await db.query('update products SET ProductName = ?, CategoryId = ? where ProductId = ?', [ProductName, CategoryId, id]);
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('delete from products WHERE ProductId = ?', [id]);
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
