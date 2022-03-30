const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const { response } = require('express');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose
  .connect(process.env.MONGOOSE_URL, { useNewUrlParser: true })
  .then(() => console.log('DB Connection Successfully!'))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use('/', authRoute);

app.use('/users', userRoute);
if ((process.env.NODE_ENV = 'production')) {
  app.use(express.static(path.join('sport/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'sport', 'build', 'index.html'));
  });
}
app.listen(process.env.PORT || 5000, () => {
  console.log('Backend server is running!');
});
