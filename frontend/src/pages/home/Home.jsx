import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import "./home.css";
const Home = () => {
  return (
    <div>
    <Navbar />
    <Header/>
    <div className="homeContainer">
      <Featured/>
      <MailList/>
      <Footer/>
    </div>
  </div>
  )
}

export default Home
