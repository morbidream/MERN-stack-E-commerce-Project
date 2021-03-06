import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import {listProducts} from '../../redux/Product/ProductAction'
import {useDispatch,useSelector} from 'react-redux'
import logo2 from "../../assets/img/logo-2.png";
import AuthContext from "../../contexts/auth-context";
import {addParams} from '../../redux/search/searchActions.js'

// const homeRoutes = ["/", "/home-two", "/home-three", "/home-four"];
const homeRoutes = ["/"];
const pagesRoutes = [
  "/about",
  "/our-team",
  "/pricing-plans",
  "/search",
  "/contact",
  "/faqs",
  "/login",
  "/register",
  "/my-account",
  "/error-404",
  "/tracking-order",
  "/compare",
  "/terms-of-service",
  "/privacy-policy",
];
const shopRoutes = [
  "/shop",
  "/shop-list-view",
  "/shop-left-sidebar",
  "/shop-right-sidebar",
  "/shop-full-width",
  "/cart",
  "/wishlist",
  "/checkout",
  "/products-details",
  "/products-details-sidebar",
];
const blogRoutes = [
  "/blog",
  "/blog-list-view",
  "/blog-left-sidebar",
  "/blog-right-sidebar",
  "/blog-full-width",
  "/blog-details",
];
const productsRoutes = ["/products", "/add-product"];
function Navbar() {
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  const context = useContext(AuthContext);
  const dispatch = useDispatch()
  const history = useHistory();
  const [active, setActive] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [brandList,setBrandList] = useState([])
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState("");
  const [tokenExpiration, setTokenExpiration] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [test, setTest] = useState(null);
  const { userToken } = useSelector(state => state.userReducer)


  const search = useSelector(state=>state.search)
   const handleOption = (brand) => { 
    dispatch(listProducts(search.keyword,search.pageNumber,search.sortBy,search.searchByCat,brand));
    dispatch(addParams(search.keyword,search.pageNumber,search.sortBy,search.searchByCat,brand))
   }

  

  
   
   useEffect(() => {
     setToken(userToken)
     console.log("token", token)
     console.log("user appp", userToken)
   }, [userToken])
   useEffect(() => {
     console.log("localStorage", localStorage)
     // const _token = userToken;
     // console.log("_token", userToken)
     const getData = async() => { 
          const {data} = await axios.get(`http://127.0.0.1:5000/brand`)
        console.log(data)
        setBrandList(data)
         }
         getData()
     const tokenExp = JSON.parse(localStorage.getItem("tokenExpiration"));
     const userIdLocal = JSON.parse(localStorage.getItem("userId"));
     if (userToken && userIdLocal && tokenExp) {
       setToken(userToken);
       setUserId(userIdLocal);
       setTokenExpiration(tokenExp);
     }
     const _cartItems = JSON.parse(localStorage.getItem("cart-items"));
     if (_cartItems && _cartItems.length > 0) {
       setCartItems(_cartItems);
     }
   }, [test]);


  // useEffect(() => {
  //   // if (context && context.userId) {
  //   //   axios
  //   //     .get(`/user/${context.userId}`)
  //   //     .then((res) => {
  //   //       setUser(res.data.user);
  //   //     })
  //   //     .catch((err) => {
  //   //       console.log(err);
  //   //     });
  //   // }
  //   const getData = async() => { 
  //     const {data} = await axios.get(`http://127.0.0.1:5000/brand`)
  //   console.log(data)
  //   setBrandList(data)
  //    }
  //    getData()
  // }, [context]);

  const toggleHotline = () => {
    setActive(!active);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos > 90) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible, handleScroll]);

  const handleLogout = () => {
    context.logout();
    history.push("/login");
  };

  return (
    <div className={`navbar-area ${visible ? "is-sticky sticky-active" : ""}`}>
      <div className={showMenu ? "main-navbar show" : "main-navbar"}>
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <div className={"navbar-category"}>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                  <li className="nav-item respo-nav">
                    <a href="#" className="nav-link">
                      <i className="bx bx-menu"></i>
                      All Brands
                    </a>
                    <ul className="dropdown-menu">
                    <li  className="nav-item d-flex align-content-center w-4 ">
                         <Link  onClick={()=>handleOption("")} className="nav-link">
                           Clear Filter
                         </Link>
                       </li>
                      {brandList?.map((brand,i)=>(
                         <li key={i} className="nav-item d-flex align-content-center w-4 ">
                         <Link key={i} to={`/shop/#`} onClick={()=>handleOption(brand.name)} className="nav-link">
                           <img key={i} src={brand.image} width="20" height="20" alt='rand'/>
                           {brand.name}
                         </Link>
                       </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className="collapse navbar-collapse mean-menu">
              <ul className="navbar-nav responsive-menu">
                <li className="nav-item">
                  <NavLink
                    to={"/"}
                    isActive={() => homeRoutes.includes(pathname)}
                    className="nav-link"
                  >
                    Home
                     {/* <i className="bx bx-chevron-down chevron-display"></i> */}
                    <span className="plus_icon">+</span>
                  </NavLink>
                   {/*
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <NavLink to={"/"} className="nav-link">
                        Home
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to={"/home-two"} className="nav-link">
                        Home Two
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to={"/home-three"} className="nav-link">
                        Home Three
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to={"/home-four"} className="nav-link">
                        Home Four
                      </NavLink>
                    </li>
                  </ul> */}
                </li>

                <li className="nav-item megamenu">
                  <NavLink
                    to="/about"
                    isActive={() => pagesRoutes.includes(pathname)}
                    className="nav-link"
                  >
                    Pages <i className="bx bx-chevron-down chevron-display"></i>
                    <span className="plus_icon">+</span>
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <div className="container">
                        <div className="row">
                          <div className="col">
                            <ul className="megamenu-submenu">
                              <li>
                                <NavLink to={"/about"} className="nav-link">
                                  About Us
                                </NavLink>
                              </li>

                              <li>
                                <NavLink to={"/our-team"} className="nav-link">
                                  Our Team
                                </NavLink>
                              </li>

                              <li>
                                <NavLink
                                  to={"/pricing-plans"}
                                  className="nav-link"
                                >
                                  Pricing Plans
                                </NavLink>
                              </li>

                              <li>
                                <NavLink to={"/search"} className="nav-link">
                                  Search
                                </NavLink>
                              </li>

                              <li>
                                <NavLink to={"/contact"} className="nav-link">
                                  Contact Us
                                </NavLink>
                              </li>
                            </ul>
                          </div>

                          <div className="col">
                            <ul className="megamenu-submenu">
                              <li>
                                <NavLink to={"/faqs"} className="nav-link">
                                  FAQ's
                                </NavLink>
                              </li>
                              {!token && (
                                <div>
                                  <li>
                                    <NavLink to="/login" className="nav-link">
                                      Login
                                    </NavLink>
                                  </li>

                                  <li>
                                    <NavLink
                                      to="/register"
                                      className="nav-link"
                                    >
                                      Register
                                    </NavLink>
                                  </li>
                                </div>
                              )}

                              <li>
                                <NavLink to="/my-account" className="nav-link">
                                  My Account
                                </NavLink>
                              </li>

                              <li>
                                <NavLink to="/error-404" className="nav-link">
                                  404 Error
                                </NavLink>
                              </li>
                            </ul>
                          </div>

                          <div className="col">
                            <ul className="megamenu-submenu">
                              <li>
                                <NavLink
                                  to="/tracking-order"
                                  className="nav-link"
                                >
                                  Tracking Order
                                </NavLink>
                              </li>

                              <li>
                                <NavLink to="/compare" className="nav-link">
                                  Compare
                                </NavLink>
                              </li>

                              <li>
                                <NavLink
                                  to="/terms-of-service"
                                  className="nav-link"
                                >
                                  Terms Of Service
                                </NavLink>
                              </li>

                              <li>
                                <NavLink
                                  to="/privacy-policy"
                                  className="nav-link"
                                >
                                  Privacy Policy
                                </NavLink>
                              </li>

                              <li>
                                <NavLink to="/coming-soon" className="nav-link">
                                  Coming Soon
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                 

                   <li className="nav-item">
                  <NavLink
                    to="/auction"
                    isActive={() => blogRoutes.includes(pathname)}
                    className="nav-link"  >
                    Auctions <i className="bx bx-chevron-down chevron-display"></i>
                    <span className="plus_icon">+</span>
                  </NavLink>
                  <ul className="dropdown-menu">
               
               {token && <li className="nav-item">
                  <NavLink to="/add-auction" className="nav-link">
                    Create an auction
                  </NavLink>
                </li>}
                <li className="nav-item">
                      <NavLink to="/auction" className="nav-link">
                        All auctions
                      </NavLink>
                    </li>

                    {token && <li className="nav-item">
                      <NavLink to="/MyAuctions" className="nav-link">
My auctions                      </NavLink>
                    </li>}

</ul></li> 
                <li className="nav-item">
                  <NavLink
                    to="/"
                    isActive={() => blogRoutes.includes(pathname)}
                    className="nav-link"  >
                    Event <i className="bx bx-chevron-down chevron-display"></i>
                    <span className="plus_icon">+</span>
                  </NavLink>
                  <ul className="dropdown-menu">
               
               {token && <li className="nav-item">
                  <NavLink to="/EventC" className="nav-link">
                    Create an event
                  </NavLink>
                </li>}
                <li className="nav-item">
                      <NavLink to="/AllEvents" className="nav-link">
                        All events
                      </NavLink>
                    </li>

                    {token && <li className="nav-item">
                      <NavLink to="/MyEvents" className="nav-link">
                        My events
                      </NavLink>
                    </li>}

</ul></li>
                <li className="nav-item">
                  <NavLink
                    to="/shop"
                    isActive={() => shopRoutes.includes(pathname)}
                    className="nav-link"
                  >
                    Shop
                     {/* <i className="bx bx-chevron-down chevron-display"></i>
                    <span className="plus_icon">+</span> */}
                  </NavLink>
                  {/* <ul className="dropdown-menu">
                    <li className="nav-item">
                      <NavLink to="/shop" className="nav-link">
                        Shop
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/shop-list-view" className="nav-link">
                        Shop List View
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/shop-left-sidebar" className="nav-link">
                        Shop Left Sidebar
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/shop-right-sidebar" className="nav-link">
                        Shop Right Sidebar
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/shop-full-width" className="nav-link">
                        Shop Full Width
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/cart" className="nav-link">
                        Cart
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/wishlist" className="nav-link">
                        Wishlist
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/checkout" className="nav-link">
                        Checkout
                      </NavLink>
                    </li>
                  </ul> */}
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/blog"
                    isActive={() => blogRoutes.includes(pathname)}
                    className="nav-link"
                  >
                    Blog 
                    {/* <i className="bx bx-chevron-down chevron-display"></i>
                    <span className="plus_icon">+</span> */}
                  </NavLink>
                  {/* <ul className="dropdown-menu">
                    <li className="nav-item">
                      <NavLink to="/blog" className="nav-link">
                        Blog
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/blog-list-view" className="nav-link">
                        Blog List View
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/blog-left-sidebar" className="nav-link">
                        Blog Left Sidebar
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/blog-right-sidebar" className="nav-link">
                        Blog Right Sidebar
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/blog-full-width" className="nav-link">
                        Blog Full Width
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/blog-details" className="nav-link">
                        Blog Details
                      </NavLink>
                    </li>
                  </ul> */}
                </li>

                <li className="nav-item">
                  <NavLink to="/contact" className="nav-link">
                    Contact
                  </NavLink>
                </li>

                {token && (
                  <>
                    {/* <li className="nav-item">
                      <NavLink
                        to="/products"
                        isActive={() => productsRoutes.includes(pathname)}
                        className="nav-link"
                      >
                        Products <i className="bx bx-chevron-down chevron-display"></i>
                        <span className="plus_icon">+</span>
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <NavLink to="/products" className="nav-link">
                            Products
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/add-product" className="nav-link">
                            Add Product
                          </NavLink>
                        </li>
                      </ul>
                    </li> */}
                    <li className="nav-item">
                      <NavLink
                        to="/profile"
                        // isActive={() => shopRoutes.includes(pathname)}
                        className="nav-link"
                      >
                        {user && <i class="bx bxs-user"></i>}{" "}
                        <i className="bx bx-chevron-down chevron-display"></i>
                        <span className="plus_icon">+</span>
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <NavLink to="/profile" className="nav-link">
                            {user && user.name}
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/products" className="nav-link">
                            Products
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/add-product" className="nav-link">
                            Add Product
                          </NavLink>
                        </li>

                        <li className="nav-item">
                          <NavLink to="/cart" className="nav-link">
                            Cart
                          </NavLink>
                        </li>

                        <li className="nav-item">
                          <NavLink to="/order" className="nav-link">
                            Order
                          </NavLink>
                        </li>

                        <li className="nav-item">
                          <NavLink to="/wishlist" className="nav-link">
                            Wishlist
                          </NavLink>
                        </li>

                        <hr />

                        <li className="nav-item">
                          <button
                            onClick={handleLogout}
                            className="nav-logout-btn"
                          >
                            Logout
                          </button>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/reset" className="nav-link">
                            Reset password
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </>
                )}
              </ul>

              <div className="others-option d-flex align-items-center">
                <div className="option-item  respo-nav">
                  <span>
                    Hotline:
                    <a href="tel:16545676789">(+216) 54 879 658</a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="others-option-for-responsive">
        <div className="container">
          <div className="responsive-logo">
            <span>La7winta</span>
          </div>
          <div className="dot-menu" onClick={() => toggleHotline()}>
            <div className="inner">
              <div className="circle circle-one"></div>
              <div className="circle circle-two"></div>
              <div className="circle circle-three"></div>
            </div>
          </div>

          <div className="hamburger-menu" onClick={() => toggleMenu()}>
            {showMenu ? (
              <span className="x-icon">x</span>
            ) : (
              <i className="bx bx-menu"></i>
            )}
          </div>

          <div className={active ? "active container" : "container"}>
            <div className="option-inner">
              <div className="others-option d-flex align-items-center">
                <div className="option-item">
                  <span>
                    Hotline:
                    <a href="tel:16545676789">(+216) 54 166 835</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
