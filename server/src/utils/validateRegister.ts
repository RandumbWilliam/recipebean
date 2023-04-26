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

const validateName = (name: string) => {
  return /^[a-zA-Z]+$/.test(name);
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

  if (options.firstName === "") {
    errors.push({
      field: "firstName",
      message: "Please enter your first name",
    });
  } else if (!validateName(options.firstName)) {
    errors.push({
      field: "firstName",
      message: "Name can only contain letters",
    });
  }

  if (options.lastName === "") {
    errors.push({
      field: "lastName",
      message: "Please enter your last name",
    });
  } else if (!validateName(options.lastName)) {
    errors.push({
      field: "lastName",
      message: "Name can only contain letters",
    });
  }

  return errors.length === 0 ? null : errors;
};
