const express = require('express');
const {AdminController, AuthController} = require('../Controllers');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(['admin']);
});

// router.get('/add', AdminController.addAdmin);u

router.get('/token',AdminController.getToken, AuthController.generateToken,(req, res)=>{
  res.send({
    token:req.token,
  })
}); 

router.post('/signin',AdminController.signIn, AuthController.generateToken, (req, res)=>{
  res.send({
    hasError:false,
    token:req.token,
  })
});

module.exports = router;
