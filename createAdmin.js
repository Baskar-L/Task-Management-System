require("dotenv").config();

const mongoose =
  require("mongoose");

const bcrypt =
  require("bcryptjs");

const User =
  require("./models/User");

mongoose.connect(
  process.env.MONGO_URI
);

(async () => {

  const hash =
    await bcrypt.hash(
      "baskar@123",
      10
    );

  await User.create({
    name: "Baskar",
    email:
      "baskar@gmail.com",
    password: hash,
    roles: ["admin"],
  });

  console.log(
    "Admin Created"
  );

  process.exit();

})();