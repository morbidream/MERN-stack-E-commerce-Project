 
import { Form, Col,Row, Container } from 'react-bootstrap';
import React, { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Select from "react-select";
///////////////////////////////////////////////design button API externe
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, blue 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});
////
function CreateEvent() {
  
  const classes = useStyles();
  
  //toastify
  
  const  [isValidForm, setIsValidForm] = useState(true)
  ///
  const [event,setEvent]=useState({title:"",description:"",location:"",Startdate:null,Enddate:null});
  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false); 

  const filePickerRef = useRef();

  //////////Location
  const locationOptions=[
    {label:"Bizerte",value:"Bizerte"},
    
    {label:"Gafsa",value:"Gafsa"},
    {label:"Jandouba",value:"Jandouba"},
    {label:"Kairaouen",value:"Kairaouen"},{label:"Kef",value:"Kef"},
    
    {label:"Kasserine",value:"Kasserine"},{label:"Kebili",value:"Kebili"},
   
    {label:"Mahdia",value:"Mahdia"},
    {label:"Manouba",value:"Manouba"},{label:"Monastir",value:"Monastir"},
    {label:"Medenine",value:"Medenine"},
   {label:"Nabeul",value:"Nabeul"},{label:"Zaghouane",value:"Zaghouane"},
   
   {label:"Sidi bouzid",value:"Sidi bouzid"},{label:"Sfax",value:"Sfax"},{label:"Siliana",value:"Siliana"},
   {label:"Sousse",value:"Sousse"},
   {label:"Tozeur",value:"Tozeur"},{label:"Tataouine",value:"Tataouine"}, {label:"Tunis",value:"Tunis"}]
   /////////////
  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };
  ///////////
  useEffect(() => {
    if (!File) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(File);
  }, [File]);

  const HandleSubmit = async () => {
    if((event.title==="") || (event.description==="") || (event.location==="")|| (event.Startdate==="")|| (event.Enddate==="")) {
      toast.error("invalid form")
      setIsValidForm(false)
    }
if(isValidForm){
  console.log("test")
    const form = new FormData();
    form.append('title' , event.title );
    form.append('description' , event.description );
    
    form.append('location' , event.description );
    form.append('Startdate' , event.Startdate );
    form.append('Enddate' , event.Enddate );
    form.append('image' , File ); 
    console.log(form);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  const idUser=JSON.parse(localStorage.getItem('user'))._id

    const response = await axios.post(`http://localhost:5000/event/new?idUser=${idUser}`, form, config)
      .then(res =>{
        
           if(res.status===201){
toast.success("Event Created")
           }
          
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
    
  }}



  return (

    <div className="login-form">
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>

<ToastContainer />
     

 
       <h2>Create Event</h2>

      <div> 
      <Form>
      <Row style={{margintop: "15px"}}>
      <Col>
      <br></br>
      <h5>Title</h5>
          <input
            type="text"
            className="form-control"
            placeholder="title"
            minlength="4" maxlength="20"
            onChange={(e) =>
                        setEvent({ ...event, title: e.target.value })
                    }
            required
          />
        </Col>
         
         <Col>
         <div className="form-group">
        
         <div className="form-group" style={{marginTop: "55px"}}>
         <Select    options={locationOptions}  defaultValue={event.location}   onChange={(e) => setEvent({ ...event, location: e.value })}
              required
            
              placeholder="location"/>
        </div>
     </div> 
      
        
        </Col>
        </Row>
        </Form>
        <br></br>
        <h5>Description</h5>
          <input
            type="text-area"
            className="form-control"
            placeholder="description"
            maxlength="60"
            minlength="10"
            onChange={(e) =>
                        setEvent({ ...event, description: e.target.value })
                    }
            required
          />
           <span className="resultat"></span>
<div className="form-group">
<br></br>
<h5>Picture </h5>
        <input
          className="form-control"
          type="file"
          accept=".jpg,.png,.jpeg"
          name="image"
          onChange={pickedHandler}
          ref={filePickerRef}

        //  onChange={(e)=>setEvent({...event,image:e.target.files[0]})}
        />
      </div>
      <Form>
      <Row>
        <Col>
        <div className="form-group">
        <br></br>
        <h5>Start date </h5>
        <input type="date"  onChange={
          (e) =>{
            const newDate = new Date(e.target.value);
            setEvent({...event,Startdate:newDate})
          }
        } />
</div>
</Col>
     <Col>
<div className="form-group">
<br></br>
        <h5>End date </h5>
        <input type="date" 
         min={new Date(event.Startdate).toISOString().split("T")[0]}
         onKeyDown={(e) => e.preventDefault()}
        onChange={
          (e) =>{
            const newDate = new Date(e.target.value);
            setEvent({...event,Enddate:newDate})
           
          }
        }
        disabled={event.Startdate===null}
         />
        
</div>
 {event.Startdate>=event.Enddate&& event.Enddate!==null&&(<span style={{color:"red", fontSize:11}}>End date must be sup then start date </span>)}
        </Col>
        </Row>
        </Form>
  
      <button  type="submit"  className="btn btn-primary" onClick={HandleSubmit}  style={{marginLeft: "350px"}}>Create event</button>
           
  
      </div>

     
      </div>   
  );

}


export default CreateEvent;
