import React, { useContext} from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faBed, faCalendarDays, faLocationDot, faPerson, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './payment.css'
import Footer from '../../components/footer/Footer';


const Payment = () => {
  const location = useLocation();
  const id = location.state.hotelId;  
  const { data } = useFetch(`${process.env.REACT_APP_BASE_URL}/hotels/find/${id}`);


  const {date,options} = useContext(SearchContext);
  const {user} = useContext(AuthContext);
 
  const miliSecond = 1000 * 60 * 60 * 24;
  function totalDays(StartDate, EndDate) {
    const timeDiff = Math.abs(EndDate.getTime() - StartDate.getTime());
    const dayDiff = Math.ceil(timeDiff / miliSecond);
    return dayDiff;
  }
  const days = totalDays(date[0].endDate, date[0].startDate);
  const formDate = `${date[0].startDate.getDate()}/${date[0].startDate.getMonth()}/${date[0].startDate.getFullYear()}`
  const toDate = `${date[0].endDate.getDate()}/${date[0].endDate.getMonth()}/${date[0].endDate.getFullYear()}`
  
  const amount = Number(days * options.room * data.cheapestPrice);

  const handlePay = async()=>{
    const { data: { key } } = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment/getkey`)
    const {data : {order}} = await axios.post(`${process.env.REACT_APP_BASE_URL}/payment/`, {amount});   

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: data.name,
      description: "Payment via RazorPay",
      image: data.photos[0],
      order_id: order.id,
      callback_url: `${process.env.REACT_APP_BASE_URL}/payment/paymentverification`,
      prefill: {
          name: user.name,
          email: user.email
      },
      notes: {
          "address": "Razorpay Corporate Office"
      },
      theme: {
          "color": "#193919"
      }
  };
  const razor = new window.Razorpay(options);
  razor.open();
  }


  return (
    <div>
      <Navbar />
      <div className="paymentpage">
     
      <div className="customerDetails">
        <h1>Customer Details</h1>
        <hr />
        <div><FontAwesomeIcon icon={faUser}/> <b> Name : </b>{user.name}</div>
        <div><FontAwesomeIcon icon={faAt}/> <b>Email : </b>{user.email}</div>
      </div>   
      
      <div className="bookingDetails">
      <h1>Booking Details</h1>
      <hr />
         <h3 >{data.name}</h3>
          <div > <FontAwesomeIcon icon={faLocationDot}/> <b> Address : </b>  {data.address}</div>
          <div> <FontAwesomeIcon icon={faPhone}/> <b> Phone : </b>  {data.phone}</div>
          <div> <FontAwesomeIcon icon={faCalendarDays}/> <b>Days : </b> {days} ({formDate} to {toDate})</div>
          <div> <FontAwesomeIcon icon={faBed}/> <b>Rooms : </b> {options.room}</div>
          <div> <FontAwesomeIcon icon={faPerson}/> <b>Guests : </b> {Number(options.adult)}</div>
          <h2><b>Total Price : </b> ₹ {amount}/-</h2>
          <button onClick={handlePay}>Pay Now!</button>
    
       </div>
      

      </div>
      
      <Footer/>
       

    </div>
  )
}

export default Payment
