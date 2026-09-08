const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access"
        });
    }

    req.user = {
        userId: req.session.userId
    }
    next();
}

module.exports = authMiddleware;