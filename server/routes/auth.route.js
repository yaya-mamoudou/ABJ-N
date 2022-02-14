const { response } = require('express');
const express = require('express');
const Router = express.Router();
const UserModel = require('../models/User.model');

Router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    let check = await UserModel.find({ phone, password }).select('-password');
    if (check.length == 0) {
      res.status(500).send({ message: 'Credentials not found' });
    } else {
      res.send(check[0]);
    }
  } catch (error) {
    console.error(error);
  }
}).post('/register', async (req, res) => {
  try {
    let check = await UserModel.find({ phone: req.body.phone });
    if (check.length > 0) {
      res.status(404).send({ message: 'User with same number exists already' });
    } else {
      const user = await new UserModel(req.body);
      user.save();
      res.send(user);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = Router;

// {
//     name: 'Yaya Mamoudou', phone: 694996019, role: 'monitor',
//     password: '0000', courses: ['ENG', 'FRE', 'MATH']
// }
