const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json())

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

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})