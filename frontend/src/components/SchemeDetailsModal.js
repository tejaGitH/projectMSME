import React from 'react';

const SchemeDetailsModal = ({ scheme, onClose }) => {
  if (!scheme) return null;

  return (
    <div className="modal fade" id="schemeDetailModal" tabIndex="-1" aria-labelledby="schemeModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="schemeModalLabel">{scheme.name}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p className="lead">{scheme.description}</p>
            <hr />
            <div className="row">
                <div className="col-md-6 mb-3">
                    <strong>Authority:</strong>
                    <p>{scheme.authority}</p>
                </div>
                <div className="col-md-6 mb-3">
                    <strong>Max Amount:</strong>
                    <p>{scheme.maxAmount}</p>
                </div>
                <div className="col-md-6 mb-3">
                    <strong>Subsidy/Benefit:</strong>
                    <p>{scheme.subsidy}</p>
                </div>
                <div className="col-md-6 mb-3">
                    <strong>Credit Guarantee:</strong>
                    <p>{scheme.creditGuarantee ? 'Yes' : 'No'}</p>
                </div>
            </div>
            <h6>Eligibility:</h6>
            <ul>
                <li><strong>Business Status:</strong> For {scheme.registrationStatus} businesses.</li>
                <li><strong>Business Types:</strong> {scheme.businessType.join(', ')}</li>
                <li><strong>Business Sizes:</strong> {scheme.businessSize.join(', ')}</li>
                <li><strong>Location:</strong> {scheme.location === 'all' ? 'All of India' : 'Goa Specific'}</li>
            </ul>
            <h6>Tags:</h6>
            <div>
                {scheme.tags.map(tag => <span key={tag} className="scheme-tag">{tag}</span>)}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetailsModal;
