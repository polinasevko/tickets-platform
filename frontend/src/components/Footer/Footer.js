import React from 'react'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import './Footer.css'


const Footer = () => {
  return (
    <footer className='footer'>
        <hr className='footer__hr'/>
        <div className='footer__wrapper'>
            <a href='https://github.com/polinasevko' target='_blank' rel='noopener noreferrer'>
                <AiFillGithub className='footer__img'/>
            </a>
            <a href='https://www.linkedin.com/in/polina-sevko' target='_blank' rel='noopener noreferrer'>
                <AiFillLinkedin className='footer__img'/>
            </a>
            <p class='footer__text-info'>2022</p>
        </div>
    </footer>
  )
}

export default Footer