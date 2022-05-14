import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import  {useState,useEffect} from 'react';
function RecommendationCarousel({}) {
  const addToWishList = async (prodId,userId) => await axios.post(`http://127.0.0.1:5000/products/wishList/${prodId}/624c8bfefd030635b846db8e`)
  const [products, setProducts] =useState([]);
    useEffect(()=>{
       const getProducts = async(gender,colour) => {
          const res= await axios.get(`http://127.0.0.1:5000/products/recommendation/${gender}/${colour}`)
          setProducts(res.data);
       }
       getProducts("men","Green")
    } , [])
    console.log(products)
    return (
      <div className="container">
                    <br/>
          <h4>Recommendation</h4>
          <br/>

                <div className="d-flex justify-content-center">
              <div className="row">
                {products &&
                products.map((product) => (
              <div className="col-lg-3 col-sm-6" key={product._id}>
                <div className="single-shop-products">
                  <div className="shop-products-image">
                    <Link to={`/products-details/${product._id}`}>
                    
                      <img src={product.image} width="300"  alt="image" />
                    </Link>
                    <ul className="shop-action">
                     
                      <li>
                          <span className="addtocart-icon-wrap" onClick={()=>{addToWishList(product._id,"624c8bfefd030635b846db8e")}}>
                            <i className="flaticon-heart"></i>
                            </span>
                      </li>
                     
                    </ul>
                  </div>

                  <div className="shop-products-content">
                    <h3>
                      <Link to={`/products-details/${product._id}`}  >
                        {product.name}
                      </Link>
                    </h3>
                 
                    <span>{product.price}</span>
                  </div>
                </div>
              </div>
            ))}

         
        </div>
        </div>
        </div>
    );
}

export default RecommendationCarousel;