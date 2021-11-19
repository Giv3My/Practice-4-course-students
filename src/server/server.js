const Express = require('express'),
    app = Express(),
    PORT = process.env.PORT || 3000,
    routes = require('./routes'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/students_db');

app.use(Express.json());

routes(app);

app.listen(PORT);
