import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import './hotelList.css'
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';

const HotelList = () => {

  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [minPrice, setMinPrice] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(undefined);


  const { data, loading, error, reFetch } = useFetch(`${process.env.REACT_APP_BASE_URL}/hotels?city=${destination}&min=${minPrice || 10}&max=${maxPrice || 10000000}`);

  const handleSearch =()=>{
    reFetch();
  }


  return (
    <div>
    <Navbar />
    <Header type="list" />
    <div className="listContainer">
      <div className="listWrapper">
        <div className="listSearch">
          <h1 className="lsTitle">Search</h1>
          <div className="lsItem">
            <label>Destination</label>
            <input className='searchInput' placeholder={destination} type="text" />
          </div>
          <div className="lsItem">
            <label>Check-in Date</label>
            <span className='searchInput' onClick={() => setOpenDate(!openDate)}>{`${format(
              date[0].startDate,
              "dd/MM/yyyy"
            )} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
            {openDate && (
              <DateRange
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                ranges={date}
              />
            )}
          </div>
          <div className="lsItem">
            <label>Options</label>
            <div className="lsOptions">
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Min price :
                </span>
                <input type="number" className="lsOptionInput" onChange={(e)=>{setMinPrice(e.target.value)}} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Max price :
                </span>
                <input type="number" className="lsOptionInput" onChange={(e)=>{setMaxPrice(e.target.value)}} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Guest</span>
                <input
                  type="number"
                  min={1}
                  className="lsOptionInput"
                  placeholder={options.adult}
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Room</span>
                <input
                  type="number"
                  min={1}
                  className="lsOptionInput"
                  placeholder={options.room}
                />
              </div>
            </div>
          </div>
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="listResult">
        {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}         
        </div>
      </div>
    </div>
  </div>
  )
}

export default HotelList
