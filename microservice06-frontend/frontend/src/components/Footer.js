import React from 'react';

const Footer = () => {

  return (
    <footer className='footer'>
      <nav>
        <ul>
          <li>
            <a href="/faq">FAQ</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/contact">Contact Info</a>
          </li>
          <li>
            <a href="/developers">For Developers</a>
          </li>
        </ul>
      </nav>
      <p>© 2023 MyCharts. MIT licence.</p>
      <p></p>
    </footer>
  );
};

export default Footer;
