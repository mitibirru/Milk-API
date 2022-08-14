import mongoose from "mongoose";
const MilkSchema = new mongoose.Schema({
  todayPrice: {
    type: Number,
    required: true,
  },
  todayQuantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
});

MilkSchema.pre("save", function () {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  this.date = new Date(yyyy, mm, dd);
});

export default mongoose.model("Milk", MilkSchema);
