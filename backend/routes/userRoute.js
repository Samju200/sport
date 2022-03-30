const router = require('express').Router();
const {
  Login,
  Signup,
  ConfirmEmail,
  ResendLink,
  updatePassword,
  Register,
  getUser,
  getAllUser,
} = require('../controllers/user');
const multer = require('multer');

router.post('/signup', Signup);
router.post('/login', Login);
router.get('/:id', getUser);
router.get('/', getAllUser);
router.get('/confirmation/:email/:token', ConfirmEmail);
router.post('/:id/resend', ResendLink);
// router.get('/:id', updatePassword);
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

//@route   POST /users/uploadfile
//@desc    Avatar Upload File
//@access  Public
router.post(
  '/uploadfile',
  [upload.single('avatar')],

  async (req, res) => {
    try {
      const url = req.protocol + '://' + req.get('host');

      const user = await User.findOne({ _id: req.user.id });

      const deletepicture = user.avatar.split('/');
      try {
        fs.unlinkSync('public/' + deletepicture[4]);
      } catch (err) {
        console.log(err);
      }
      const response = await User.update(
        { _id: req.user.id },
        {
          $set: {
            avatar: url + '/public/' + req.file.filename,
          },
        }
      );
      console.log(response);
      return res.status(200).send();
    } catch (err) {
      console.error(err.message);
      return res.status(500).send(message.SERVER_ERROR);
    }
  }
);

// router.post('/:userId', Register);

module.exports = router;
