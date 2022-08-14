import Milk from "../models/Milk.js";

export const newMilk = async (req, res) => {
  const newMilk = new Milk(req.body);
  try {
    const savedMilk = await newMilk.save();
    res.status(200).json(savedMilk);
  } catch (error) {
    res.send(error.status).json(error);
  }
};
