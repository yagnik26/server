const express = require('express');
const connect = require('./config/db');
require('dotenv').config();
const authRouter = require('./routers/authRouters');
const productRouter = require('./routers/productRouters');
const cors = require('cors');

let app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter)
app.use('/product', productRouter)


app.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
    connect();
})