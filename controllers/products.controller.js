import formidable from "formidable";
import cloudinary from "../lib/cloudinary.config.js";
import productsModel from "../models/products.model.js";

export const addProduct = async (req, res) => {
  const productData = req.body;
  const { variants } = productData;
  try {
    if (variants) {
      for (let i = 0; i < variants.length; i++) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
          variants[i].image,
          {
            upload_preset: "product_images",
            // transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
          }
        );
        variants[i].image = { url: secure_url, public_id };
      }
    }
    const newProductData = {
      ...productData,
      variants: variants,
    };
    const product = new productsModel(newProductData);
    const result = await product.save();
    res.status(201).json({ result });
  } catch (error) {
    console.log(error);
  }
};

export const uploadImages = async (req, res) => {
  const form = formidable({});
  try {
    const [_, files] = await form.parse(req);
    let allImage = [];
    const { images } = files;
    for (let i = 0; i < images.length; i++) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        images[i].filepath,
        {
          upload_preset: "product_images",
          // transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
        }
      );
      allImage.push({ url: secure_url, public_id });
    }
    return res
      .status(201)
      .json({ images: allImage, message: "images added successfully." });
  } catch (error) {
    return res
      .status(501)
      .json({ images: allImage, message: "Failed to add images." });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const result = await productsModel.find();
    res.send(result);
  } catch (error) {
    console.log(e.message);
  }
};

export const newProducts = async (req, res) => {
  try {
    const result = await productsModel.find().sort({ createdAt: -1 }).limit(10);
    res.send(result);
  } catch (error) {
    console.log(e.message);
  }
};

export const bestSellerProducts = async (req, res) => {
  try {
    const result = await productsModel.find().sort({ sold: -1 }).limit(14);
    res.send(result);
  } catch (error) {
    console.log(e.message);
  }
};

export const getWomensProducts = async (req, res) => {
  try {
    const result = await productsModel.find().limit(10);
    res.send(result);
  } catch (error) {
    console.log(e.message);
  }
};

export const getMensProducts = async (req, res) => {
  try {
    const result = await productsModel.find().limit(10);
    res.send(result);
  } catch (error) {
    console.log(e.message);
  }
};

export const getBackPacks = async (req, res) => {
  try {
    const result = await productsModel
      .find({ category: "Backpacks" })
      .limit(10);
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

export const getProductsByCategory = async (req, res) => {
  const filter = {
    ...(req.query.category && { category: req.query.category }),
    ...(req.query.min &&
      req.query.max && { price: { $gt: req.query.min, $lt: req.query.max } }),
  };
  const sort = {
    ...(req.query.sort === "popularity" && { sold: -1 }),
    ...(req.query.sort === "latest" && { createdAt: -1 }),
    ...(req.query.sort === "priceLowToHigh" && { price: 1 }),
    ...(req.query.sort === "priceHighToLow" && { price: -1 }),
  };
  const currentPage = req.query.currentPage;
  const limitPerPage = req.query.limitPerPage;
  try {
    const result = await productsModel
      .find(filter)
      .skip((currentPage - 1) * limitPerPage)
      .limit(limitPerPage)
      .sort(sort);
    const count = await productsModel.countDocuments(filter);
    res.send({ result, count });
  } catch (error) {
    console.log(e.message);
  }
};

export const getProductsByQuery = async (req, res) => {
  const filter = {
    ...(req.query.search && {
      title: { $regex: req.query.search, $options: "i" },
    }),
  };
  try {
    const result = await productsModel.find(filter);
    return res.status(200).json({ result });
  } catch (error) {
    throw error;
  }
};

export const getLeastProducts = async (req, res) => {
  try {
    const result = await productsModel.find().sort({ sold: 1 }).limit(8);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

//Admin

export const getProductsByFilter = async (req, res) => {
  const filter = {
    ...(req.query.search && {
      title: { $regex: req.query.search, $options: "i" },
    }),
    ...(req.query.filter === "outOfStock" && { "variants.quantity": 0 }),
  };
  try {
    const result = await productsModel.find(filter).sort({ createdAt: -1 });
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateVariantQuantity = async (req, res) => {
  const id = req.query.id;
  const color = req.query.color;
  const quantity = req.query.quantity;
  try {
    const result = await productsModel.findOneAndUpdate(
      { _id: id, "variants.colorName": color },
      {
        $set: {
          "variants.$.quantity": quantity,
        },
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const deleteVariant = async (req, res) => {
  const id = req.query.id;
  const color = req.query.color;
  const public_id = req.query.public_id;
  try {
    if (public_id) {
      await cloudinary.uploader.destroy(public_id).then(async (response) => {
        const result = await productsModel.findOneAndUpdate(
          { _id: id },
          {
            $pull: {
              variants: { colorName: color },
            },
          },
          { new: true }
        );
        res.status(200).json(result);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addVariant = async (req, res) => {
  const id = req.query.id;
  const variant = req.body;

  try {
    if (variant) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        variant.image,
        {
          upload_preset: "product_images",
          // transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
        }
      );
      variant.image = { url: secure_url, public_id };
    }
    const result = await productsModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          variants: variant,
        },
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const editDetails = async (req, res) => {
  const id = req.query.id;
  const details = req.body;
  try {
    const result = await productsModel.findOneAndUpdate({ _id: id }, details, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.query.id;
  const variants = req.body;
  try {
    if (variants) {
      for (const image of variants) {
        await cloudinary.uploader.destroy(image.image.public_id);
      }
      const result = await productsModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Product deleted successfully" });
    }
  } catch (error) {
    throw error;
  }
};
