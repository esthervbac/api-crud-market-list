import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
});

const ShoppingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    items: [ProductSchema],

    purchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "market_lists",
    timestamps: true,
  },
);

export default mongoose.model("Shopping", ShoppingSchema);
