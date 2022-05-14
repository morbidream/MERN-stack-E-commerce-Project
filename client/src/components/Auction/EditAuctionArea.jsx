import React, { useState , useEffect} from "react";
import axios from "axios";
import validate from './validateinfo';
import { Link, Route, Router, useHistory, useParams } from "react-router-dom";

function EditAuctionArea() {
  const [auction, setAuction] = useState({});

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [currentPrice, setcurrentPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [catergory, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState();
  const [auctionStarted, setAuctionstarted] = useState(false);
  let history = useHistory();

  const { auctionId } = useParams();

  useEffect(() => {
    

    axios
      .get("/auction/fetch-auction/" + auctionId)
      .then((res) => {

        setAuction(res.data.auction);
        setDuration(res.data.auction.duration)
        setcurrentPrice(res.data.auction.currentPrice)


      })
      .catch((err) => console.log(err));
  }, []);
  function updateAuction(id){

  let Auction={productName,description,Price,currentPrice,duration,catergory}
  console.warn("Auction",Auction)
  fetch(`/auction/update-auction/`+id,{
    method:'PUT',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify(Auction)
  }).then((res)=>{
    res.text().then((resp)=>{
      console.log(resp);
 })
  })

}
 



  
  return (
    <div className="add-auction-area-wrap ptb-50">
      <div className="container">
        <div className="add-auction-form">
          {message == "" && (
            <div className={`alert alert-success`} role="alert">
              {message}
            </div>
          )}
          <h2>Edit Auction</h2>
          <hr />
          <form  encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="productName"
                value={auction.productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              {productName ==='' && <p className="error_color">{errors.productName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="description">Product Description</label>
              <textarea
                className="form-control"
                id="description"
                value={auction.description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              ></textarea>
              {description === '' && <p className="error_color">{errors.description}</p>}
            </div>


          
           
           

            <div className="form-group">
              <label htmlFor="duration">Price</label>
              <input
                className="form-control"
                type="number"
                id="Price"
                value={auction.Price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              ></input>
              {Price === '' && <p className="error_color">{errors.Price}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                className="form-control"
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration"
              ></input>
              {duration === '' && <p className="error_color">{errors.duration}</p>}
            </div>

           




          
            <div className="form-group">
              <label htmlFor="catergory">Catergory</label>
              <select
                className="form-control"
                value={auction.catergory}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All Type</option>
                <option value="accessories">Accessories</option>
                <option value="audio">Audio</option>
                <option value="beauty_picks">Beauty Picks</option>
                <option value="cameras">Cameras</option>
                <option value="computers">Computers</option>
                <option value="electronics">Electronics</option>
                <option value="laptop">Laptop</option>
                <option value="mobile">Mobile</option>
                <option value="watches">Watches</option>
                <option value="headphone">Headphone</option>
              </select>
              {catergory === '' && <p className="error_color">{errors.catergory}</p>}
            </div>

           
           
            <Link to={`/auction`}> <button onClick={updateAuction} type="submit" className="add-product-btn"><i className=" add-product-btn-icon"></i>Edit</button></Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAuctionArea;
