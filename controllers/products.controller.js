import productsModel from "../models/products.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const result = await productsModel.find();
    res.send(result);
  } catch (error) {
    console.log(e.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const result = await productsModel.findById(req.params.id);
    res.send(result);
  } catch (error) {
    console.log(e.message);
  }
};
