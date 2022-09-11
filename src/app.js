const express = require('express');
const app = express();


require('./db/connection'); // for connecting db
const Student = require('./models/students'); // for getting Student collection access

const port = process.env.PORT || 8000;
app.use(express.json());




app.get("/", (req, res) => {
    res.send("hey !! welcome bro");
})

// using promises
// app.post("/students", (req, res) => {
//     let user = new Student(req.body)

//     user.save()
//         .then(() => {
//             res.status(201).send(user);
//             console.log(user);
//         }).catch((err) => {
//             res.status(400).send(err);
//             console.log(err);
//         })

// })



// using async await 
app.post("/students", async (req, res) => {
    try {
        let user = new Student(req.body)
        let insertUser = await user.save();
        res.status(201).send(insertUser);
        console.log(user);
    }
    catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})


app.get("/students/:key", async (req, res) => {
    try {
        let data = await Student.find(
            {
                "$or": [
                    { name: {$regex : req.params.key} }
                ]
            }
        );
        res.status(200).send(data);
        console.log(data);
    }
    catch (err) {
        res.status(404).send(err);
        console.log(err);
    }
})


app.delete("/students", async (req, res) => {
    try {
        let data = await Student.deleteOne(req.body);
        res.status(200).send(data);
        console.log(data);
    }
    catch (err) {
        res.status(404).send(err);
        console.log(err);
    }
})


app.put("/students/:name", async (req, res) => {
    try {
        console.log(req.params);
        let data = await Student.updateOne(
             req.params ,
            { $set: req.body
            }
        );
        res.status(200).send(data);
        console.log(data);
    }
    catch (err) {
        res.status(404).send(err);
        console.log(err);
    }
})




app.listen(port, () => {
    console.log(`server listening on ${port}`);
});