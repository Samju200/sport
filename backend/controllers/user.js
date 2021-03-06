const Bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const Token = require('../models/Token');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage: storage });

const Login = async (req, res, next) => {
  try {
    const user =
      (await User.findOne({ email: req.body.email })) ||
      (await User.findOne({ phoneNumber: req.body.phoneNumber }));
    if (!user?.email || !user?.phoneNumber) {
      return res.status(401).send({
        msg: `The Email Address or Phone Number is not associated with any account. please check and try again!`,
      });
    }
    // compare user's password if user is find in above step
    else if (!Bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({ msg: 'Wrong Password!' });
    }
    // check user is verified or not
    else if (!user.isVerified) {
      return res.status(401).send({
        msg: 'Your Email has not been verified. Please click on resend confirmation link',
      });
    }
    // user successfully logged in
    else {
      return res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const Signup = async (req, res, next) => {
  const user =
    (await User.findOne({ email: req.body.email })) ||
    (await User.findOne({ phoneNumber: req.body.phoneNumber }));

  console.log(user);
  try {
    // if email is exist into database i.e. email is associated with another user.
    if (user) {
      return res.status(400).send({
        msg: 'This email address or Phone Number is already associated with another account.',
      });
    }
    // if user is not exist into database then save the user into database for register account
    else {
      // password hashing for save into database
      req.body.password = Bcrypt.hashSync(req.body.password, 10);
      // create and save user
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        interest: req.body.interest,

        // picture: {
        //   data: fs.readFileSync(
        //     path.join(__dirname + '/uploads/' + req.file.filename)
        //   ),
        //   contentType: 'image/png',
        // },
      });
      newUser.save();
      res.status(201).json(newUser);
      // generate token and save
      const userNew =
        (await User.findOne({ email: req.body.email })) ||
        (await User.findOne({ phoneNumber: req.body.phoneNumber }));

      const accessToken = new Token({
        _userId: userNew._id,
        token: crypto.randomBytes(16).toString('hex'),
      });
      accessToken.save();

      sgMail.setApiKey(process.env.SENDGRID_APIKEY);

      const mailOptions = {
        from: 'samju7778@gmail.com',
        to: req.body.email,
        subject: 'Account Verification Link',
        text:
          'Hello ' +
          ',\n\n' +
          'Please verify your account by clicking the link: \nhttp://' +
          req.headers.host +
          '/users' +
          '/confirmation/' +
          userNew._id +
          '/' +
          accessToken.token +
          '\n\nThank You!\n',
      };
      sgMail
        .send(mailOptions)
        .then((res) => console.log(' Email sent'))
        .catch((error) => console.log(error));
    }
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

// It is GET method, you have to write like that
//    app.get('/confirmation/:email/:token',confirmEmail)

const ConfirmEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ msg: 'Invalid link oooo.' });

    // if token is found then check valid user
    const token = await Token.findOne({
      token: req.params.token,
    });
    // not valid user
    if (!token)
      return res
        .status(401)
        .send({ msg: 'We were unable to find user. Please SignUp!' });

    await User.updateOne({ _id: user._id, isVerified: true });
    await token.remove();
    res.status(200).json({ msg: 'email verify' });
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

const ResendLink = async (req, res, next) => {
  const id = req.params.id;

  try {
    // user is not found into database
    const user = await User.findById({ _id: id });
    if (!user)
      return res.status(400).send({
        msg: 'We were unable to find a user with that email. Make sure your Email is correct !',
      });
    // user has been already verified
    else if (user.isVerified)
      return res
        .status(200)
        .send('This account has been already verified. Please log in.');
    // send verification link
    else {
      const token = await Token.findOne({ _userId: user._id });

      // generate token and save
      if (!token) {
        const accessToken = new Token({
          _userId: user._id,
          token: crypto.randomBytes(16).toString('hex'),
        });
        accessToken.save();
        // Send email (use verified sender's email address & generated API_KEY on SendGrid)
        sgMail.setApiKey(process.env.SENDGRID_APIKEY);

        const mailOptions = {
          from: 'samju7778@gmail.com',
          to: user.email,
          subject: 'Account Verification Link',
          text:
            'Hello ' +
            ',\n\n' +
            'Please verify your account by clicking the link: \nhttp://' +
            req.headers.host +
            '/users' +
            '/confirmation/' +
            user._id +
            '/' +
            accessToken.token +
            '\n\nThank You!\n',
        };

        sgMail
          .send(mailOptions)
          .then((res) => console.log(' Email sent'))
          .catch((error) => console.log(error));

        res.status(200).json({ accessToken, msg: 'New token created' });
      } else {
        sgMail.setApiKey(process.env.SENDGRID_APIKEY);

        const mailOptions = {
          from: 'samju7778@gmail.com',
          to: user.email,
          subject: 'Account Verification Link',
          text:
            'Hello ' +
            ',\n\n' +
            'Please verify your account by clicking the link: \nhttp://' +
            req.headers.host +
            '/users' +
            '/confirmation/' +
            user._id +
            '/' +
            token.token +
            '\n\nThank You!\n',
        };

        sgMail
          .send(mailOptions)
          .then((res) => console.log(' Email sent'))
          .catch((error) => console.log(error));

        res.status(200).json({ token, msg: 'token from the database' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'something went wrong ooo' });
  }
};

const updatePassword = async (req, res) => {
  const id = req.params.id;
  try {
    req.body.password = Bcrypt.hashSync(req.body.password, 10);
    const userPassword = await User.findByIdAndUpdate(
      { _id: id },
      {
        password: req.body.password,
      },
      { new: true }
    );
    return res.status(200).json({ userPassword });
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateEmail = async (req, res) => {
  const id = req.params.id;
  try {
    const userEmail = await User.findByIdAndUpdate(
      { _id: id },
      {
        email: req.body.email,
      },
      { new: true }
    );
    return res.status(200).json({ userEmail });
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateUsername = async (req, res) => {
  const id = req.params.id;
  try {
    const username = await User.findByIdAndUpdate(
      { _id: id },
      {
        username: req.body.username,
      },
      { new: true }
    );
    return res.status(200).json({ username });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  Login,
  Signup,
  ConfirmEmail,
  ResendLink,
  updatePassword,
  updateUsername,
  updateEmail,
  getUser,
};
