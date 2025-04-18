const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const budpayConfig = require('../../src/config/budpayConfig').default;
const {Deposit, History, User, Wallet } = require('../../db/models'); // Sequelize User model
 
const router = express.Router();

router.get("/", isAuthenticated, async(req, res) => {
    const wallet = await Wallet.findOne({ where: { user_id: req.session.user.id } });
    res.render("dashboard", {
        title: "Dashboard",
        user: req.session.user,
        wallet
    });
});

router.get("/swap", isAuthenticated, async(req, res) => {
    const wallet = await Wallet.findOne({ where: { user_id: req.session.user.id } });
    res.render("swap", {
        title: "Swap Naira || Dashboard",
        user: req.session.user,
        wallet
    });
});

router.get("/deposit", isAuthenticated, async(req, res) => {
    const wallet = await Wallet.findOne({ where: { user_id: req.session.user.id } });
    res.render("deposit", {
        title: "Deposit Naira || Dashboard",
        user: req.session.user,
        wallet,
        budpay: budpayConfig
    });
});

router.get("/history", isAuthenticated, async(req, res) => {
    const wallet = await Wallet.findOne({ where: { user_id: req.session.user.id } });
    const transactions = []; // from db
    res.render("history", {
        title: "Swap || Dashboard",
        user: req.session.user,
        wallet,
        transactions
    });
});

router.get("/settings", isAuthenticated, async(req, res) => {
    res.render("settings", {
        title: "Settings || Dashboard",
        user: req.session.user
    });
});

  
module.exports = router;
