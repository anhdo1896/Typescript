import express from "express";
import {
  GetFoodAvailability,
  GetFoods,
  GetFoodsIn30min,
  GetTopRestaurants,
  RestaurantById,
  SearchFoods,
} from "../controllers";

const router = express.Router();

/** ============== Food availability ================== **/

router.get("/:pincode", GetFoodAvailability);

/** ============== Top Restaurants ================== **/

router.get("/top-restaurants/:pincode", GetTopRestaurants);

/** ============== Food available in 30 minutes ================== **/

router.get("/foods-in-30-min/:pincode", GetFoodsIn30min);

/** ============== Search Foods ================== **/

router.get("search/:pincode", SearchFoods);

/** ============== Find Restaurants By ID ================== **/

router.get("/restaurant/:id", RestaurantById);

export { router as ShoppingRoute };
