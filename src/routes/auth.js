const { Router } = require('express');
const { hash } = require('bcrypt');

const User = require('../models/User');

const router = new Router();

router.post('/register', async (req, res) => {
    const {
        firstName,
        lastName,
        username,
        email,
        password,
    } = req.body;

    try {
        const errors = {};

        const emailExists = await User.findOne({ email });
        const usernameExits = await User.findOne({ username });

        if (emailExists) errors.email = 'This email already exists';
        if (usernameExits) errors.username = 'This username already Exists';
        if (password.length < 6) errors.password = 'Password must be at least 6 characters';

        if (Object.keys(errors).length > 0) return res.status(400).json(errors);

        const hashedPwd = await hash(password, 12);

        const newUser = await User.create({
            firstName,
            lastName,
            username,
            email,
            password: hashedPwd,
        });

        return res.status(200).json({ user: newUser });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ Error: e });
    }
});

module.exports = router;
