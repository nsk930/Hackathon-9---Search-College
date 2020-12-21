// const express = require('express')
// const app = express()
// const bodyParser = require("body-parser");
// const port = 8080

// // Parse JSON bodies (as sent by API clients)
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// const { connections } = require('mongoose');
// const { collegeModel } = require('./connector');

// app.get('/findColleges',async (req,res) => {
//     const projectionResult = await collegeModel.find().select({
//         // inclusive projection
//         // name: true,
//         // subscribedChannel: true,


//         // exclusive projection
//         // _id: false, //neeed to explicitly excluded
//         // subscribedDate: false,
//         // __v: false
//     });
//     res.send(projectionResult);
//     const name = await collegeModel.find.select({name: true});
//     res.send(name);
// })

// app.listen(port, () => console.log(`App listening on port ${port}!`))

// module.exports = app;

const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connections } = require('mongoose'); 
const { connection } = require('./connector')


app.get("/findColleges",async (req,res)=>{
    let name1 = req.query.name?req.query.name:".*";
    let state1= req.query.state?req.query.state:".*";
    let city1=req.query.city?req.query.city:".*";
    let course1 = req.query.course?req.query.course:".*";
    let exams1 = req.query.exam?req.query.exam:".*";
    // if(req.query.exam==="10 2"){
    //     exams1= "10";
    // }
    let minPackage1 = req.query.minPackage?Number(req.query.minPackage):".*";
    let maxFees1 = req.query.maxFees? Number(req.query.maxFees):".*";
    if(minPackage1>0 && maxFees1>0){
        let found = await connection.find({name: new RegExp(name1,'i'),
                                        state: new RegExp(state1,'i'),
                                        city: new RegExp(city1,'i'),
                                        course:new RegExp(course1,'i'),
                                        exam:new RegExp(exams1,'i'),
                                        minPackage: {$gt: minPackage1},
                                        maxFees: {$lt: maxFees1}
                                        });
        console.log(found);
        res.send(found);
    }else if(minPackage1>0){
        let found = await connection.find({name: new RegExp(name1,'i'),
                                        state: new RegExp(state1,'i'),
                                        city: new RegExp(city1,'i'),
                                        course:new RegExp(course1,'i'),
                                        exam:new RegExp(exams1,'i'),
                                        minPackage: {$gt: minPackage1},
                                        });
        console.log(found);
        res.send(found);
    }else if(maxFees1>0){
        let found = await connection.find({name: new RegExp(name1,'i'),
                                        state: new RegExp(state1,'i'),
                                        city: new RegExp(city1,'i'),
                                        course:new RegExp(course1,'i'),
                                        exam:new RegExp(exams1),
                                        maxFees: {$lt: maxFees1},
                                        });
        console.log(found);
        res.send(found);
        "" // 
    }else{
        let found = await connection.find({name: new RegExp(name1,'i'),
                                        state: new RegExp(state1,'i'),
                                        city: new RegExp(city1,'i'),
                                        course: new RegExp(course1,'i'),
                                        exam: new RegExp(exams1,'i')
                                        
                                     });
        console.log(exams1);
        res.send(found);

    }
});


app.listen(port, () => console.log(`App listening on port ${port}!`))



module.exports = app;















