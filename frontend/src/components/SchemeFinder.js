import React, { useState } from 'react';
import axios from 'axios';
import SchemeDetailsModal from './SchemeDetailsModal';

const SchemeFinder = () => {
    const [formData, setFormData] = useState({
        isNewBusiness: 'true',
        hasExistingLoan: 'false',
        usedCreditGuarantee: 'false',
        businessType: '',
        businessSize: '',
        location: '',
        purpose: ''
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [selectedScheme, setSelectedScheme] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSearched(true);
        setResults([]);
        try {
            // Convert string booleans to actual booleans for the API call
            const apiPayload = {
                ...formData,
                isNewBusiness: formData.isNewBusiness === 'true',
                hasExistingLoan: formData.hasExistingLoan === 'true',
                usedCreditGuarantee: formData.usedCreditGuarantee === 'true',
            };
            const { data } = await axios.post('/api/schemes/find', apiPayload);
            setResults(data);
        } catch (error) {
            console.error("Error fetching schemes:", error);
        }
        setLoading(false);
    };

    const showSchemeDetails = (scheme) => {
        setSelectedScheme(scheme);
    }

    const handleCloseModal = () => {
        setSelectedScheme(null);
    }

    return (
        <section id="schemes" className="py-5">
            <div className="container">
                <div className="query-form">
                    <h2 className="text-center mb-4">Find Your Perfect Scheme</h2>
                    <p className="text-center text-muted mb-5">Answer a few questions to get personalized scheme recommendations</p>
                    
                    <form id="schemeQueryForm" onSubmit={handleSubmit}>
                        {/* New Questionnaire Logic */}
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <label className="form-label">Is this for a new or an existing business?</label>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="isNewBusiness" id="isNewBusinessTrue" value="true" checked={formData.isNewBusiness === 'true'} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="isNewBusinessTrue">New Business</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="isNewBusiness" id="isNewBusinessFalse" value="false" checked={formData.isNewBusiness === 'false'} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="isNewBusinessFalse">Existing Business</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {formData.isNewBusiness === 'false' && (
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label className="form-label">Do you have an existing business loan?</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="hasExistingLoan" id="hasLoanTrue" value="true" checked={formData.hasExistingLoan === 'true'} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="hasLoanTrue">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="hasExistingLoan" id="hasLoanFalse" value="false" checked={formData.hasExistingLoan === 'false'} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="hasLoanFalse">No</label>
                                        </div>
                                    </div>
                                </div>
                                {formData.hasExistingLoan === 'true' && (
                                    <div className="col-md-6 mb-4">
                                        <label className="form-label">Did you use a Credit Guarantee for it?</label>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="usedCreditGuarantee" id="usedCGTrue" value="true" checked={formData.usedCreditGuarantee === 'true'} onChange={handleChange} />
                                                <label className="form-check-label" htmlFor="usedCGTrue">Yes</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="usedCreditGuarantee" id="usedCGFalse" value="false" checked={formData.usedCreditGuarantee === 'true'} onChange={handleChange} />
                                                <label className="form-check-label" htmlFor="usedCGFalse">No</label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <hr className="my-4" />

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="businessType" className="form-label">Business Type</label>
                                <select className="form-select" id="businessType" name="businessType" required onChange={handleChange} value={formData.businessType}>
                                    <option value="">Select Business Type</option>
                                    <option value="manufacturing">Manufacturing</option>
                                    <option value="service">Service</option>
                                    <option value="trading">Trading</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="businessSize" className="form-label">Business Size</label>
                                <select className="form-select" id="businessSize" name="businessSize" required onChange={handleChange} value={formData.businessSize}>
                                    <option value="">Select Business Size</option>
                                    <option value="micro">Micro Enterprise</option>
                                    <option value="small">Small Enterprise</option>
                                    <option value="medium">Medium Enterprise</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="location" className="form-label">Location</label>
                                <select className="form-select" id="location" name="location" required onChange={handleChange} value={formData.location}>
                                    <option value="">Select State</option>
                                    <option value="goa">Goa</option>
                                    <option value="maharashtra">Maharashtra</option>
                                    <option value="karnataka">Karnataka</option>
                                    <option value="kerala">Kerala</option>
                                    <option value="all">Other States</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="purpose" className="form-label">Purpose</label>
                                <select className="form-select" id="purpose" name="purpose" required onChange={handleChange} value={formData.purpose}>
                                    <option value="">Select Purpose</option>
                                    <option value="startup">New Business Setup</option>
                                    <option value="expansion">Business Expansion</option>
                                    <option value="modernization">Modernization</option>
                                    <option value="working-capital">Working Capital</option>
                                    <option value="capacity-building">Capacity Building</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary btn-lg px-5">
                                <i className="fas fa-search me-2"></i>Find Matching Schemes
                            </button>
                        </div>
                    </form>
                    
                    {loading && (
                        <div className="loading-spinner" style={{display: 'block'}}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-2">Analyzing your requirements...</p>
                        </div>
                    )}
                    
                    {searched && !loading && (
                        <div className="results-section" style={{display: 'block'}}>
                            <hr className="my-5" />
                            <h3 className="mb-4">Recommended Schemes for You</h3>
                            <div id="schemeResults">
                                {results.length > 0 ? (
                                    <>
                                        <div className="alert alert-success">
                                            <i className="fas fa-check-circle me-2"></i>
                                            Found {results.length} matching scheme{results.length > 1 ? 's' : ''} for your requirements!
                                        </div>
                                        {results.map(scheme => {
                                            return (
                                                <div className="scheme-card" key={scheme._id}>
                                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                                        <h5 className="mb-0">{scheme.name}</h5>
                                                        {scheme.creditGuarantee && <span className="badge bg-info">Credit Guarantee</span>}
                                                    </div>
                                                    <p className="text-muted mb-3">{scheme.description}</p>
                                                    <div className="row mb-3">
                                                        <div className="col-md-6"><small className="text-muted">Maximum Amount:</small><div className="fw-bold">{scheme.maxAmount}</div></div>
                                                        <div className="col-md-6"><small className="text-muted">Subsidy/Benefit:</small><div className="fw-bold">{scheme.subsidy}</div></div>
                                                    </div>
                                                    <div className="mb-3"><small className="text-muted">Authority:</small><div className="fw-bold">{scheme.authority}</div></div>
                                                    <div className="mb-3">{scheme.tags.map(tag => <span key={tag} className="scheme-tag">{tag}</span>)}</div>
                                                    <div className="d-flex gap-2">
                                                        <button className="btn btn-primary btn-sm" onClick={() => showSchemeDetails(scheme)}><i className="fas fa-info-circle me-1"></i>View Details</button>
                                                        <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                                                            <i className="fas fa-file-alt me-1"></i>Apply Now
                                                        </a>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <div className="text-center py-5">
                                        <i className="fas fa-search text-muted" style={{ fontSize: '3rem' }}></i>
                                        <h4 className="mt-3">No matching schemes found</h4>
                                        <p className="text-muted">Try adjusting your criteria or contact our support team for personalized assistance.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <SchemeDetailsModal scheme={selectedScheme} onClose={handleCloseModal} />
        </section>
    );
};

export default SchemeFinder;
