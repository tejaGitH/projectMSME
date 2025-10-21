import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2 className="display-5 fw-bold mb-4">About RAMP Project</h2>
            <p className="lead mb-4">
              The Rising and Accelerating (RAMP) project under the Directorate of Industries, Trade and Commerce
              is designed to boost business growth and industrial development.
            </p>
            <p className="mb-4">
              Our Business Facilitation Centre serves as a one-stop solution for entrepreneurs and businesses
              seeking financial assistance, capacity building, and growth opportunities through various government
              schemes and programs.
            </p>
            <div className="row g-3">
              <div className="col-sm-6"><div className="d-flex align-items-center"><i className="fas fa-check-circle text-success me-2"></i><span>MSME Support</span></div></div>
              <div className="col-sm-6"><div className="d-flex align-items-center"><i className="fas fa-check-circle text-success me-2"></i><span>Credit Facilitation</span></div></div>
              <div className="col-sm-6"><div className="d-flex align-items-center"><i className="fas fa-check-circle text-success me-2"></i><span>Skill Development</span></div></div>
              <div className="col-sm-6"><div className="d-flex align-items-center"><i className="fas fa-check-circle text-success me-2"></i><span>Market Linkage</span></div></div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-center">
              {/* SVG can be complex, consider making it a separate component if needed */}
              <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="buildingGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor:"#00FFFF"}}/><stop offset="100%" style={{stopColor:"#00CCCC"}}/></linearGradient></defs>
                <rect x="50" y="150" width="60" height="120" fill="url(#buildingGrad)" rx="5"/><rect x="130" y="100" width="70" height="170" fill="url(#buildingGrad)" rx="5"/><rect x="220" y="130" width="65" height="140" fill="url(#buildingGrad)" rx="5"/><rect x="300" y="110" width="60" height="160" fill="url(#buildingGrad)" rx="5"/>
                <rect x="60" y="170" width="15" height="15" fill="white" opacity="0.8"/><rect x="85" y="170" width="15" height="15" fill="white" opacity="0.8"/><rect x="60" y="200" width="15" height="15" fill="white" opacity="0.8"/><rect x="85" y="200" width="15" height="15" fill="white" opacity="0.8"/>
                <rect x="145" y="120" width="15" height="15" fill="white" opacity="0.8"/><rect x="170" y="120" width="15" height="15" fill="white" opacity="0.8"/><rect x="145" y="150" width="15" height="15" fill="white" opacity="0.8"/><rect x="170" y="150" width="15" height="15" fill="white" opacity="0.8"/><rect x="145" y="180" width="15" height="15" fill="white" opacity="0.8"/><rect x="170" y="180" width="15" height="15" fill="white" opacity="0.8"/>
                <path d="M 50 250 Q 200 200 350 150" stroke="#ffd700" strokeWidth="4" fill="none"/><polygon points="340,145 350,150 340,155 345,150" fill="#ffd700"/>
                <circle cx="80" cy="50" r="3" fill="#ffd700"/><circle cx="200" cy="40" r="2" fill="#ffd700"/><circle cx="320" cy="60" r="2.5" fill="#ffd700"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
