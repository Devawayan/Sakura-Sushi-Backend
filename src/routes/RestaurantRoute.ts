import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

router.get("/:restaurantId", 
    param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("restaurantId Parameter must be a validate string"),
    RestaurantController.getRestaurant
);

router.get("/search/:city", 
 param("city")
 .isString()
 .trim()
 .notEmpty()
 .withMessage("City Parameter must be a string"),
 RestaurantController.searchRestaurant
);

export default router;