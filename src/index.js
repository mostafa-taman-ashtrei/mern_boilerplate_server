require('dotenv').config();
const express = require('express');

const Db = require('./config/db');

const main = async () => {
    const app = express();
    const port = process.env.PORT || 5000;

    await Db();
    app.listen(port, () => console.log(`Server is running on port ${port} ...`));
};

main();
