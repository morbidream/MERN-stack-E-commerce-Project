const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category");

router.post("/add-category", categoryController.addCategory);
router.put("/edit-category/:categoryId", categoryController.updateCategory);
router.get("/", categoryController.getAllCategories);
router.get("/fetch-category/:id", categoryController.getCategoryById);
router.delete("/delete-category/:categoryId", categoryController.deleteCategory);

module.exports = router;
