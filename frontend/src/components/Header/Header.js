import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className='header'>
        <div className='header__wrapper'>
            
            <Link to='/' className='header__logo'>
              <h1>Concer<b>t</b>ick</h1>
            </Link>

            <nav className='header__nav'>
                <Link to='/#' className='header__link button'>Sign in</Link>
                <Link to='/#' className='header__link button'>Sign up</Link>
            </nav>

        </div>
    </header>
  )
}

export default Header