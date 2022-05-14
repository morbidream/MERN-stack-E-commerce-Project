import React, { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams} from "react-router";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Select from "react-select";
import { v4 } from "uuid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EditEvent() {

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
  const params =useParams();
  const filePickerRef = useRef();
  const getEvent = async () => {
    try {
        const resp = await axios.get('http://localhost:5000/event/get/'+params.id);
        setselectedValue(resp.data.location)
        return resp.data
        
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
  };
  const [selectedValue, setselectedValue] = useState()
  
  
  const  [isValidForm, setIsValidForm] = useState(true)
  const [event,setEvent]=useState({title:"",description:"",location:"",Startdate:null,Enddate:null});
  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false); 
  
  
  useEffect( async ()=> {
    const res = await getEvent();
 setEvent(res)
 filePickerRef.current=event.avatar



 }, []);
 useEffect(() => {
  // setselectedValue(event.location)
console.log(selectedValue)
  
}, [event])
  ///////////
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
    if(!isValidForm) {
      
      toast.error("invalid form")
     
    }
    
    if(isValidForm)
    
    {
      console.log(isValidForm)
      const userId =JSON.parse(localStorage.getItem('user'))._id
    const form = new FormData();
    form.append('title' , event.title );
    form.append('description' , event.description );
    form.append('user' , userId );
    form.append('location' , event.location );
    form.append('Startdate' , event.Startdate );
    form.append('Enddate' , event.Enddate );
    form.append('image' , File ); 
    console.log(form);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    
    const response = await axios.put(`http://localhost:5000/event/update/?idEvent=${params.id}`, form, config)
     
    console.log({response})
    if(response.status===200)
    toast.success("Event Updated")
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
     

 
       <h2>Edit Event</h2>

      <div> 
      <Form>
      <Row>
      <Col>
      <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="title"
            value={event.title}
            minlength="4" maxlength="10"
            onChange={(e) =>
            {if(e.target.value===""){
              setIsValidForm(false);
            }
                        setEvent({ ...event, title: e.target.value })
                    }}
            required
          />
        </Col>
         
         <Col>
         
     
         <div className="form-group">
         {console.log(selectedValue)}
         {selectedValue&&(<Select  id={v4()} options={locationOptions}     defaultInputValue={selectedValue}  onChange={(e) => {
           if(e.value===""){
            setIsValidForm(false);
           }
           setEvent({ ...event, location: e.value })}}
              required
            
              placeholder="location"/>)}
        </div>
  
      
        
        </Col>
        </Row>
        </Form>
        <label>Description</label>
          <input
            type="text-area"
            className="form-control"
            placeholder="description"
            minlength="10"
            value={event.description}
            onChange={(e) =>
                        {
                          if(e.target.value===""){
            setIsValidForm(false);
           }
                          setEvent({ ...event, description: e.target.value })}
                    }
            required
          />
           <span className="resultat"></span>
<div className="form-group">
<label>Picture </label>
<div>{event.avatar&&(
  <img src={event.avatar} width={250} height={250}/>
)}</div>
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
        <label>Start date </label>
        
          <input type="date" 
        value={new Date(event.Startdate).toISOString().split("T")[0]}
         onChange={
          (e) =>{
            const newDate = new Date(e.target.value);
            if(newDate===""){
            setIsValidForm(false);
           }
            setEvent({...event,Startdate:newDate})
          }
        } />
</div>
</Col>
     <Col>
<div className="form-group">
        <label>End date </label>
        <input type="date"  
         value={new Date(event.Enddate).toISOString().split("T")[0]}
         min={new Date(event.Startdate).toISOString().split("T")[0]}
         onKeyDown={(e) => e.preventDefault()}
        onChange={
          (e) =>{
            const newDate = new Date(e.target.value);
            if(e.target.value===""){
            setIsValidForm(false);
           }
            
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
  
      <button  type="submit" onClick={HandleSubmit} >Edit Event</button>
           
  
      </div>

     
      </div>   
  );

}


export default EditEvent;
