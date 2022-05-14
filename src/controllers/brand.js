const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Brand = require('../models/Brand')






const getAllBrands = async (req, res) => {
    try {
        const Brands = await Brand.find({}).sort({ _id: -1 });
        res.send(Brands);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};



const getBrandById = async (req, res) => {
    try {
        const Brand = await Brand.findById(req.params.id);
        res.send(Brand);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const updateBrand = async (req, res) => {
    try {
        const imgUrl = `http://localhost:5000/uploads/${req.file.filename}`
        console.log("aaaaaaaa")
    
        const brandId = req.params.brandId;
        // const brandId = req.body.brandId;
        const name = req.body.name;
        console.log(brandId, name)
        console.log("bbb")
        await Brand.updateOne(
          { _id: brandId },
          {
            $set: {
             
              name,
              image: imgUrl
            },
          }
        );
        res.status(200).json({
          message: "Brand edited",
        })
        console.log("cccc")
        
      } catch(err) {
        res.status(500).json({err});
        console.log("ddd")
        console.log(err)

      }
};

deleteBrand = async (req, res) => {
    try {
      const id = req.params.brandId;
      console.log(id)
      await Brand.deleteOne({ _id: id });
      const brands = await Brand.find({});
  
      return res.status(200).json({ message: "Successfully Deleted", brands });
    } catch (err) {
      res.status(500);
    }
  };


module.exports = {
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand,
};


