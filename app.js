
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { dolarAl } = require('./mat.js');
const dotenv = require('dotenv');
const cors = require('cors');


const app = express();
dotenv.config();
const path = require('path');
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));
const port = 3001;


const connectDatabase =async ()=> {
    try {
      const url = process.env.MONGO;
      await mongoose.connect(url, {
        useNewUrlParser: true, useUnifiedTopology: true,
      });
      console.log('connect to database')
    } catch (error) {
      console.log(error)
    }
  }
  
  connectDatabase()
app.get('/all-Blog', (req,res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});



app.get('/', (req,res) => {
    dolarAl();
    // dolarAlthen();

    console.log("Anasayfa dasınız");
    res.sendFile(__dirname + '/index.html');
});





app.get('/veri', (req,res) => {

    try {
        Blog.find().sort({ createdAt: -1 })
            .then(result => {
                res.json(result);
            })
            .catch(err => {
            console.log(err);
            });
    } catch (error) {
        console.log(`yarrammmm ${error}`)
    }

});

app.post('/' , async (req,res) => { // req ---> istek    res ---> cevap
    try {
        
        // İstekten gelen verileri kullanarak yeni bir blog belgesi oluşturun
        const newBlog = new Blog({
            body: req.body.isim, // Örnek bir alan adı
           
            // Diğer alanları da buraya ekleyin
        });

        // Yeni blog belgesini kaydedin
        const result = await newBlog.save();
        console.log(result);
        // Başarı durumunda sonucu gönderin
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Veri kaydedilemedi.' });
    }
});
 //FURKAN ADAMDIR


 app.delete('/veri/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/' });
        })
        .catch(err => {
            console.log(err);
        });
});



app.listen(port, () => {
    console.log(`sunucu dinleniyor : ${port}`);
});
