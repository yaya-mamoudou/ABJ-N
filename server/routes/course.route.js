const express = require('express');
const Router = express.Router();
const CourseModel = require('../models/Courses.model');
const UserModel = require('../models/User.model');

Router.post('/add-all-courses', async (req, res) => {
  try {
    let newCourse = await new CourseModel(req.body);
    await newCourse.save();
    allCourses = await CourseModel.find();
    res.send(allCourses);
  } catch (error) {
    console.error(error);
  }
})
  .get('/all/:id?', async (req, res) => {
    try {
      let userId = await req.params.id;
      let courseList = [];
      let final = [];

      const user = await UserModel.find({ _id: userId }).select(['taken', '-_id']);
      const taken = await user[0].taken;

      await taken.map((course) => courseList.push(course.id));
      const allCourses = await CourseModel.find({ _id: { $nin: courseList } });
      final = [...taken, ...allCourses];
      res.send(final);
    } catch (error) {
      console.error(error);
    }
  })

  .get('/all-taken', async (req, res) => {
    const users = await UserModel.find({ 'taken.0': { $exists: true } }).select([
      'name',
      '_id',
      'taken',
    ]);
    res.send(users);
  })

  .put('/submit-test', async (req, res) => {
    try {
      // console.log(req);
      const { userId, data } = req.body;
      let oldData = await UserModel.find({ _id: userId }).select(['taken', '-_id']);
      oldData = [...oldData[0].taken, data];
      let updateUser = await UserModel.updateOne({ _id: userId }, { taken: oldData });
      let user = await UserModel.find({ _id: userId }).select(['-password']);
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  });

module.exports = Router;
