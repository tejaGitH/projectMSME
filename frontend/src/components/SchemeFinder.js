import React, { useState } from 'react';
import axios from 'axios';
import SchemeDetailsModal from './SchemeDetailsModal';

const SchemeFinder = () => {
    const [formData, setFormData] = useState({
        // Basic Classification
        msmeClassification: '',
        majorActivity: '',
        organizationType: '',
        location: {
            state: '',
            district: ''
        },
        // Financial Details
        financialDetails: {
            annualTurnover: '',
            plantInvestment: '',
            employeeCount: '',
            loanAmount: '',
            hasGSTIN: false,
            hasPAN: false
        },
        // Entrepreneur Details
        entrepreneurDetails: {
            gender: '',
            socialCategory: '',
            speciallyAbled: false
        }
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [selectedScheme, setSelectedScheme] = useState(null);

    // Constants for form options
    const msmeTypes = ['micro', 'small', 'medium'];
    const activityTypes = ['manufacturing', 'service', 'trading'];
    const orgTypes = [
        'proprietary', 'partnership', 'huf', 'company', 'llp', 
        'cooperative', 'society', 'trust'
    ];
    const socialCategories = ['general', 'sc', 'st', 'obc'];
    const genderTypes = ['M', 'F', 'other'];

    // Handle changes for both top-level and nested state properties
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSearched(true);
        setResults([]);
        try {
            const { data } = await axios.post('/api/schemes/find', formData);
            setResults(data);
        } catch (error) {
            console.error("Error fetching schemes:", error);
            setResults([]);
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
                    
                    <form onSubmit={handleSubmit}>
                        {/* Business Classification Section */}
                        <div className="row mb-4">
                            <h5>Business Classification</h5>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="msmeClassification" className="form-label">MSME Type</label>
                                <select className="form-select" id="msmeClassification" name="msmeClassification" onChange={handleChange} value={formData.msmeClassification}>
                                    <option value="">Select MSME Type</option>
                                    {msmeTypes.map(type => (
                                        <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="majorActivity" className="form-label">Major Activity</label>
                                <select className="form-select" id="majorActivity" name="majorActivity" onChange={handleChange} value={formData.majorActivity}>
                                    <option value="">Select Major Activity</option>
                                    {activityTypes.map(activity => (
                                        <option key={activity} value={activity}>{activity.charAt(0).toUpperCase() + activity.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="organizationType" className="form-label">Organization Type</label>
                                <select className="form-select" id="organizationType" name="organizationType" onChange={handleChange} value={formData.organizationType}>
                                    <option value="">Select Organization Type</option>
                                    {orgTypes.map(type => (
                                        <option key={type} value={type}>{type.toUpperCase()}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Location Section */}
                        <div className="row mb-4">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="location.state" className="form-label">State</label>
                                <input type="text" className="form-control" name="location.state" placeholder="Enter State" onChange={handleChange} value={formData.location.state} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="location.district" className="form-label">District</label>
                                <input type="text" className="form-control" name="location.district" placeholder="Enter District" onChange={handleChange} value={formData.location.district} />
                            </div>
                        </div>

                        {/* Financial & Employment Section */}
                        <div className="row mb-4">
                            <h5>Financial & Employment Details</h5>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Loan Required (in ₹)</label>
                                <input type="number" className="form-control" name="financialDetails.loanAmount" placeholder="e.g., 1000000" onChange={handleChange} value={formData.financialDetails.loanAmount} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Annual Turnover (in ₹)</label>
                                <input type="number" className="form-control" name="financialDetails.annualTurnover" placeholder="e.g., 5000000" onChange={handleChange} value={formData.financialDetails.annualTurnover} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Plant & Machinery Investment (in ₹)</label>
                                <input type="number" className="form-control" name="financialDetails.plantInvestment" placeholder="e.g., 2500000" onChange={handleChange} value={formData.financialDetails.plantInvestment} />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Number of Employees</label>
                                <input type="number" className="form-control" name="financialDetails.employeeCount" placeholder="e.g., 15" onChange={handleChange} value={formData.financialDetails.employeeCount} />
                            </div>
                            <div className="col-md-4 mb-3 align-self-center">
                                <div className="form-check mt-3">
                                    <input type="checkbox" className="form-check-input" name="financialDetails.hasGSTIN" id="hasGSTIN" onChange={handleChange} checked={formData.financialDetails.hasGSTIN} />
                                    <label className="form-check-label" htmlFor="hasGSTIN">Has GSTIN</label>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3 align-self-center">
                                <div className="form-check mt-3">
                                    <input type="checkbox" className="form-check-input" name="financialDetails.hasPAN" id="hasPAN" onChange={handleChange} checked={formData.financialDetails.hasPAN} />
                                    <label className="form-check-label" htmlFor="hasPAN">Has PAN</label>
                                </div>
                            </div>
                        </div>

                        {/* Entrepreneur Details Section */}
                        <div className="row mb-4">
                            <h5>Entrepreneur Details</h5>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="entrepreneurDetails.gender" className="form-label">Gender</label>
                                <select className="form-select" id="entrepreneurDetails.gender" name="entrepreneurDetails.gender" onChange={handleChange} value={formData.entrepreneurDetails.gender}>
                                    <option value="">Select Gender</option>
                                    {genderTypes.map(gender => (
                                        <option key={gender} value={gender}>{gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Other'}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="entrepreneurDetails.socialCategory" className="form-label">Social Category</label>
                                <select className="form-select" id="entrepreneurDetails.socialCategory" name="entrepreneurDetails.socialCategory" onChange={handleChange} value={formData.entrepreneurDetails.socialCategory}>
                                    <option value="">Select Category</option>
                                    {socialCategories.map(category => (
                                        <option key={category} value={category}>{category.toUpperCase()}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 mb-3 align-self-center">
                                <div className="form-check mt-3">
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input" 
                                        id="speciallyAbled" 
                                        name="entrepreneurDetails.speciallyAbled"
                                        onChange={handleChange}
                                        checked={formData.entrepreneurDetails.speciallyAbled}
                                    />
                                    <label className="form-check-label" htmlFor="speciallyAbled">Specially Abled</label>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary btn-lg px-5" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-search me-2"></i>
                                        Find Schemes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Results Section */}
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
                                        {results.map(scheme => (
                                            <div className="scheme-card" key={scheme._id}>
                                                <h5 className="mb-0">{scheme.name}</h5>
                                                <p className="text-muted mb-3">{scheme.description}</p>
                                                <div className="row mb-3">
                                                    <div className="col-md-6"><small className="text-muted">Max Amount:</small><div className="fw-bold">{scheme.financialDetails?.maxAmount || 'N/A'}</div></div>
                                                    <div className="col-md-6"><small className="text-muted">Authority:</small><div className="fw-bold">{scheme.authority || 'N/A'}</div></div>
                                                </div>
                                                <div>
                                                    {scheme.tags.map(tag => <span key={tag} className="scheme-tag">{tag}</span>)}
                                                </div>
                                                <div className="d-flex gap-2 mt-3">
                                                    <button className="btn btn-primary btn-sm" onClick={() => showSchemeDetails(scheme)}><i className="fas fa-info-circle me-1"></i>View Details</button>
                                                    <a href={scheme.applicationPortal} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                                                        <i className="fas fa-file-alt me-1"></i>Apply Now
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
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
