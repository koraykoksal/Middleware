
"use strict";

const middleFunction2 = (req, res, next) => {

    req.data1 = "middleware req funcktion 222"
    res.data1 = "middleware res funcktion 222"

    next()

}

const middleFunction3 = (req, res, next) => {

    res.send([
       req.data1,
        res.data1
    ])


}


module.exports=[middleFunction2,middleFunction3]