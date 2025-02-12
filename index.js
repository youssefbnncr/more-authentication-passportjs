const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const bcrypt = require('bcryptjs');

app.set('views', path.join(__dirname,'views'))
app.set('view engine','ejs');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.send('Hi from Home');
})

app.get('/dbtest', async(req,res)=>{
    try {
        const result = await db.query('SELECT now()');
        console.log(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).send('Database error');
    }
})

app.get('/signup', (req,res)=>{
    res.render('form');
})

app.post('/register', async(req,res)=>{
    const {username, password} = req.body;
    const hachedPassword = await bcrypt.hash(password,10);
    try{
        await db.query('INSERT INTO users (username,password) VALUES ($1, $2)',[username,hachedPassword]);
        res.status(200).send('User registed');
    }catch(err){
        console.error(err);
        res.status(500).send('Failed to register the user');
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})