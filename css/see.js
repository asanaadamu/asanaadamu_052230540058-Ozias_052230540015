// import React from 'react'
import React, { useEffect, useState } from "react";

import "../Products/ProductsMangement.css";
import computer from "../../assets/computer.png";
import { VscZoomIn } from "react-icons/vsc";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { IoBagAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import OffCanvasEdit from "../../Components/OffCanvasEdit/OffCanvasEdit";
import SideMenu from "../../Components/SideMenu/SideMenu";
import DataCalling from "../../Components/DataCalling";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccessories,
  selectAirConditioners,
  selectAllProducts,
  selectComputer,
  selectFridges,
  selectMobilePhone,
  selectPrinter,
  selectSpeakers,
  selectTelevision,
  selectWashingMachine,
  selectStandingFan,
  setProductToEdit,
} from "../../featurs/ProductsSilce/ProductsMangSlice";
import DeleteProductCanvas from "../../Components/DeleteProductCanvas/DeleteProductCanvas";


function ProductsMangement() {
  const dispatch = useDispatch();

  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [showDeleteProductCanvas, setShowDeleteProductCanvas] = useState(false);
  const [AllProducts, setAllProducts] = useState([]);
  const [allFilteredProduct, setAllFilteredProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState([]);


  const [search, setSearch] = useState("");

  const MobilePhone = useSelector(selectMobilePhone);
  const Television = useSelector(selectTelevision);
  const fridges = useSelector(selectFridges);
  const accessories = useSelector(selectAccessories);
  const computer = useSelector(selectComputer);
  const ac = useSelector(selectAirConditioners);
  const WashingMachine = useSelector(selectWashingMachine);
  const Printer = useSelector(selectPrinter);
  const Speakers = useSelector(selectSpeakers);
  const StandingFan = useSelector(selectStandingFan)

  useEffect(() => {
    setAllProducts([
      ...MobilePhone,
      ...Television,
      ...fridges,
      ...accessories,
      ...computer,
      ...ac,
      ...WashingMachine,
      ...Printer,
      ...Speakers,
      ...StandingFan,
    ]);

    setTempProduct([
      ...MobilePhone,
      ...Television,
      ...fridges,
      ...accessories,
      ...computer,
      ...ac,
      ...WashingMachine,
      ...Printer,
      ...Speakers,
      ...StandingFan,
    ]);
    

  }, [
    MobilePhone,
    Television,
    fridges,
    accessories,
    computer,
    ac,
    WashingMachine,
    Printer,
    Speakers,
    StandingFan,
  ]);



  const handleShowOffCanvas = (productObject) => {
    setShowOffCanvas(true);
    dispatch(setProductToEdit(productObject));
  };

  const handleCloseOffCanvas = () => {
    setShowOffCanvas(false);
    dispatch(setProductToEdit({}));
  };

  const handleShowDeleteProductCanvas = (productObject) => {
    setShowDeleteProductCanvas(true);
    dispatch(setProductToEdit(productObject));
  };
  const handleCloseDeleteProductCanvas = () => {
    setShowDeleteProductCanvas(false);
    // dispatch(setProductToEdit({}));
  };

  const handleNavigateToDetailsPage = (productObject) => {
    dispatch(setProductToEdit(productObject));
  };


  useEffect(() => {
  
    if(search !==""){
    const filteredProd = AllProducts.filter((data)=>data?.Name.toLowerCase().includes(search?.toLowerCase()))

    // alert(filteredProd.length)
    // setAllFilteredProducts(filteredProd)
    setTempProduct(filteredProd)
  }else{

      setTempProduct(AllProducts)
    }


  }, [search,AllProducts])
  

  
  return (
    <>
      <SideMenu />
      <div className="container dashoard-box">
        <h3>Products Mangement</h3>
        <div className="Add-productsBox d-flex justify-content-between mt-5">
          <div className="ms-5  d-flex">
            <MdOutlineLocalPrintshop size={45} />
          </div>
          <div className="searchInpu-Box ">
          <input className="form-control searchInput   " list="datalistOptions" id="exampleDataList" placeholder="Type to search..."   
          onChange={(e) => {
            setSearch(e.target.value);
                  }}
                  />
          </div>

          <div className="btn-box me-5">
            <Link to="/addproducts">
              <button className="btn-boxs">
                <IoBagAddOutline /> Add Products
              </button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 mt-5 table-Box">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th style={{ textAlign: "center" }} scope="col">
                    Status
                  </th>
                  <th scope="col">View</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody style={{ overflowY: "scroll" }}>
                {tempProduct &&
                  tempProduct?.map((product, index) => (
                    <tr key={index}>
                      <td className="d-flex gap-3">
                        <img
                          src={product?.PrimaryImage}
                          alt={""}
                          style={{ width: "50px" }}
                        />
                        <p>{product?.Name}</p>
                      </td>
                      <td>{product?.Category}</td>
                      <td>{product?.Price}</td>
                      <td>{product?.Quantity}</td>
                      <td
                        className={`rounded-pill  ${
                          product.status === "Sold out" ? "sold-out" : "selling"
                        }`}
                        style={{ textAlign: "center" }}
                      >
                        {product?.Quantity > 0 ? (
                          <span style={{ fontSize: ".8em" }}>In Stock </span>
                        ) : (
                          <span style={{ fontSize: ".6em", color: "red" }}>
                            Out Stock
                          </span>
                        )}
                      </td>
                      <td className="zoomIcon">
                        <Link
                          to={`/productdetail/${product?.Id}`}
                          className="view-link"
                        >
                          <VscZoomIn
                            onClick={() => {
                              handleNavigateToDetailsPage(product);
                            }}
                            size={25}
                          />
                        </Link>
                      </td>
                      <td className="actionIcons">
                        <FaRegEdit
                          size={25}
                          onClick={() => {
                            handleShowOffCanvas(product);
                          }}
                        />
                        <RiDeleteBin7Fill
                          onClick={() => {
                            handleShowDeleteProductCanvas(product);
                          }}
                          size={25}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <OffCanvasEdit
          show={showOffCanvas}
          handleClose={handleCloseOffCanvas}
        />
        <DeleteProductCanvas
          show={showDeleteProductCanvas}
          handleClose={handleCloseDeleteProductCanvas}
        />
      </div>
    </>
  );
}

export default ProductsMangement;









<Navbar expand="lg" className="bg-body border-bottom fixed-top">
<Container fluid>
  <Navbar.Brand as={Link} to="/home">
    <img
      src={frankoIcon}
      width="100"
      height="59"
      className="d-inline-block align-top icon-log"
      alt="Franko Icon"
    />
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
    <Nav
      className="mx-auto my-2 my-lg-0 gap-lg-4"
      style={{ maxHeight: '100px' }}
      navbarScroll
    >
      <Nav.Link as={Link} to="/home">
        Home
      </Nav.Link>
      <Nav.Link as={Link} to="/about">
        About
      </Nav.Link>
      <Nav.Link as={Link} to="/category">
        Category
      </Nav.Link>
      {!currentUser && (
          <Nav.Link as={Link} to="/signup">
            Sign Up
          </Nav.Link>
        )}
    </Nav>
    
  </Navbar.Collapse>
  <div className="d-flex item-box gap-5">
      <Searchbtn />
      <Link to="/cart">
        <div>
          <HiOutlineShoppingCart size={24} className='mt-1   ' style={{ color: "black" }} />
          <Badge  className="position-absolute top-25 start-25 translate-middle bg-danger notification-count " >
          {cartArray.length}
  <span className="visually-hidden">items in cart</span>
   </Badge>

        </div>
      </Link>
      {/* User Section with Username and Image */}
      <NavDropdown title={userLoginObject?.fullName} id="basic-nav-dropdown" className='mt-1 navdrop'>
        <NavDropdown.Item as={Link} to="/Account" href="#profile">Profile</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/orders" href="#orders">Orders</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#logout" onClick={handleLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
    </div>
</Container>
</Navbar>












import React, { useEffect, useState } from "react";
// import "../../Components/orderlist/Orderlist.css"
import computer from "../../assets/computer.png";
import "../../Components/orderlist/OrderList.css";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { VscZoomIn } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { IoIosEye } from "react-icons/io";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DataCalling from "../../Components/DataCalling";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "../../featurs/order/orderSlice";
import { FaFilter } from "react-icons/fa";
import {
  selectAccessories,
  selectAirConditioners,
  selectComputer,
  selectFridges,
  selectMobilePhone,
  selectPrinter,
  selectSpeakers,
  selectTelevision,
  selectWashingMachine,
} from "../../featurs/ProductsSilce/ProductsMangSlice";
import { db } from "../../Firebase/Firebase";
import { doc, updateDoc } from "firebase/firestore";

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "pendingtext";
    case "completed":
      return "completedtext";
    case "delivery":
      return "deliverytext";
    case "cancel":
      return "canceltext";
    case "OutOfStock":
      return "OutOfStocktext";
    case "Not Answered":
      return "NotAnsweredtext";
    case "Faided":
      return "Faidedtext";
    case "Mutiple Oreder":
      return "Mutiple Oredertext";
    case "Confirmed":
      return "Confirmedtext";
    case "On hold":
      return "Onholdtext";
    default:
      return "";
  }
};

export const OrderList = ({ onStatusChange, statusCounts , statusSelected}) => {
  const dispatch = useDispatch();

  const [filteredProduct, setFilteredProduct] = useState([]);
  const ordersSection = useSelector(selectOrder);

  // const convertDate = (dateString) => {
  //   // Parse the date string into a Date object
  //   const date = new Date(dateString);
  
  //   // Extract the year, month, and day from the Date object
  //   const year = date.getUTCFullYear();
  //   const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  //   const day = String(date.getUTCDate()).padStart(2, '0');
  
  //   // Return the formatted date string
  //   return `${year}-${month}-${day}`;
  // };



  const convertDate = (dateString) => {
    // Extract parts of the date string using a regular expression
    const datePattern = /(\w+) (\d+), (\d{4}) at (\d+):(\d+):(\d+)(AM|PM) UTC/;
    const match = dateString.match(datePattern);
  
    if (!match) {
      throw new Error("Invalid date format");
    }
  
    const [_, monthName, day, year, hours, minutes, seconds, period] = match;
  
    // Map month names to their numerical values
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    const month = monthNames.indexOf(monthName) + 1;
  
    // Return the formatted date string
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };







  // State to store the filtered orders
  const [filteredOrders, setFilteredOrders] = useState([...ordersSection]);


  // this is to retrive tghe oorders on page render
  useEffect(() => {
  
    // alert(ordersSection.length)
    setFilteredOrders([...ordersSection])
    
  }, [ordersSection])
  
// this is to filter based on status selected
useEffect(() => {

  const filtered = ordersSection.filter((data)=> data?.orderDeliveryStatus.trim().toLowerCase()  === statusSelected.trim().toLowerCase() )
  setFilteredOrders(filtered);



}, [statusSelected])


  //  State to store the filter values
  const [filters, setFilters] = useState({
    orderIdFilter: "",
    customerNameFilter: "",
    dateFilter: "",
  });

  // Function to handle changes in the filter input fields
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Function to filter the orders based on the filter values
  const handleFilter = () => {
    const { orderIdFilter, customerNameFilter, dateFilter } = filters;
    // const filtered = ordersSection.filter((order) => {
    //   const orderIdMatch = order.orderReferenceId
    //     .toLowerCase()
    //     .includes(orderIdFilter.toLowerCase());
    //   const customerNameMatch = order.recepientName
    //     .toLowerCase()
    //     .includes(customerNameFilter.toLowerCase());
    //   const dateMatch = order.date.includes(dateFilter);

    //   // Return orders that match all filter criteria
    //   return orderIdMatch || customerNameMatch || dateMatch;
    // });

    // const formattedDate = convertDate(order.date)

  // const inputDate = "May 20, 2024 at 9:41:37PM UTC";
  // const inputDate = "May 20, 2024 at 9:41:37PM UTC";
    // console.log(convertDate(inputDate),"Wea")
    
    const filtered = ordersSection.filter((order) => { 
      // Convert the order date
      const formattedDate = convertDate(order?.date);
  
      // Debugging: Log the formatted date to the console
      // console.log(order?.date,formattedDate,"formatted");
  
      // Check if the order meets all filter criteria
      return (
          order?.recepientName.toLowerCase().includes(customerNameFilter.trim().toLowerCase()) &&
          order?.orderReferenceId.toLowerCase().includes(orderIdFilter.trim().toLowerCase()) &&
          formattedDate.includes(dateFilter)
      );
  });
  
    setFilteredOrders(filtered);

    console.log(filters,"filtered prods",filtered)


  };

  const MobilePhone = useSelector(selectMobilePhone);
  const Television = useSelector(selectTelevision);
  const fridges = useSelector(selectFridges);
  const accessories = useSelector(selectAccessories);
  const computerArray = useSelector(selectComputer);
  const ac = useSelector(selectAirConditioners);
  const WashingMachine = useSelector(selectWashingMachine);
  const Printer = useSelector(selectPrinter);
  const Speakers = useSelector(selectSpeakers);

  useEffect(() => {
    const allproduct = [
      ...MobilePhone,
      ...Television,
      ...fridges,
      ...accessories,
      ...computerArray,
      ...ac,
      ...WashingMachine,
      ...Printer,
      ...Speakers,
    ];

    setFilteredProduct(allproduct);
    // const foundProduct = allproduct.find((data) => data.Id === productId);
    // setFilteredProduct(foundProduct);

    // console.log(foundProduct, "found product");

    // if (SelectedObject && Object.keys(SelectedObject).length !== 0) {
    //   setFilteredProduct(SelectedObject);
    // } else {
    //   setFilteredProduct(foundProduct);
    // }
  }, [
    MobilePhone,
    Television,
    fridges,
    accessories,
    computerArray,
    ac,
    WashingMachine,
    Printer,
    Speakers,
  ]);

  const [selectedStatus, setSelectedStatus] = useState({});
  const [allOrders, setAllOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedOrderProduct, setSelectedOrderProduct] = useState([]);

  useEffect(() => {
    console.log(selectedProduct, "selected");

    const productsArray = [];

    // Iterate over the keys of SelectedOrder
    for (const key in selectedProduct) {
      // Check if the key starts with "product"
      if (key.startsWith("product")) {
        // Push the value into the productsArray
        productsArray.push(selectedProduct[key]);
      }
    }

    setSelectedOrderProduct(productsArray);
  }, [selectedProduct]);

  const handleStatusChange = async (index, newStatus, orderReferenceId) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [index]: newStatus,
    }));

    const prevStatus = ordersSection[index].orderDeliveryStatus;
    onStatusChange(newStatus, prevStatus); // Call the onStatusChange function

    const washingtonRef = doc(db, "ordersSection", orderReferenceId);
    await updateDoc(washingtonRef, { orderDeliveryStatus: newStatus });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <>
      <div className="filter-box">
        <div class="card filterBox">
          <div class="card-body">
            <div className="row">
              <div className="col-lg-3">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  placeholder="ID Search..."
                  aria-label=".form-control-sm example"
                  name="orderIdFilter"
            value={filters.orderIdFilter}
            onChange={handleFilterChange}
                />
              </div>
              <div className="col-lg-3">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  placeholder="Customers Name"
                  aria-label=".form-control-sm example"
                  name="customerNameFilter"
            value={filters.customerNameFilter}
            onChange={handleFilterChange}
                />
              </div>
              <div className="col-lg-3">
                <input
                  class="form-control form-control-sm"
                  type="date"
                  placeholder="Date..."
                  aria-label=".form-control-sm example"
                  name="dateFilter"
                  value={filters.dateFilter}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-lg-3">
                <button className="filter-btn"  onClick={()=>{
                  handleFilter()
                }}>
                  <FaFilter /> Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 w-100">
        <div className="order-BoxText">
          <table class="table table-striped">
            <thead className=" thead-light">
              <tr className=" ">
               
                <th scope="col" className="table-head">Orders ID</th>
                <th scope="col"  className="table-head">Customer Name</th>
                <th scope="col" style={{ marginRight: "30px" }}  className="table-head">
                  Date
                </th>
                <th scope="col"  className="table-head">Method</th>
                <th scope="col"  className="table-head">Total Amount</th>
                <th scope="col"  className="table-head">Statues</th>
                <th scope="col"  className="table-head">Action</th>
                <th scope="col"  className="table-head">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders?.map((product, index) => {
                const washingtonRef = doc(
                  db,
                  "ordersSection",
                  product?.orderReferenceId
                );

                // Set the "capital" field of the city 'DC'

                return (
                  <tr key={index}>
                    {/* <td scope="col" className="   product-box">
                  <img
                    src={product.networkProvider}
                    alt="product"
                    className="product-item"
                  />
                </td>
                <td >{product.networkProvider} <IoIosEye onClick={ ()=>{

                  setSelectedProduct(orders)
                } handleShow} /></td> */}
                    <td
                      onClick={() => {
                        setSelectedProduct(
                          ordersSection.find(
                            (data) =>
                              data.orderReferenceId === product.orderReferenceId
                          )
                        );
                        handleShow();
                      }}
                      className="col-text"
                    >
                      {product?.orderReferenceId.slice(0, 6)}
                    </td>
                    <td
                      onClick={() => {
                        setSelectedProduct(
                          ordersSection.find(
                            (data) =>
                              data.orderReferenceId === product.orderReferenceId
                          )
                        );

                        handleShow();
                      }}
                      className="col-text"
                    >
                      {product.recepientName}
                    </td>
                    <td
                      onClick={() => {
                        setSelectedProduct(
                          ordersSection.find(
                            (data) =>
                              data.orderReferenceId === product.orderReferenceId
                          )
                        );

                        handleShow();
                      }}
                    >
                      {product?.date}
                    </td>
                    <td
                      onClick={() => {
                        setSelectedProduct(
                          ordersSection.find(
                            (data) =>
                              data.orderReferenceId === product.orderReferenceId
                          )
                        );

                        handleShow();
                      }}
                      className="col-text"
                    >
                      {product.paymentType}
                    </td>
                    <td
                      onClick={() => {
                        setSelectedProduct(
                          ordersSection.find(
                            (data) =>
                              data.orderReferenceId ===
                              product?.orderReferenceId
                          )
                        );

                        handleShow();
                      }}
                      className="col-text"
                    >
                      {product.amount}
                    </td>
                    <td
                      onClick={() => {
                        setSelectedProduct(
                          ordersSection.find(
                            (data) =>
                              data.orderReferenceId ===
                              product?.orderReferenceId
                          )
                        );

                        handleShow();
                      }}
                      className={`statues-text ${getStatusColor(
                        selectedStatus[index] || product?.orderDeliveryStatus
                      )}`}
                    >
                      {selectedStatus[index] || product?.orderDeliveryStatus}
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm example"
                        onChange={async (e) => {
                          handleStatusChange(index, e.target.value);

                          await updateDoc(washingtonRef, {
                            orderDeliveryStatus: e.target.value,
                          });
                        }}
                        value={selectedStatus[index] || ""}
                      >
                        <option>Pending</option>
                        <option value="Component">Component</option>
                        <option value="Delivery">Delivery</option>
                        <option value="Cancel">Cancel</option>
                        <option value="OutOfStock">OutOfStock</option>
                        <option value="NotAnswered">Not Answered</option>
                        <option value="Faided">Faided</option>
                        <option value="Mutiple Oreder">Mutiple Oreder</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="On hold">On hold</option>
                      </select>
                    </td>
                    <td>
                      <MdOutlineLocalPrintshop size={25} />{" "}
                      <Link to="/invoice" className="view-link">
                        <VscZoomIn size={25} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" className="">
        <Modal.Header closeButton>
          <Modal.Title>Order {selectedProduct?.orderReferenceId} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <h5 className="orderheader-title">Billing details</h5>
              <p className="orderTitle">{selectedProduct?.recepientName} </p>
              <h5 className="orderheader-title">Email</h5>
              <p className="orderTitle"> {selectedProduct?.email} </p>
              <h5 className="orderheader-title">Phone</h5>
              <p className="orderTitle">{selectedProduct?.recepientPhone} </p>
              <h5 className="orderheader-title">Payment Method</h5>
              <p className="orderTitle"> {selectedProduct?.paymentType} </p>
            </div>
            <div className="col-md-6">
              <h5 className="orderheader-title">Shipping details</h5>
              <p className="orderTitle">{selectedProduct?.pickupRegion}</p>
              <p className="orderTitle"> {selectedProduct?.pickupCity}</p>
              <p></p>
              <h5 className="orderheader-title">StreetName</h5>
              <p className="orderTitle">{selectedProduct?.pickupStreetName}</p>

              <h2 className="orderheader-title">Shippinng method</h2>
              <p>Franko Trading Express {selectedProduct?.products?.length} </p>
            </div>
          </div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="headerText">
                    Image
                  </th>
                  <th scope="col" className="headerText">
                    Name
                  </th>
                  <th scope="col" className="headerText">
                    Quantity
                  </th>
                  <th scope="col" className="headerText">
                    Price (GH₵)
                  </th>
                  <th scope="col" className="headerText">
                    Total (GH₵)
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedOrderProduct.map((data, key) => {
                  const productData = filteredProduct.find(
                    (prod) => prod.Id === data.id
                  );
                  return (
                    <tr key={key}>
                      <td>
                        <img
                          className="orderProductName"
                          width="30px"
                          src={productData?.PrimaryImage}
                        />
                      </td>
                      <td className="orderProductName">{productData?.Name}</td>
                      <td className="orderQuantity">{data?.Quantity}</td>
                      <td className="orderQuantity">{data?.Price}</td>
                      <td className="orderTotal">{data?.subtotal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button className="orderBtn" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

/* color: #22223B;
    color: #4A4E69 ; */