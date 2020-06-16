var express = require('express');
var router = express.Router();
const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


router.get('/login-page',
    async (req, res) =>{
    try{
        res.render('login');
    }catch (e){
        res.status(500).json({message: 'Oops, something went wrong, try again!'});
    }
});

router.get('/users',
    async (req, res) =>{
    try{
        res.send(await UserModel.find());
    }catch (e){
        res.status(500).json({message: 'Oops, something went wrong, try again!'});
    }
});


router.post('/register',
  async function(req, res) {
    try{
      const {email, password} = req.body;
      const newUser = await UserModel.findOne({email});
      if(newUser)
        return res.status(400).json({message: 'User already exists'});
      const hashPassword = await bcrypt.hash(password, 13);
      const user = new UserModel({ email: email, password: hashPassword });

      user.save();

      res.render('index', {title: "Вітаємо " + email});
    }catch (e){
      res.status(500).json({message: 'Oops, something went wrong, try again!'});
    }
});


router.post('/login',
    async function(req, res) {
      try{
        const {email, password} = req.body;
        const currentUser = await UserModel.findOne({ email: email });
        if(!currentUser)
            return res.status(400).json({error_type: 'email'});
        const foundPass = await bcrypt.compare(password, currentUser.password);
        if (!foundPass)
            return res.status(400).json({error_type: 'password'});

        const token = jwt.sign(
            {userID: currentUser.id},
            config.get('jwt')
        );
        res.cookie('authCookie' , currentUser.id);
        res.render('index', {title: "Вітаємо " + email});
    }catch (e){
        res.status(500).json({message: 'Oops, something went wrong, try again!'});
    }
});

router.post('/logout',
    async function(req, res) {
    try{
        res.clearCookie('authCookie');
        res.redirect('/')
    }catch (e){
        res.status(500).json({message: 'Oops, something went wrong, try again!'});
    }
});

module.exports = router;