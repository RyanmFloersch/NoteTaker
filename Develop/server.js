const express = require('express');
const path = require('path');
const fs  = require('fs');

const db = require('./db/db.json');


const PORT = 3001;


// initialize express (I think)
const app = express();


// Middleware function. It parses incoming requests with JSON payloads.
app.use(express.json());
// A function that parses icoming requiests with url encoded payloads.
// So url querry params and param placeholders
app.use(express.urlencoded({ extended: true }));


// Allows acces to the public folder to be used.  
app.use(express.static('public'));


app.get('/', (req, res) =>{
    console.log('Hello: '+__dirname);

    res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.get('/notes',(req,res)=>{
    
    res.sendFile(path.join(__dirname,'/public/notes.html'));
});

app.get('/api/notes', (req,res)=>{

    res.send(db);

});

app.post('/api/notes', (req, res)=>{

    const {title, text} = req.body; 


    const newNote = {
        title,
        text
    };
     

    fs.readFile('./db/db.json', 'utf8', (err,data)=>{
        if(err){throw err;}

        const parsedArray = JSON.parse(data);

        parsedArray.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(parsedArray,null, `\t`), (err) =>{
            err?console.log(err):console.log(`Note for ${newNote.title} has been written to JSON file`);

        });


    });


    res.json(newNote);

});



app.listen(PORT, (err) =>{
    if(err) console.log(err);

    console.log("Server is listening on PORT", PORT)

});