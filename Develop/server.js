const express = require('express');
const path = require('path');
const fs  = require('fs');
const uniqid = require('uniqid'); 
const db = require('./db/db.json');

var count = 0;

const PORT = 3001;


// initialize express (I think)
const app = express();


// Middleware function. It parses incoming requests with JSON payloads.
app.use(express.json());
// A function that parses icoming requiests with url encoded payloads.
// So url querry params and param placeholders
// app.use(express.urlencoded({ extended: true }));


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

    // console.log("Sent notes data: "+ count+ " time");
    // count++;
    // console.log(db);
    res.json(db);

});

app.post('/api/notes', (req, res)=>{

    const {title, text} = req.body; 


    const newNote = {
        title,
        text,
        id : uniqid()
    };
     

    fs.readFile('./db/db.json', 'utf8', (err,data)=>{
        if(err){throw err;}

        // console.log( "\n  Top---------------------------");
        // console.log(db );
        const parsedArray = JSON.parse(data);
        // console.log(parsedArray);
        // console.log(JSON.stringify(parsedArray,null, `\t`));
        // console.log('-----------------------------')
        parsedArray.push(newNote);

        // console.log(parsedArray);
        // console.log(JSON.stringify(parsedArray,null, `\t`));

        fs.writeFile(`./db/db.json`, JSON.stringify(parsedArray,null, `\t`), (err) =>{
            err?console.log(err):console.log(`Note for ${newNote.title} has been written to JSON file`);

        });



    });
    // console.log( "\n Bottom---------------------------");
    // console.log(db);


    res.send(newNote);

});

app.delete(`/api/delete/:id`,(req,res)=>{



    console.log(parsedArray);


})



app.listen(PORT, (err) =>{
    if(err) console.log(err);

    console.log("Server is listening on PORT", PORT)

});