const router = require('express').Router();
const {
  updatePassword,
  updateUsername,
  updateEmail,
} = require('../controllers/user');

router.put('/:id/password', updatePassword);

router.put('/:id/username', updateUsername);
router.put('/:id/email', updateEmail);

module.exports = router;
