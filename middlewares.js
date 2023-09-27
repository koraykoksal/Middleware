
"use strict";
/* -------------------------------------------------------
    EXPRESSJS - MIDDLEWARES
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- *
//? Middleware functions has must be minimum three parameters. 
//? Last parameter for next().
//? middleware 3 parametre olacak, next parametresi bir sonraki fonksiyona gitmek için kullanılır

app.get('/',(req,res,next)=>{

    req.customData = "req custom data"
    res.customData = "res custom data"
    // go to next function
    // next function çalıştığı zaman bulunduğu yerdeki req,res bilgisi bir sonraki fonksiyona gönderilir.
    next() 

    res.send({
        message:'middleware running'
    })
 
})


app.get('/',(req,res)=>{
  
    res.send({
        rescustom_data:res.customData,
        reqcustom_data:req.customData,
        message:'burasi calisti 1'
    })
})

app.get('/',(req,res)=>{
    res.send({
        customer1:"customer 1",
        cutomer2:"customer 2",
        message:'burasi calisti 2'
    })
})


/* ------------------------------------------------------- */


//! next() for next callBackFunction.
/* ------------------------------------------------------- *

const middleFunction = (req,res,next)=>{

    const skip = req.query.skip

    req.customData = "req middle custom data"
    res.customData = "res middle custom data"

    if(skip){
        //? next('route') atlama yaparak bir sonraki route çalıştırır
        next('route')
    }else{
        next()
    }
    

}

const middleFunction2 = (req,res,next)=>{

    next()

    // res.send({
    //     rescustom_data:res.customData,
    //     reqcustom_data:req.customData,
    //     message:'burasi ikinci middlaware fonksiyonu'
    // })

}


//? middleware fonksiyoları çalıştırmak için app.get işleminden hemen sonra callBack olarak yazılır ve çalıştırılır.
//? middleware fonksiyonlar virgül ayrırıp veya array içine yazıp çalıştırılabilir.
app.get('/',[middleFunction,middleFunction2],(req,res)=>{

    res.send({
        rescustom_data:res.customData,
        reqcustom_data:req.customData,
        message:'app get calisti'
    })
})

/* ------------------------------------------------------- */



//! Middlewares & USE:

/* ------------------------------------------------------- *


const middleFunction1 = (req, res, next) => {

    // console.log( req.query )
    const skip = req.query.skip ?? false

    req.customData = 'Custom Data With Request'
    res.customDataWithResponse = 'Custom Data With Response'

    if (skip) {
        
        // Bir sonraki bağımsız fonksiyona git:
        console.log("next route calisti")
        next('route')

    } else {
        // Bir sonraki callback fonksiyona git:
        console.log("next calisti")
        next()

    }
}


const middleFunction2 = (req, res, next) => {

    req.data1 = "middleware req funcktion 2"
    res.data1 = "middleware res funcktion 2"

    next()

}

const middleFunction3 = (req, res, next) => {

    res.send([
       req.data1,
        res.data1
    ])


}

//? app use ile middleware fonksiyon çağırıp çalıştırabiliriz
// app.use(middleFunction1)

//? ana sayfaya gelen isteklerde middlateware1 fonksiyonu çalışır.
// app.use('/user',middleFunction1)

//? app.use ile birden fazla middlaware çalıştırılabilir.
app.use(middleFunction2,middleFunction3)

app.get('/', (req, res) => {
    res.send({
        message: 'first route'
    })
})

app.get('/', (req, res) => {
    res.send({
        message: 'second route'
    })
})
/* ------------------------------------------------------- */

//? index.js sayfasındaki fonksiyonları export edip çağırma
const [middleFunction2,middleFunction3] = require('./middlewares/index')

//? import edilen fonksiyonları app.use ile çalıştırma
// app.use(middleFunction2,middleFunction3)

//? export edilen fonksiyonlar bir değişkenin içine atılıp çağırılabilir
const fonks = require('./middlewares/index')

app.use(fonks)


app.get('/', (req, res) => {
    res.send({
        message: 'welcome to home'
    })
})


app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));


