import React from 'react';

const Features = () => {
  return (
    <section className="py-5" style={{ background: '#f0ffff' }}>
      <div className="container">
        <div className="row text-center mb-5">
          <div className="col-lg-8 mx-auto">
            <h2 className="display-5 fw-bold mb-3">Why Choose Our Platform?</h2>
            <p className="lead text-muted">Comprehensive support for your business growth journey</p>
          </div>
        </div>
        <div className="row g-4">
          {/* Feature Items */}
          <FeatureCard icon="fas fa-search" title="Smart Scheme Matching" text="Our intelligent system analyzes your business profile and matches you with the most suitable government schemes and financial programs." />
          <FeatureCard icon="fas fa-shield-alt" title="Credit Guarantee Support" text="Access credit guarantee schemes that reduce collateral requirements and make funding more accessible for your business." />
          <FeatureCard icon="fas fa-graduation-cap" title="Capacity Building" text="Find training programs and capacity building initiatives to enhance your business skills and operational efficiency." />
          <FeatureCard icon="fas fa-handshake" title="End-to-End Support" text="From application guidance to documentation support, we assist you throughout your funding journey." />
          <FeatureCard icon="fas fa-clock" title="Quick Processing" text="Streamlined processes and digital workflows ensure faster application processing and approval timelines." />
          <FeatureCard icon="fas fa-chart-line" title="Growth Tracking" text="Monitor your business growth and get recommendations for additional schemes as your business expands." />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, text }) => (
  <div className="col-lg-4 col-md-6">
    <div className="feature-card text-center">
      <div className="feature-icon">
        <i className={icon}></i>
      </div>
      <h4 className="mb-3">{title}</h4>
      <p className="text-muted">{text}</p>
    </div>
  </div>
);

export default Features;
