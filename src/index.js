require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const Db = require('./config/db');
const authRoutes = require('./routes/auth');

const main = async () => {
    const app = express();
    const port = process.env.PORT || 5000;

    app.use(helmet());
    app.use(cors({ credentials: true, origin: process.env.ORIGIN, optionsSuccessStatus: 200 }));
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(cookieParser());
    app.use('/auth', authRoutes);

    if (process.env.NODE_ENV === 'production') {
        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
        app.use(morgan('combined', { stream: accessLogStream }));
    }

    await Db();
    app.listen(port, () => console.log(`Server is running on port ${port} ...`));
};

main();
