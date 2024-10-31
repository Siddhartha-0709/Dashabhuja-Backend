import { Router } from "express";
import { createOrder, createProduct, deleteOrders, deleteProduct, getOrders, getProducts, updateOrders } from "../controller/commerce.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/create-product').post(upload.single("image"), createProduct);
router.route('/delete-product').get(deleteProduct);
router.route('/get-products').get(getProducts);

router.route('/create-order').post(createOrder);
router.route('/delete-orders').get(deleteOrders);
router.route('/update-orders').post(updateOrders);
router.route('/get-orders').get(getOrders);

export default router;