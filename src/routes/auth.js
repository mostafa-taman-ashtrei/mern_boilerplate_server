const { Router } = require('express');
const { hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const cookie = require('cookie');

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

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const errors = {};

        if (username === '') errors.username = 'Username is Required ...';
        if (password === '') errors.password = 'Password is Required ...';

        if (Object.keys(errors).length > 0) return res.status(400).json(errors);

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ username: 'invalid username ...' });

        const matchPwd = await compare(password, user.password);
        if (!matchPwd) return res.status(404).json({ password: 'invalid password ...' });

        const token = sign({ username }, process.env.JWT_SECRET);

        res.set('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/',
        }));

        return res.status(200).json({ user, token });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ Error: e });
    }
});

module.exports = router;
