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
  if (options.email === "") {
    errors.push({
      field: "email",
      message: "Required field!",
    });
  } else if (!validateEmail(options.email)) {
    errors.push({
      field: "email",
      message: "Invalid email address!",
    });
  }

  if (options.password === "") {
    errors.push({
      field: "password",
      message: "Required field!",
    });
  } else if (!validatePassword(options.password)) {
    errors.push({
      field: "password",
      message: "Password must be at least 8 characters!",
    });
  }

  if (options.firstName === "") {
    errors.push({
      field: "firstName",
      message: "Required field!",
    });
  } else if (!validateName(options.firstName)) {
    errors.push({
      field: "firstName",
      message: "First name can only contain letters!",
    });
  }

  if (options.lastName === "") {
    errors.push({
      field: "lastName",
      message: "Required field!",
    });
  } else if (!validateName(options.lastName)) {
    errors.push({
      field: "lastName",
      message: "Last name can only contain letters!",
    });
  }

  return errors.length === 0 ? null : errors;
};
