const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const bodyParser = require("body-parser");

require('dotenv').config({path: './config/config.env'})

const app = express();
app.use(bodyParser.json());

const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://glints-demo.herokuapp.com']
const corsOptions = {
    origin: function (origin, callback) {
      console.log("** Origin of request " + origin)
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        console.log("Origin acceptable")
        callback(null, true)
      } else {
        console.log("Origin rejected")
        callback(new Error('Not allowed by CORS'))
      }
    }
}

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'development') {
    app.use(cors({origin: process.env.CLIENT_URL}));
    app.use(morgan('dev'));
}

const authRouter = require('./routes/auth.routes');
const restaurantRouter = require('./routes/restaurant.routes');
const collectionRouter = require('./routes/collection.routes');
app.use('/api/', authRouter);
app.use('/api/', restaurantRouter);
app.use('/api/', collectionRouter);

app.use('', (req, res) => {
    res.send("API is running");
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Page not found"
    })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(PORT, () => 
    console.log(`Listening on http://localhost:${PORT}`)
);