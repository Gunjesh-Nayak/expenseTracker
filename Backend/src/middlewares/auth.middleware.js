import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
   try {
    // console.log(" AUTH MIDDLEWARE RUNNING");

    const token = req.cookies.Token;

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded);

    // 🔥 CRITICAL LINE
    req.userId = decoded.id;

    console.log("SET USER ID:", req.userId); // 👈 add this

    next(); //  MUST be called AFTER setting userId

  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }

};
export default auth;