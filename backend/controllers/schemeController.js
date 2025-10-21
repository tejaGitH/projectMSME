import Scheme from '../models/schemeModel.js';

// @desc    Find matching schemes based on detailed criteria
// @route   POST /api/schemes/find
// @access  Public
const findMatchingSchemes = async (req, res) => {
  try {
    const {
      isNewBusiness,
      hasExistingLoan,
      usedCreditGuarantee,
      businessType,
      businessSize,
      purpose,
      location
    } = req.body;

    let query = {};

    // 1. Filter by New vs. Existing Business
    if (isNewBusiness) {
      query.registrationStatus = { $in: ['new', 'both'] };
    } else {
      query.registrationStatus = { $in: ['existing', 'both'] };
    }

    // 2. Handle logic for existing businesses with loans
    if (!isNewBusiness && hasExistingLoan) {
      if (usedCreditGuarantee) {
        // User has a loan with CG, look for schemes that are NOT credit guarantees
        // (e.g., working capital, top-up loans)
        query.creditGuarantee = false;
      } else {
        // User has a loan but NO CG, they might be looking for one now
        // Or other types of loans. We can prioritize CG schemes.
        // For now, we don't add a strict filter, but this can be a scoring factor.
      }
    }

    // 3. Add other user inputs to the query
    if (businessType) query.businessType = businessType;
    if (businessSize) query.businessSize = businessSize;
    if (purpose) query.purpose = purpose;
    if (location) query.location = { $in: [location, 'all'] };

    const schemes = await Scheme.find(query);

    // In a real-world scenario, you'd implement a more complex scoring system here
    // based on how well each remaining scheme matches the criteria.
    // For now, we return the filtered list.

    res.json(schemes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { findMatchingSchemes };
