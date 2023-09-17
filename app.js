// process.chdir(__dirname);


// const { error } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { dolarAl } = require('./mat.js');


const app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));
const port = 5050;


const dbURI = 'mongodb+srv://tayfunDurmaz:t1234@todoapp.pqvymtb.mongodb.net/todoApp?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((resulte) => {
        console.log('connect to db');
    })
    .catch((err) => {
        console.log(err);
    });


// app.get('/add-Blog', (req,res) => {
//     const blog = new Blog ({
//         body: 'Benim adım NECATİ DURMAZ'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });



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
   
    // console.log("verii sayfasındasın");

   

    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
        console.log(err);
        });

    // try {
    //     if(array.length === 0){
    //         throw new Error("Array içi boş mal");
    //     }
    //     console.log(array);
    //     res.json(array);
    // } catch (error) {
    //     console.log(error);
    //     const errmsg = {
    //         hata : error.message,
    //     };
    //     res.json(errmsg);
    // }
    
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


app.delete('/', (req,res) => {
    try {
        array.pop();
        const data = {
            popedar : array,
        };
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});


app.listen(port, () => {
    console.log(`sunucu dinleniyor : ${port}`);
});
