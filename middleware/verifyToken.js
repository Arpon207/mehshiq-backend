import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access." });
  }
  try {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid Token." });
      }
      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    if (err) {
      return res.status(500).json({ success: false, message: "Server error." });
    }
  }
};
