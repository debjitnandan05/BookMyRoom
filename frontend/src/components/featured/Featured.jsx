import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./featured.css";
import ListAgra from "./listCity/AgraHotels";

const Featured = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`${process.env.REACT_APP_BASE_URL}/hotels/countByCity?cities=Delhi,Mumbai,Jaipur,Kolkata,Agra,Chennai`);

  const handleClickAgra = ()=>{
    navigate(`/hotels/Agra`);
  }
  const handleClickDelhi = ()=>{
    navigate(`/hotels/Delhi`);
  }
  const handleClickKolkata = ()=>{
    navigate(`/hotels/Kolkata`);
  }
  const handleClickMumbai = ()=>{
    navigate(`/hotels/Mumbai`);
  }
  const handleClickJaipur = ()=>{
    navigate(`/hotels/Jaipur`);
  }
  const handleClickChennai = ()=>{
    navigate(`/hotels/Chennai`);
  }


  return (
    <>
  { loading 
  ? ("Loading please wait") 
  : (
    <>
    <div className="featured">        
    
     <div className="featuredItem">
     
        <img
          src="https://wallpapercave.com/wp/wp3917545.jpg"
          alt=""
          className="featuredImg"
          onClick={handleClickDelhi}
        />
        <div className="featuredTitles">
          <h1>Delhi</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>    

     <div className="featuredItem">
        <img
          src="https://images.pexels.com/photos/15839679/pexels-photo-15839679/free-photo-of-chhatrapati-shivaji-terminus-illuminated-at-night.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="featuredImg"
          onClick={handleClickMumbai}
        />
        <div className="featuredTitles">
          <h1>Mumbai</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>

     
     <div className="featuredItem">
        <img
          src="https://images.pexels.com/photos/14247658/pexels-photo-14247658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="featuredImg"
          onClick={handleClickJaipur}
        />
        <div className="featuredTitles">
          <h1>Jaipur</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div>

    </div>

    <div className="featured">        
   
    <div className="featuredItem">
        <img
          src="https://images.pexels.com/photos/9610478/pexels-photo-9610478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="featuredImg"
          onClick={handleClickKolkata}
        />
        <div className="featuredTitles">
          <h1>Kolkata</h1>
          <h2>{data[3]} properties</h2>
        </div>
      </div>

     
     <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          alt=""
          className="featuredImg"
          onClick={handleClickAgra}
        />
        <div className="featuredTitles">
          <h1>Agra</h1>
          <h2>{data[4]} properties</h2>
        </div>
      </div>

     
     <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlbm5haSUyQyUyMGluZGlhfGVufDB8fDB8fHww&w=1000&q=80"
          alt=""
          className="featuredImg"
          onClick={handleClickChennai}
        />
        <div className="featuredTitles">
          <h1>Chennai</h1>
          <h2>{data[5]} properties</h2>
        </div>
      </div>

    </div>
    
    </>

  )
  }
    </>
  );
};

export default Featured;