import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import './bookHotel.css'
import { SearchContext } from '../../context/SearchContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const BookHotel = ({setOpen,hotelId}) => {

  const {data}= useFetch(`${process.env.REACT_APP_BASE_URL}/hotels/rooms/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([]);

 
  const navigate = useNavigate();
  const {date,options}=useContext(SearchContext);

  const getDatesInRange = (sDate, eDate) => {
    const start = new Date(sDate);
    const end = new Date(eDate);

    const date = new Date(start.getTime());

    let dateList = [];

    while (date <= end) {
      dateList.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dateList;
  };
  const alldates = getDatesInRange(date[0].startDate,date[0].endDate);

  const MILLISECONDS_PER_DAY=1000*60*60*24;
    function dayDifference(date1,date2){
        const timeDiff=Math.abs(date2.getTime()-date1.getTime());
        const diffDays=Math.ceil(timeDiff/MILLISECONDS_PER_DAY);
        return diffDays;
    };
    var days=(dayDifference(date[0].endDate,date[0].startDate))
    if(days===0){
        days=days+1
    }
  
  
 
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleBookNow = async()=>{
  try {
    await Promise.all(
      selectedRooms.map(
        (roomID)=>{
          const res = axios.put(`${process.env.REACT_APP_BASE_URL}/room/availability/${roomID}`,{date:alldates});
          navigate('/payment',{state:{selectedRooms,hotelId}})
        })
    );

   
  } catch (error) {
    console.log(error)
  }
  }

  
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select rooms :</span>
        
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxCount}</b>
              </div>             
            <div className="rPrice">Price: ₹{days*item.price*options.room} ({days} days)</div>
          </div>
          <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                  />
                </div>
              ))}
            
            </div>
          
          </div>
        ))}

<button onClick={handleBookNow} className="rButton">
          Book Now!
        </button>
       
     </div>
  </div>
  )
}

export default BookHotel
