export const signupValidation = ({ user, setError }) => {
  // Validate First Name
  const { firstName, lastName, emailId, password } = user;

  if (!firstName && !lastName && !emailId && !password) {
    setError("All fields are required.");
    return false;
  }

  if (!firstName.trim()) {
    setError("First Name is required.");
    return false;
  } else if (firstName.trim().length < 2) {
    setError("First Name must be at least 2 characters.");
    return false;
  }

  // Validate Last Name
  if (!lastName.trim()) {
    setError("Last Name is required.");
    return false;
  } else if (lastName.trim().length < 2) {
    setError("Last Name must be at least 2 characters.");
    return false;
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailId.trim()) {
    setError("Email is required.");
    return false;
  } else if (!emailRegex.test(emailId.trim())) {
    setError("Please enter a valid email address.");
    return false;
  }

  // Validate Password
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!password.trim()) {
    setError("Password is required.");
    return false;
  } else if (!passwordRegex.test(password)) {
    setError(
      "Password must be at least 6 characters and include uppercase, lowercase, number, and special character."
    );
    return false;
  }

  // Clear error if all validations pass
  setError("");
  return true;
};

export const loginValidation = (user, setError) => {
  const { emailId, password } = user;

  // Validate Email
  if (!emailId.trim()) {
    setError("Email is required.");
    return false;
  }

  // Validate Password
  if (!password.trim()) {
    setError("Password is required.");
    return false;
  }

  // Clear error if all validations pass
  setError("");
  return true;
};