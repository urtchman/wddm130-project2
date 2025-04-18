// src/middleware/isAuthenticated.js
module.exports = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect("/login");
};
