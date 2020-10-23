export const LOCAL_STORAGE_TOKEN = "access_token";
export const LOCAL_STORAGE_USER = "insta_user";

export const responseStatuses = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

export const validateRegData = ({ email, password }) => {
  const fieldsErrors = {};
  if (password.length < 6)
    fieldsErrors.password = "Password must be 6 characters or longer.";
  if (!password) fieldsErrors.password = "Please enter your password.";
  const pattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if (!email.match(pattern)) fieldsErrors.email = "Email address is invalid";
  if (!email && email !== 0)
    fieldsErrors.email = "Please enter your email address";
  return Object.keys(fieldsErrors).length ? fieldsErrors : false;
};
