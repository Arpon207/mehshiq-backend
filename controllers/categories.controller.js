import categoryModel from "../models/category.model.js";

export const addCategory = async (req, res) => {
  try {
    const body = req.body;
    const category = new categoryModel(body);
    const result = await category.save();
    res.status(201).json({ result });
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async (req, res) => {
  try {
    const result = await categoryModel.find();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
