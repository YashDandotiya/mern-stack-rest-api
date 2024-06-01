const express= require('express')
const mongoose = require('mongoose')
const route= require('./routes/user-routes')
const app= express()
const cors= require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const dbString= 'mongodb+srv://dandotiyayash73:wCAMl28PcrmfhctM@cluster0.ntsszyk.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(dbString).then(()=>{
    console.log('database connect')
    app.listen(5000)    
}
    
).catch((err)=>{
    console.log(err)
})

app.use('/users' ,route)

app.use((req, res, next)=>{
    const err= new Error('Cannot find this specific route')
    err.code=700
    next(err)
})

app.use((err, req, res, next)=>{
    if (res.headerSent){
        return next(err)
    }
    else{
        res.json(`${err.message} and ${err.code}` || `Unexpected Error Occured ${err.code}`).status(err.code ||300)
    }
})

