import UserValidator from "contracts/validators/user.validator";

const validateEmail = (email: string) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex)) {
    return false;
  }

  return true;
};

const validatePassword = (password: string) => {
  if (password.length < 8) {
    return false;
  }

  return true;
};

export const validateRegister = (options: UserValidator) => {
  let errors = [];
  if (options.email === "" || !validateEmail(options.email)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address",
    });
  }

  if (options.password === "" || !validatePassword(options.password)) {
    errors.push({
      field: "password",
      message: "Password must be at least 8 characters",
    });
  }

  if (options.fullName === "") {
    errors.push({
      field: "fullName",
      message: "Please enter your name",
    });
  }

  return errors.length === 0 ? null : errors;
};
