import mongoose from "mongoose";
import Milk from "./Milk.js";
const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  status: {
    type: String,
  },
});

OrderSchema.pre("save", function () {
  this.status = "placed";
});

export default mongoose.model("Order", OrderSchema);
