const express= require('express')
const controller= require('../controllers/controller')
const route= express.Router()


route.get('/', controller.userfetch)

route.post('/signup', controller.usersignup)
route.post('/login', controller.userlogin)
module.exports=route
