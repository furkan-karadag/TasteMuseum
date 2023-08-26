import express from "express";
const router = express.Router();
import {
    dailyFood,
    addFood,
    getAllFoods,
    getFood
} from "../controllers/foodController.js";

router.get("/daily", dailyFood);
router.post("/addFood", addFood);
router.get("/all", getAllFoods);
router.get("/:foodId", getFood);

export default router;
