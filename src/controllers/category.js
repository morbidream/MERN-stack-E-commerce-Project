const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/Category')

const addCategory = async (req, res) => {
    try {
            const newCategory = new Category(req.body);
             await newCategory.save()
            res.status(200).send({
                message: "Category added"
            });
            

    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const Categories = await Category.find({}).sort({ _id: -1 });
        res.send(Categories);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};



const getCategoryById = async (req, res) => {
    try {
        const Category = await Category.findById(req.params.id);
        res.send(Category);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const updateCategory = async (req, res) => {
    try {
      
    
        const categoryId = req.params.categoryId;
        // const categoryId = req.body.categoryId;
        const name = req.body.name;
        console.log(categoryId, name)
        console.log("bbb")
        await Category.updateOne(
          { _id: categoryId },
          {
            $set: {
              name,
          
            },
          }
        );
        res.status(200).json({
          message: "Category edited",
        })
        console.log("cccc")
        
      } catch(err) {
        res.status(500).json({err});
        console.log("ddd")
        console.log(err)

      }
};

deleteCategory = async (req, res) => {
    try {
      const id = req.params.categoryId;
      console.log(id)
      await Category.deleteOne({ _id: id });
      const Categories = await Category.find({});
  
      return res.status(200).json({ message: "Successfully Deleted", Categories });
    } catch (err) {
      res.status(500);
    }
  };


module.exports = {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};


