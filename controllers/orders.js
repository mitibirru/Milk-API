import Milk from "../models/Milk.js";
import Order from "../models/Order.js";

const getTodayDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  return {
    yyyy,
    mm,
    dd,
  };
};
const getDate = (date) => {
  var today = new Date(date);
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  return {
    yyyy,
    mm,
    dd,
  };
};

export const newOrder = async (req, res) => {
  const { yyyy, mm, dd } = getTodayDate();
  try {
    // Milk operations
    let todayMilk = await Milk.findOne({ date: new Date(yyyy, mm, dd) });
    todayMilk.todayQuantity -= req.body.quantity;
    todayMilk = await todayMilk.save();

    // order operation
    const totalPrice = req.body.quantity * todayMilk.todayPrice;
    const order = new Order({ ...req.body, totalPrice });
    const savedOrder = await order.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
export const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const { yyyy, mm, dd } = getTodayDate();
  try {
    // Milk operations
    let todayMilk = await Milk.findOne({ date: new Date(yyyy, mm, dd) });

    // order operation
    let updatedOrder = await Order.findById(orderId);
    let CurrentOrderQuantity = updatedOrder.quantity;
    let newOrderQuantity = req.body.quantity || CurrentOrderQuantity;
    if (CurrentOrderQuantity < newOrderQuantity) {
      todayMilk.todayQuantity -= newOrderQuantity - CurrentOrderQuantity;
    } else if (CurrentOrderQuantity > newOrderQuantity) {
      todayMilk.todayQuantity += CurrentOrderQuantity - newOrderQuantity;
    }
    const totalPrice = newOrderQuantity * todayMilk.todayPrice;
    updatedOrder.totalPrice = totalPrice;
    updatedOrder.quantity = newOrderQuantity;

    updatedOrder = await updatedOrder.save();
    todayMilk = await todayMilk.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
export const updateStatusOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    let updatedOrder = await Order.findById(orderId);
    res.status(200).json(updateOrder.status);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const checkCapacityMilk = async (req, res) => {
  const { yyyy, mm, dd } = getDate(req.params.date);
  try {
    let todayMilk = await Milk.findOne({ date: new Date(yyyy, mm, dd) });
    res.status(200).json(todayMilk);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
