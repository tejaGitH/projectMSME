import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="row align-items-center hero-content">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold mb-4">Find the Right Business Scheme for You</h1>
            <p className="lead mb-4">
              Discover government schemes and financial assistance programs tailored to your business needs.
              From micro enterprises to large industries, we help you find the perfect funding solution.
            </p>
            <div className="d-flex flex-wrap gap-2 mb-4">
              <span className="badge text-dark px-3 py-2" style={{ background: '#FFFFF0' }}>MSME Schemes</span>
              <span className="badge text-dark px-3 py-2" style={{ background: '#FFFFF0' }}>Credit Guarantee</span>
              <span className="badge text-dark px-3 py-2" style={{ background: '#FFFFF0' }}>Capacity Building</span>
              <span className="badge text-dark px-3 py-2" style={{ background: '#FFFFF0' }}>Working Capital</span>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-center">
              <i className="fas fa-chart-line" style={{ fontSize: '200px', opacity: 0.3 }}></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
