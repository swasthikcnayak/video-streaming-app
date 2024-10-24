const signupValidator = {
  email: {
    errorMessage: "Email must be provided",
    in: ["body"],
    isEmail: {
      errorMessage: "Must be a valid e-mail address",
    },
  },
  username: {
    in: ["body"],
    errorMessage: "Username must be provided",
    notEmpty: true,
  },
  password: {
    in: ["body"],
    errorMessage:
      "The password must be at least 8 characters, and must contain a symbol",
    notEmpty: true,
    isLength: { options: { min: 8 } },
  },
};

const signInValidator = {
  username: {
    in: ["body"],
    errorMessage: "Username must be provided",
    notEmpty: true,
  },
  password: {
    in: ["body"],
    errorMessage: "Password must be provided",
    notEmpty: true,
  },
};

module.exports = { signupValidator, signInValidator };
