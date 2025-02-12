const express = require('express');
const userRouter = express.Router();
const mainController = require('../controllers/mainController');

userRouter.get('/', (req,res)=>{
  res.send('Root');
})

module.exports = userRouter;
