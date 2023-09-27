
"use strict";
/* -------------------------------------------------------
    EXPRESSJS - MIDDLEWARES
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
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
        message:'burasi calisti'
    })
})

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));


