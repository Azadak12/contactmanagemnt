// src/components/Footer.js

import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-4">
      <p>© 2024 My Website. All rights reserved.</p>
      <p>Contact us: <a href="mailto:info@mywebsite.com" className="text-white">info@mywebsite.com</a></p>
    </footer>
  );
};

export default Footer;
