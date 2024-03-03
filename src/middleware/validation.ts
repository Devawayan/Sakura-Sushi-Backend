import { NextFunction , Request , Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async ( req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();

};

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name is required and must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("Address Line 1 is required and must be a string"),
    body("city").isString().notEmpty().withMessage("City is required and must be a string"),
    body("country").isString().notEmpty().withMessage("Country is required and must be a string"),
    handleValidationErrors,
];

export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Restaurant Name is Required"),
    body("city").notEmpty().withMessage("City Name is Required"),
    body("country").notEmpty().withMessage("Country Name is Required"),
    body("deliveryPrice").isFloat({ min: 0 }).withMessage("Delivery price must be a positive Number"),
    body("estimatedDeliveryTime").isInt({ min: 0 }).withMessage("Estimated delivery time must be a positive number"),
    body("cuisines").isArray().withMessage("Cuisines must be an set of Numbers together").not().isEmpty().withMessage("Cuisines cannot be Empty it needs to be specified"),
    body("menuItems").isArray().withMessage("Menu Items must also be set of an Array"),
    body("menuItems.*.name").notEmpty().withMessage("Meu Items name is Required"),
    body("menuItems.*.price").isFloat({ min: 0 }).withMessage("Meu Items price is Required and must be an positive number"),
    handleValidationErrors,
];