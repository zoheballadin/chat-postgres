import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  try {
    let token = jwt.sign(payload, "zoheballadin");
    return token;
  } catch (error) {
    console.log(error);
    return;
  }
};

const isAuthenticated = (req, res, next) => {
  try {
    let token = req.headers["auth-token"];
    let payload = jwt.verify(token, "zoheballadin");
    req.payload = payload;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({error: "Invalid Token"})
  }
};

export {isAuthenticated, generateToken}
