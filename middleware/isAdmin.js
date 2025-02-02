import authModel from "../models/auth.model.js";

const isAdmin = async (req, res, next) => {
  const requester = req?.userId;
  const requesterAccount = await authModel.findOne({ _id: requester });
  if (requesterAccount?.role !== "admin") {
    return res.status(403).send({ message: "Forbidden Access." });
  } else {
    next();
  }
};

export default isAdmin;
