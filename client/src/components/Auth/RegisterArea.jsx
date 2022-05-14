import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { register } from "../../redux/User/userAction";
import history from "../../history.js";
import { Form, Col,Row, Container } from 'react-bootstrap';

import * as yup from 'yup';
//////////YUP

let schema = yup.object().shape({
  name: yup.string().required(), 
  email: yup.string().email()
  
});
function RegisterArea({ history }) {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [location, setLocation] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
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
  const handleRegistration = (e) => {
    e.preventDefault();
    dispatch(register(username, name, gender, phone, email, password, isAdmin, location));
    // history.push("/profile");
  };

////////////
  // const { user } = useSelector((state) => state.userReducer);
  // console.log("user", user);

  // const redirect = location.search ? location.search.split("=")[1] : "/profile";

  // useEffect(() => {
  //   if (user) {
  //     history.push(redirect);
  //   }
  // }, []);

  return (
    <div className="register-form">
      {message &&
        (Array.isArray(message) ? (
          <div className="alert alert-danger" role="alert">
            <ul className="errors" style={{ marginBottom: 0 }}>
              {message.map((msg) => (
                <li key={msg} className="error">
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={`alert alert-success`} role="alert">
            {message}
          </div>
        ))}
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
      
<Form>
  <Row>
  <Col>
  <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Full Name "
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
  </Col>
    <Col>
    <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

    </Col>
     
  </Row>
</Form>
        
      

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>


        <div className="form-group">
         <Select defaultValue={location} options={locationOptions} onChange={(e)=>setLocation(e.value)
          
        }placeholder="From"/>
        </div>

        <div className="form-group">
          <input
            type={passwordShown ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
<Form>
        <div className="form-group" class="radioflex">
          <label for="gender" style={{color: "black"}} class="text-light">
            {" "}
            Gender
          </label>
          <div class="radio-inline">
            <input type="radio" id="radio-2" name="gender" value="male"></input>
            <label style={{color: "black"}} for="gender" class="radio-label">
              {" "}
              male
            </label>
          </div>
          <div class="radio-inline">
            <input type="radio" name="gender" value="female"></input>
            <label for="gender" class="radio-label">
              {" "}
              female
            </label>
          </div>
          <br></br>
        </div>
</Form>
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkme"
                onChange={() => setPasswordShown(!passwordShown)}
              />
              <label className="form-check-label" htmlFor="checkme">
                Show password?
              </label>
            </div>
          </div>
        </div>
    
              
        <button type="submit" className="registerB"><Link to="/login">Register now</Link>
        </button>
      </form>

      <div className="important-text">
        <p>
          Already have an account? <Link to="/login">Login now!</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterArea;
