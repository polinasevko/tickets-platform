import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import CardPanel from './CardPanel/CardPanel';


const Landing = () => {
  return (
    <div className='landing'>
        <p>Find your perfect</p>
        <p>concert whereever</p>
        <p>you are</p>
        <Link to='/concerts' className='landing__button button'>Find a concert</Link>   
        
        <CardPanel />
    </div>
  )
}

export default Landing