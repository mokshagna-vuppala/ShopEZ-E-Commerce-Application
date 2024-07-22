import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import Products from '../components/Products'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import SaleBanner from '../components/SaleBanner'


const Home = () => {

  const navigate = useNavigate();

  return (
    
    <div className="HomePage">
     <div>
        <SaleBanner/>
     </div>

      
     

      <div id='products-body'></div>
      <Products category = 'all'  />


      <Footer />
    </div>
  )
}

export default Home