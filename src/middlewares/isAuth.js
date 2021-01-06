const { verify } = require('jsonwebtoken');
const User = require('../models/User');

const isAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) throw new Error('Unauthenticated');

        const { username } = verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ username });
        if (!user) throw new Error('Unauthenticated');

        res.locals.user = user;
        return next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({ Error: 'Unauthenticated' });
    }
};

module.exports = isAuth;
