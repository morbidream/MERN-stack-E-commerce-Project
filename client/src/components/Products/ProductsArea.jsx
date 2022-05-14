import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import authContext from "../../contexts/auth-context";
import {  ChromePicker} from 'react-color'

function ProductsArea({ products, history, editProduct, deleteProduct }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [product_type, setProductType] = useState("");
  const [product_gender, setProductGender] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [product_brand, setProductBrand] = useState("");
  const [inStock, setInStock] = useState("");
  const [role, setRole] = useState("user");
  const [product, setProduct] = useState({});
  const [imagePublicId, setImagePublicId] = useState(null);
  const [product_image, setProductImages] = useState("");
  const context = useContext(authContext);
  const [errors, setErrors] = useState({});
  
  const [discount, setDiscount] = useState("");

  const [showColorPicker, setShowColorPicker] = useState(true)

  const [brandsList, setBrandsList] = useState([]);
  const [catList, setCatList] = useState([]);


  useEffect(() => {

    const getCategories = async() => { 
      const {data} = await axios.get(`http://127.0.0.1:5000/category`)
    console.log(data)
    setCatList(data)
     }

  const getBrands = async () =>{
    const {data} = await axios.get(`http://127.0.0.1:5000/brand/`)
         setBrandsList(data)
    console.log(data)
  }
    getBrands()
     getCategories() 


    // axios
    //   .post("/user/check-role", {
    //     userId: context.userId,
    //   })
    //   .then((res) => setRole(res.data.role))
    //   .catch((err) => console.log(err));
  }, []);

  const goToDetails = (id) => {
    history.push(`/products-details/${id}`);
  };

  const openDeleteModal = (product, imagePublicId) => {
    setProduct(product);
    setImagePublicId(imagePublicId);
  };

  const openEditModal = (product) => {
    setProduct(product);
    setName(product.name);
    setDescription(product.description);
    setProductImages(product.image);
    setProductType(product.type);
    setColor(product.color);
    setPrice(product.price);
    setProductBrand(product.brand);
    setProductGender(product.gender)
    setInStock(product.total_in_stock);
    setImage(product.image);
  };


  const applyDiscount = async (id) =>{
    axios.post("products/discount/"+id,{discount})
    setDiscount("")
  }

  const handleChange = async e => {

    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

   

    setProductImages(image);
  };

  return (
    <div className="products-area-wrap container">
      {true ? (
        <>
        <div className="container">
          <table className="order_list_table product_list_table">
            <thead>
              <tr className="order_table100_head">
                <th className="order_column1">Image</th>
                <th className="order_column1">Name</th>
                <th className="order_column1">Discount</th>
                <th className="order_column1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product, index) => {
                  return (
                    <tr key={index} className="product_tr">
                      <td className="order_column1">
                        <img src={product.image} width="50" alt="product image" />
                      </td>
                      <td
                        onClick={() => goToDetails(product._id)}
                        style={{ cursor: "pointer" }}
                        className="order_column2"
                      >
                        {product.name}
                      </td>
                      <td className="order_column1">
                      <div class="input-group mb-3" key={index}>
  <button key={index} className="btn btn-outline-success" type="button" onClick={()=>applyDiscount(product._id)} id="button-addon1">Apply </button>
  <input key={index} type="number" value={discount}  onChange={(e) => setDiscount(e.target.value)} className="form-control" placeholder="Please enter a discount" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
    </div>
                      </td>
                      <td className="order_column4">
                        
                        <button
                          type="button"
                          onClick={() =>
                            openDeleteModal(product, product.imageId)
                          }
                          className="btn btn-danger"
                          data-toggle="modal"
                          data-target="#deleteModal"
                        >
                          Delete
                        </button>{" "}
                        <button
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target="#editModal"
                          onClick={() =>
                            openEditModal(product, product.imageId)
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          </div>
          <div
            className="modal fade"
            id="deleteModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="deleteModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteModalLabel">
                    Delete - {product.name}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={() => deleteProduct(product._id, imagePublicId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="editModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editModalLabel">
                    Edit - {name}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Product Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="product_images">Product Image</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
              <label htmlFor="product_gender">Choose gender</label>
              <select
                className="form-control"
                value={product_gender}
                onChange={(e) => setProductGender(e.target.value)}
              >
                <option value={null}>Gender</option>
                <option value="man">Man</option>
                <option value="woman">Woman</option>
                <option value="kids">Kids</option>
              </select>
              {product_gender === '' && <p className="error_gender">{errors.product_gender}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="product_brand">Choose Brand</label>
              <select
                className="form-control"
                value={product_brand}
                onChange={(e) => setProductBrand(e.target.value)}
              >
                <option value={null}>Brand</option>
                {brandsList && brandsList.map(brand =><option key={brand._id} value={brand._id}>{brand.name}</option>)}
                
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="product_type">Product Type</label>
              <select
                className="form-control"
                value={product_type}
                onChange={(e) => setProductType(e.target.value)}
              >
                <option value={null}>All Type</option>
               {/* {catList?.map(cat=> (<option value={cat.name}>{cat.name}</option>))}  */}
               {catList && catList.map(cat =><option key={cat._id} value={cat.name}>{cat.name}</option>)}
                
              </select>
              {product_type === '' && <p className="error_color">{errors.product_type}</p>}
            </div>
          
                    <div className="form-group">
                    <div className="d-flex">
  
      
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Color"
                            id="product_color"
                            value={color}
                            onChange={(updatedColor) => setColor(updatedColor)}
                            disabled
                          />
                        </div>
                        {showColorPicker && (
                                <ChromePicker id="product_color" color={color}  onChange={(updatedColor) => setColor(updatedColor.hex)}  />

                        )}
                                            </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Product Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Total in stock"
                        value={inStock}
                        onChange={(e) => setInStock(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    data-dismiss="modal"
                    onClick={() =>
                      editProduct(
                        product._id,
                        name,
                        description,
                        product_image,
                        product_type,
                        product_brand,
                        product_gender,
                        color,
                        price,
                        inStock
                      )
                    }
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2>You are not allowed to view this page</h2>
      )}
    </div>
  );
}

export default withRouter(ProductsArea);
