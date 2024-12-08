import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  const email = req.body.email;
  try {
    const result = await User.updateOne(
      { email },
      {
        email,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
