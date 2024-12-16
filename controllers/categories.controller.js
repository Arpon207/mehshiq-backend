import categoryModel from "../models/category.model.js";

export const addCategory = async (req, res) => {
  const body = req.body;
  const category = new categoryModel(body);
  const result = await category.save();
  res.status(201).json({ result });
};
