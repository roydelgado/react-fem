import React from 'react';
import NavHandler from '../components/nav-handler';

export default React.createClass({
    render () {
        //multiline requires ()
        return (
            <NavHandler className='container'>
              <header role='banner'>
                <h1>Labelr</h1>
              </header>
              <div>
                <p>We label stuff for you, because, we can&trade;</p>
                <a href='/login' className='button button-large'>
                  <span className='mega-octicon octicon-mark-github'></span> Login with GitHub
                </a>
              </div>
            </NavHandler>
        )
    }
});