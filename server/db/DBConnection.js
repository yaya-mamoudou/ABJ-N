const mongoose = require("mongoose");
const uri = `mongodb://localhost:27017/driving`;

const connectDB = async () => {
  mongoose
    .connect(uri, {
    //   useCreateIndex: true,
      useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error(`ERROR: ${err}connection to database failed`));
};

module.exports = connectDB;