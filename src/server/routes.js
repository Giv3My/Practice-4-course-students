const cors = require('cors');
const students = require('../models/StudentsModel');

module.exports = (app) => {
    app.get('/students', cors(), (req, res) => {
        students.find((err, students) => {
            if (err) res.send(err);

            res.json(students);
        });
    });

    // app.post('/students', async (req, res) => {
    //     const { name } = req.body;
    //     console.log(req.body)

    //     const newArray = await students.create({ name: name });

    //     res.json(newArray);
    // });
}