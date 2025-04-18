const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const session = require("express-session");  
const normalRoutes = require("./src/routes/normalRoutes"); 
const apiRoutes = require("./src/routes/apiRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");


const { sequelize, User, Deposit, Wallet, History } = require('./db/models');


const requestHandler = require("./src/requestHandler");
//const swapConfig = require('./src/config/swapConfig');  
//const swap = swapConfig.default;

const app = express();
const PORT = process.env.PORT || 3001; 
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 🔐 Configure session
app.use(session({
    secret: "petuteDWY",   
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production with HTTPS
}));



app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'uploads'))); // Serve static files (CSS, images, JS)


// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Use routes
app.use('/', normalRoutes);
app.use('/api/', apiRoutes);
app.use('/dashboard', dashboardRoutes);

 
// Store exchange rates globally
app.locals.rates = {}; // Initialize an empty object
app.locals.currencies = {}; 

// Sync DB and start server
sequelize.sync({ alter: true })  
  .then(() => {
    console.log('✅ Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error syncing database:', err);
  });

app.get("/test-db", async(req, res) => {
    try {
        await sequelize.authenticate();
        res.send('✅ Connected to the database successfully!');
      } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        res.status(500).send('Failed to connect to the database' + error);
      }
});
 
