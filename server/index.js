const express = require('express');
const path = require('path');
const passport = require('passport');
const authRouter = require('./routes/auth');

const app = express();
const port = 3000;

app.use(express.static(path.join('client', 'dist')));
app.use(express.json());
app.use(passport.initialize());
app.use('/oauth2', authRouter);

app.listen(port, () => {
  console.info(`
    App listening on:
    - http://localhost:${port}
    - http://127.0.0.1:${port}
  `);
});
