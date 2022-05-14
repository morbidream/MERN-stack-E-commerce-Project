
import React, {useState, useEffect,useRef} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Card from 'react-bootstrap/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Popover from '@mui/material/Popover';
import {getAllEvents,Like} from "../../redux/Event/event.action";
import { useDispatch,useSelector } from "react-redux";
import DonationList from "../Donation/DonationList";
import Event from "./Event";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
const EventList = () => {
    const [open, setOpen] = React.useState(false);
    
const [openEdit,setOpenEdit]=useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEdit = () =>setOpenEdit(true);
  const handleCloseEdit = ()=>setOpenEdit(false)
const[data, setData]= useState([{
    _id:"",
    title: "",
    description: "",
    Startdate:"",
    Enddate:"",
    location: "",
    image:"",
    Donations:[{}],
    see:false,
    CreatedAt:""
}]);
const [searchValue, setSearchValue] = useState("")
const [openFormDonationState,setopenFormDonationState]=useState("")
const [donation,setDonation]=useState({
  
    title:""
    

});
const dispatch = useDispatch()

const res = useSelector(state=>state.EventReducer);

useEffect(async ()=> {
  await dispatch(getAllEvents(searchValue))
  

}, [searchValue,res.like]);
const isLiked=(likes)=>{
  const idUser=JSON.parse(localStorage.getItem('user'))?._id
            let isLiked =false;
            likes.forEach(element => {
              if(element.User===idUser)
              isLiked= true
              
              
            });
return isLiked
  
}

const axios = require('axios');

const getEvents = async () => {
    try {
        const resp = await axios.get('http://localhost:5000/event/kijhugytf');
        setData(resp.data)
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
const openFormDonation = (id)=>{
    setopenFormDonationState("");
    console.log("je suis laaa");
    console.log(id);
    setopenFormDonationState(id);
    console.log(openFormDonationState);

}
const doAddDonation = async (event)=>{
    const form = new FormData();
    form.append('title' , donation["title"] );
    form.append('event',event)
    form.append('image' , File ); 
    console.log(form);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    
  ///////////
axios.post('http://localhost:5000/donation/new',form).then(res=>{
    console.log(res.data)
    if(res.status==200){
        setData(data.map(item => 
            item._id === event 
            ? {...item, Donations : [...item.Donations,res.data]} 
            : item ))
    //setopenFormDonationState("");
    handleClose()

    }
})
}
const seeAll = (id)=>{
    setData(
        data.map(item => 
            item._id === id 
            ? {...item, see : !item.see} 
            : item 
    ))
};
const [event,setEvent]=useState({title:"",description:"",location:"",Startdate:null,Enddate:null});

const [expanded, setExpanded] = React.useState(false);
const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false); 
//////edit


/////////
  const filePickerRef = useRef();
 

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
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
const Delete = async (id) => {
    const response = await axios.delete(
        "http://localhost:5000/event/delete/"+id
    ).then(res => {
        setData(event => event.filter((item) => item._id !== id));
        window.location.reload(false);
    });
};
/////edit
const Edit = async (id) => {
  const response = await axios.get(
      "http://localhost:5000/EditEvent/"+id
  ).then(res => {
      setData(event => event.filter((item) => item._id !== id));
      window.location.reload(false);
  });
};


const [anchorEl, setAnchorEl] = React.useState(null);

const handleClickMore = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleCloseMore = () => {
  setAnchorEl(null);
};
const openMore = Boolean(anchorEl);
const id = openMore ? 'simple-popover' : undefined;
return(
  <> 
     
  <div className="search-area ptb-50">
        <div className="container">
          <div className="search-block">
            <form className="search-box" style= {{marginTop: "-10px", marginLeft:"200px"}} >
              <input
                type="text"
                className="form-control" 
                placeholder="Search products"
                onChange={(e)=>{
                  setSearchValue(e.target.value)
                  
                }}
              />

              <button type="submit">Search</button>
            </form>
          </div>
        </div>
    </div>
            
    <Grid container spacing={{ xs: 2, md: 3 }}>

    <div className="row" style= {{marginTop: "70px", marginLeft:"200px"}}>

{res.events.data && res.events.data.map((item, index)=>{
  return (
 

    <Grid  md="3"  style= {{marginBottom: "40x", marginLeft:"30px"}}>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img src={item.user?.profile_picture} style={{width:"fit-content"}}/>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon onClick={handleClickMore}/>
          </IconButton>
        }
        title={item.user?.username}
        subheader={item.CreatedAt}
      /> 
      
      <CardMedia
        component="img"
        height="100" 
        image={item.avatar}
        style= {{marginBottom: "5px",marginLeft: "1px", width:"50rem", height:'16rem'}}
        alt="Paella dish"
      />
      <CardContent>
      <Typography variant="h4" component="h3">
      <Link to={`/Event/${item._id}`} >{item.title}</Link>
        {/* <a href={`/Event/${item._id}`}>{item.title} </a> */}
      

      </Typography>
      <Typography  Typography variant="body2" color="text.secondary">
        {item.description}
        </Typography>
        <Typography  Typography variant="body2" color="text.secondary">
        {item.Startdate?.split("T")[0] }
        </Typography>
        <Typography  Typography variant="body2" color="text.secondary">
        {item.Enddate?.split("T")[0] 
}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>s
        <IconButton aria-label="add to favorites" onClick={()=>{
             if(localStorage.getItem('user')){
            const iduser=JSON.parse(localStorage.getItem("user"))._id;
             dispatch(Like(iduser,item._id))}

          }}>
          <FavoriteIcon style={  isLiked(item.likes)?{fill:"red"}:{}}  /> <span style={{margin:2}}>{item.LikesNumber}</span>
        </IconButton>
        
        
      </CardActions>
     
       

    </Card>
            </Grid>
           
        )})}

            

    </div>
    </Grid>
    </>

);

} ;  

export default EventList;