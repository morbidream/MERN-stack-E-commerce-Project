import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
function SpecialOffer({ product }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products/3bestPromo")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <section className="offer-products-area pb-70">
      <div className="container">
        <div className="section-title">
          <h2>Special Offer</h2>
        </div>

        <div className="row justify-content-center">
          {products &&
            products.slice(0, 3).map((product) => {
              return (
                <div className="col-lg-4 col-md-6" key={product._id}>
                  <div className="single-offer-products">
                    <div className="offer-products-image">
                      <Link to={`/products-details/${product._id}`}>
                      <img src={product.image} style={{width:"288px", height:"288px" }} />
                      </Link>
                      <div className="tag">{product.discount*100}</div>
                    </div>

                    <div className="offer-products-content">
                      <span>{product.type}</span>
                      <h3>
                        <Link to={`/products-details/${product._id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <div className="price">
                        <span className="new-price">{product.price}DT</span>
                        <span className="old-price">{product.oldPrice}DT</span>
                      </div>
                      <ul className="rating">
                        <li>
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default SpecialOffer;
