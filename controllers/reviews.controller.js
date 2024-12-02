import cloudinary from "../lib/cloudinary.config.js";
import reviewsModel from "../models/reviews.model.js";

export const addReview = async (req, res) => {
  const body = req.body;
  const reviewsImageUrls = req.body?.previewImages;
  try {
    let reviewImages = [];
    if (reviewsImageUrls) {
      for (let i = 0; i < reviewsImageUrls.length; i++) {
        const { url, public_id } = await cloudinary.uploader.upload(
          reviewsImageUrls[i],
          {
            upload_preset: "review_images",
            // transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
          }
        );
        reviewImages.push({ url, public_id });
      }
    }
    const { previewImages, ...bodyData } = body;
    const updatedReview = { ...bodyData, images: reviewImages };
    const reviews = new reviewsModel(updatedReview);
    const result = await reviews.save();
    res.status(201).json({ result });
  } catch (error) {
    console.log(error);
  }
};

export const getAllReviews = async (req, res) => {
  const product = req.query.product;
  try {
    const result = await reviewsModel.find({ product });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
