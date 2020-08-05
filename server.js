const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

const routes = require('./routes');

//=========================== MIDDLEWARE ====================

//CORS
const corsOptions = {
    origin: [`http://localhost:3000`],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

//Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Express Sessions
app.use(session({
    store: new MongoStore({ url: process.env.MONGO_URI }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
}));

//===================== Routes ===============================

app.get('/', (req, res) => {
    res.send('<h1>MEAL PLANR</h1>');
});

app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.users);
app.use('/api/v1/households', routes.households);
app.use('/api/v1/mealPlans', routes.mealPlans);

app.listen(PORT, () => console.log(`Server connected at http://localhost:${PORT}`));