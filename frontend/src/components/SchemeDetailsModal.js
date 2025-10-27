import React, { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

const SchemeDetailsModal = ({ scheme, onClose }) => {
  const modalRef = useRef();
  const modalInstance = useRef(null);

  // This effect runs only when the modal is about to be displayed (i.e., `scheme` is not null)
  useEffect(() => {
    if (scheme && modalRef.current) {
      // Create a new modal instance if it doesn't exist
      if (!modalInstance.current) {
        modalInstance.current = new Modal(modalRef.current);
        
        // Add listener for when modal is closed by any means (e.g., Escape key, backdrop click)
        modalRef.current.addEventListener('hidden.bs.modal', () => {
          onClose();
        });
      }
      // Show the modal
      modalInstance.current.show();
    } else {
      // Hide the modal if it exists
      modalInstance.current?.hide();
    }
  }, [scheme, onClose]);

  if (!scheme) return null;

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h4 className="modal-title" id="schemeModalLabel">{scheme.name}</h4>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p className="text-muted">{scheme.description}</p>
            
            <div className="p-3 mb-3 bg-light rounded">
                <div className="row">
                    <div className="col-sm-6 mb-2"><strong>Authority:</strong> {scheme.authority}</div>
                    <div className="col-sm-6 mb-2"><strong>Max Amount:</strong> {scheme.maxAmount}</div>
                    <div className="col-sm-6"><strong>Benefit:</strong> {scheme.subsidy}</div>
                    <div className="col-sm-6"><strong>Credit Guarantee:</strong> {scheme.creditGuarantee ? 'Yes' : 'No'}</div>
                </div>
            </div>

            <h6>Key Eligibility</h6>
            <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item"><strong>Business Status:</strong> For {scheme.registrationStatus} businesses.</li>
                {/* Correctly access nested udyamCriteria */}
                <li className="list-group-item"><strong>Business Types:</strong> {scheme.udyamCriteria?.majorActivity?.join(', ') || 'N/A'}</li>
                <li className="list-group-item"><strong>Business Sizes:</strong> {scheme.udyamCriteria?.msmeClassification?.join(', ') || 'N/A'}</li>
            </ul>
            
            <div>
                {scheme.tags.map(tag => <span key={tag} className="scheme-tag">{tag}</span>)}
            </div>

            {/* Add UDYAM criteria section */}
            {scheme?.udyamCriteria && (
              <div className="mt-4">
                <h6 className="mb-3">UDYAM Criteria</h6>
                <div className="row">
                  <div className="col-md-6">
                    <small className="text-muted">MSME Classification:</small>
                    {/* Correctly access nested udyamCriteria */}
                    <div>{scheme.udyamCriteria.msmeClassification?.join(', ') || 'N/A'}</div>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">Activity Type:</small>
                    {/* Correctly access nested udyamCriteria */}
                    <div>{scheme.udyamCriteria.majorActivity?.join(', ') || 'N/A'}</div>
                  </div>
                </div>
              </div>
            )}

          </div>
          <div className="modal-footer border-0">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Proceed to Apply <i className="fas fa-external-link-alt ms-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetailsModal;
