import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth-context";
import PageTitle from "../../components/Common/PageTitle";
import MyAuctionArea from "../../components/Auction/MyAuctionsArea";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import { useHistory, useParams } from "react-router-dom";

function MyAuctions() {
  const [auction, setAuction] = useState([]);
  const context = useContext(AuthContext);


  
  

  const editAuction = (
    auctionId,
    productName,
    description,
    catergory,
    Price,
    duration,
    currentPrice,
    prod_image_public_id
  ) => {
    const formData = new FormData();
    formData.append("auction_id", auctionId);
    formData.append("productName", productName);
    formData.append("description", description);

    formData.append("catergory", catergory);
    formData.append("Price", Price);
    formData.append("duration", duration);
    formData.append("currentPrice", currentPrice);
    formData.append("image_public_id", prod_image_public_id);
    formData.append("upload_preset", "econix");

    axios
      .post("/auction/edit-auction", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        
        const id=JSON.parse(localStorage.getItem("user"))._id;
        if (res.data.message === "Auction edited") {

          return axios.get(`/auction/fetch-MyAuctions/${id}`).then((res) => {
            setAuction(res.data.auctions);
            console.log("hedhi paaage")  
          });
        }
      })
      .catch((err) => console.log(err));
  };

  let history = useHistory();


 

  return (
    <div className="products-wrap">
      <PageTitle title="Auctions" />
      <MyAuctionArea
        auction={auction}
        editAuction={editAuction}

      />
      <Footer />
    </div>
  );
}

export default MyAuctions;
