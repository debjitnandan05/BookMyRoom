import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      <img
        src={item.photos[0]} alt="" className="siImg"/>
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">500m from center</span>
        <span className="siTaxiOp">Type : {item.type}</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          {/* Entire studio • 1 bathroom • 21m² 1 full bed */}
          {item.desc}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span></span>
          <button>{item.rating} &#11088;</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">₹{item.cheapestPrice}</span>
          <span className="siTaxOp">Includes 18% GST</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">View Rooms</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;