import express from "express";
import {
  newOrder,
  updateOrder,
  updateStatusOrder,
  deleteOrder,
  checkCapacityMilk,
} from "../controllers/orders.js";

import { newMilk } from "../controllers/milk.js";

const router = express.Router();

router.post("/add", newOrder);
router.post("/add/milk", newMilk);
router.put("/update/:id", updateOrder);
router.get("/updateStatus/:id", updateStatusOrder);
router.delete("/delete/:id", deleteOrder);
router.get("/checkCapacity/:date", checkCapacityMilk);

export default router;
