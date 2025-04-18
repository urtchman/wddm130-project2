const express = require("express");
const { generateSHA1Hash } = require('../utils/hashUtils');
const { User } = require('../../db/models'); // Sequelize User model
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "Naira Swap - Home",
        exchangeRates: [],
        rates: []
    });
});

router.get("/about", (req, res) => {
    const aboutData = {
        intro: 'Naira Swap is a trusted exchange platform that offers seamless currency exchange services between the Nigerian Naira (NGN) and other major currencies.',
        mission: 'To provide fast, secure, and transparent currency exchange services, ensuring customers get the best rates with maximum convenience.',
        vision: 'To become the leading exchange platform for the Nigerian Naira, bridging the gap between global currencies through technology and innovation.',
        coreValues: [
            {title: 'Transparency', desc: 'Providing real-time and fair exchange rates.'},
            {title: 'Security', desc: 'Ensuring all transactions are safe and secure'},
            {title: 'Customer Satisfaction', desc: 'Prioritizing the needs of our users.'},
            {title: 'Innovation', desc: 'Leveraging technology for better exchange solutions.'},
            {title: 'Integrity', desc: 'Upholding honesty and trustworthiness in all operations.'}
        ]
    }
    res.render('about', { title: "About Naira Swap", content:aboutData });
});

router.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contact Us",
        intro: "We’d love to hear from you!",
        phone: "+1 (437) 766 2790",
        email: "urtchman04@yahoo.co.uk",
        address: "45 Autumn Glen Circle, Etobicoke M9W 6B3"
    });
});

// Exchange Rates Page
router.get('/exchange-rates', (req, res) => { 
    res.render('exchange-rates', { title: "Exchange Rates", exchangeRates:[], currencies: [] });
});


router.get("/login", (req, res) => {
    const errorMessage = req.query.error ? "Invalid email or password. Try again." : "";
    res.render("login", { title: "Login", errorMessage });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(`🔍 Login Attempt: ${email}`);

    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log("❌ User not found");
            return res.redirect("/login?error=invalid&type=1");
        }

        // Hash input password and compare with stored hash
        const inputHash = generateSHA1Hash(password);
        if (user.password !== inputHash) {
            console.log("❌ Invalid password");
            return res.redirect("/login?error=invalid&type=2");
        }

        console.log(`✅ Login successful for ${email}`);

        
        await user.update({
            last_login: new Date(),
            status: 1,
            logs: user.logs + 1
        });

        // Save user info in session
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            passport: user.passport,
            last_login: user.last_login,
            status: 1,
            logs: user.logs
        };

        return res.redirect("/dashboard");

    } catch (error) {
        console.error("⚠️ Login Error:", error);
        return res.redirect("/login?error=server");
    }
});

router.get("/signup", (req, res) => {
    const errorMessage = req.query.error ? "Invalid email or password. Try again." : "";
    res.render("signup", { title: "Sign Up", errorMessage });
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => res.redirect("/login"));
});
 
module.exports = router;
