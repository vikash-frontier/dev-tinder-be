const validator = require("validator");

const validationSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("First name and last name are required! ");
  } else if (firstName.length < 3 || firstName.length > 50) {
    throw new Error(
      "First name and last name should be between 3 to 50 characters! "
    );
  } else if (lastName.length < 3 || lastName.length > 50) {
    throw new Error(
      "First name and last name should be between 3 to 50 characters! "
    );
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is invalid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password should be strong!");
  }
};

module.exports = { validationSignUpData };
