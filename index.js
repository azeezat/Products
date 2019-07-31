const mongoose=require('mongoose')
const express = require('express');
const cors = require('cors');
const products=require('./routes/products')


const app = express();

mongoose.connect(process.env.NODE_ENV==='development'?'mongodb://localhost/products':'mongodb+srv://aziziraheem:b5oXsSPyaiTKhBfq@cluster0-ydsji.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
.then(()=>console.log('Connected to MongoDB...'))
.catch((error)=>console.error('Cound not connect to MongoDB...'))

app.use(cors)
app.use(express.json());

app.use('/api/products', products)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));