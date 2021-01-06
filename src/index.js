require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (_, res) => res.json({ msg: 'Hello from express app ' }));

app.listen(port, () => console.log(`Server is running on port ${port}`));
