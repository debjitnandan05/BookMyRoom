import "./singleHotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import BookHotel from "../../components/bookHotel/BookHotel";


const SingleHotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal,setOpenModal]=useState(false);
  const location = useLocation();
  const hotelId = location.pathname.split("/")[2];
  

  const { data, loading } = useFetch(`${process.env.REACT_APP_BASE_URL}/hotels/find/${hotelId}`);
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 3 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 3 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const {date,options} = useContext(SearchContext);
 
  const miliSecond = 1000 * 60 * 60 * 24;
  function totalDays(StartDate, EndDate) {
    const timeDiff = Math.abs(EndDate.getTime() - StartDate.getTime());
    const dayDiff = Math.ceil(timeDiff / miliSecond);
    return dayDiff;
  }
  const days = totalDays(date[0].endDate, date[0].startDate);

  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBookNow = ()=>{
    if (user) {
      setOpenModal(true);
      navigate('/payment',{state:{hotelId}})
    } else {
      navigate('/login');
    }

  }
  

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading 
      ? ("Loading......") 
      :     
     ( <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">{data.rating} &#11088;</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>

          <span className="hotelPriceHighlight">
            Phone : {data.phone}
          </span>
                    
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>           
             
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">{data.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days} Days stay!</h1>
              <span>
                Located in the real heart of {data.city}
              </span>
              <h2>
                <b>₹{days * data.cheapestPrice * options.room}</b> ({days} Days)
              </h2>
              <button onClick={handleBookNow}>Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>)}
      {/* {openModal && <BookHotel setOpen={setOpenModal} hotelId={id}/>} */}
    </div>
  );
};

export default SingleHotel;
