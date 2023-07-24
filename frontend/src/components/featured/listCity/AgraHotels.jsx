import React from 'react'
import Navbar from '../../navbar/Navbar';
import Header from '../../header/Header';
import SearchItem from '../../searchItem/SearchItem';
import useFetch from '../../../hooks/useFetch';


const AgraHotels = () => {
   
    const {data,loading}=useFetch(`${process.env.REACT_APP_BASE_URL}/hotels?city=Agra`)
  return (
    <div className='kuku'>
         <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          
            

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

export default AgraHotels
