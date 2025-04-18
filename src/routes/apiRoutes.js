// src/routes/apiRoutes.js

const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const currenciesController = require('../controllers/currenciesController');

// USERS
router.post('/users', usersController.createUser);
router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);
router.post('/users/login', usersController.loginUser);

// CURRENCIES
router.post('/currencies', currenciesController.createCurrency);
router.get('/currencies', currenciesController.getAllCurrencies);
router.get('/currencies/:id', currenciesController.getCurrencyById);
router.put('/currencies/:id', currenciesController.updateCurrency);
router.delete('/currencies/:id', currenciesController.deleteCurrency);
router.post('/currencies/swap', currenciesController.swapCurrency);
router.post('/currencies/deposit', currenciesController.startdeposit);
router.post('/currencies/update-deposit', currenciesController.updatedeposit);
router.get('/currencies/exchange-rates', currenciesController.getExchangeRates);
router.get('/currencies/supported', currenciesController.getSupportedCurrencies);

module.exports = router;
