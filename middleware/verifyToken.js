import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access." });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, message: "Invalid Token." });
        }
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
      }
    );
  } catch (error) {
    if (err) {
      return res.status(500).json({ success: false, message: "Server error." });
    }
  }
};
