const mongoose=require('mongoose')
const express = require('express');
const cors = require('cors');
const products=require('./routes/products')
const files=require('./routes/files')
const { PORT, DB_CONN} = require('./config');

const app = express();

mongoose.connect(DB_CONN, { useNewUrlParser: true })
.then(()=>console.log('Connected to MongoDB...'))
.catch((error)=>console.error('Cound not connect to MongoDB...'))

app.use(cors());
app.use(express.json());

app.use('/api/products', products)
app.use('/api/upload', files)

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));