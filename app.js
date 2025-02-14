import express from 'express';
import db from './config/db.js';
import bodyParser from 'body-parser';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'

const app = express();
app.set('view engine', 'ejs');
app.set('views','./views')

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json())
app.use('/categories',categoryRoutes)
app.use('/products',productRoutes)

app.get('/', (req, res) => {
    res.redirect('/categories');
});
app.listen(5500, () => {
    console.log('Server started on port 5500');
}); 