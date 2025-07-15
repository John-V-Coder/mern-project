const jwt = require("jsonwebtoken");

// checks tokens and sets req.user
exports.protect = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startswith("Bearer ")) return res.status(401).json({ message: "No token given "});

    const token = auth.split("")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

// checks role
exports.authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req, res, role)) return res.status(403).json({ message: "fobidden" });
        next();
    };
};