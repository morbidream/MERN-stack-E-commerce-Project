import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth-context";
import PageTitle from "../../components/Common/PageTitle";
import ProductsArea from "../../components/Products/ProductsArea";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

function Products() {
  const [products, setProducts] = useState([]);
  const context = useContext(AuthContext);
  const idUser=JSON.parse(localStorage.getItem('user'))._id

  useEffect(() => {
    axios
      .get("http://localhost:5000/products/")
      // .get("http://localhost:5000/products/fetch-productByUser/"+idUser)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);
  
  const editProduct = (
    prod_id,
    prod_name,
    prod_description,
    prod_image,
    prod_type,
    prod_brand,
    prod_gender,
    prod_color,
    prod_price,
    prod_instock,
  ) => {
    const formData = new FormData();
    formData.append("product_id", prod_id);
    formData.append("product_name", prod_name);
    formData.append("product_description", prod_description);
    formData.append("product_type", prod_type);
    formData.append("product_brand", prod_brand);
    formData.append("product_gender", prod_gender);
    formData.append("product_color", prod_color);
    formData.append("product_price", prod_price);
    formData.append("total_in_stock", prod_instock);
    formData.append("image", prod_image);

    axios
      .put("http://127.0.0.1:5000/products/edit-product/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.message === "Product edited") {
          console.log(formData,res.data)
          return axios.get("/products/").then((res) => {
            setProducts(res.data.products);
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteProduct = (id) => {
    axios
      .post(`/products/delete-product`, {
        productId: id,
      })
      .then((res) => {
        if (res.data.message === "Successfully Deleted") {
          setProducts(res.data.products);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="products-wrap">
      <PageTitle title="Products" />
      <ProductsArea
        products={products}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
      />
      <Footer />
    </div>
  );
}

export default Products;
