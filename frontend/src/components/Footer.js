import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h5 className="mb-3">Business Facilitation Centre</h5>
            <p>Under RAMP Project<br />Directorate of Industries, Trade and Commerce</p>
            <div className="d-flex gap-3">
              <a href="#!" className="text-white"><i className="fab fa-facebook"></i></a>
              <a href="#!" className="text-white"><i className="fab fa-twitter"></i></a>
              <a href="#!" className="text-white"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#schemes" style={{ color: '#333', opacity: 0.7 }}>Find Schemes</a></li>
              <li><a href="#about" style={{ color: '#333', opacity: 0.7 }}>About RAMP</a></li>
              <li><a href="#!" style={{ color: '#333', opacity: 0.7 }}>Application Status</a></li>
              <li><a href="#!" style={{ color: '#333', opacity: 0.7 }}>Help & Support</a></li>
            </ul>
          </div>
          <div className="col-lg-4 mb-4">
            <h5 className="mb-3">Contact Info</h5>
            <p style={{color: 'rgba(255,255,255,0.5)'}}>
              <i className="fas fa-envelope me-2"></i>info@ramp-goa.gov.in<br />
              <i className="fas fa-phone me-2"></i>+91-832-XXXXXXX<br />
              <i className="fas fa-map-marker-alt me-2"></i>Panaji, Goa
            </p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <p className="mb-0">&copy; 2024 Business Facilitation Centre - RAMP Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
