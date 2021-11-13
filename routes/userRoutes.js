const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// app.get('/api/v1/users', getAllusers);
// app.get('/api/v1/users/:id', getuser);
// app.post('/api/v1/users', createuser);
// app.patch('/api/v1/users/:id', updateuser);
// app.delete('/api/v1/users/:id', deleteuser);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all Routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// Restrict all Routes after this middleware
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
