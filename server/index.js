const express = require('express');
const AuthRoute = require('./routes/auth.route');
const PaperRoute = require('./routes/addPaper.route');
const app = express();
const connectDB = require('./db/DBConnection');
const CourseRoute = require('./routes/course.route');
const cors = require('cors');
const PORT = process.env.PORT || 4000;

connectDB();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  next();
});

app.use('/api/courses', CourseRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/paper', PaperRoute);

app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
