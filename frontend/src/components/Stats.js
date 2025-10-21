import React from 'react';

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="row">
          <StatItem number="500+" title="Available Schemes" subtitle="Government and financial schemes" />
          <StatItem number="10,000+" title="Businesses Helped" subtitle="Successful funding connections" />
          <StatItem number="₹500Cr+" title="Funding Facilitated" subtitle="Total funding amount processed" />
          <StatItem number="95%" title="Success Rate" subtitle="Successful scheme matching" />
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ number, title, subtitle }) => (
  <div className="col-lg-3 col-md-6">
    <div className="stat-item">
      <span className="stat-number">{number}</span>
      <h5>{title}</h5>
      <p className="text-muted">{subtitle}</p>
    </div>
  </div>
);

export default Stats;
