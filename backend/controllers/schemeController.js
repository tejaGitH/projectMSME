import Scheme from '../models/scheme.js';

// Helper function to parse amount strings like "₹50 Lakh" into numbers
const parseAmount = (amountStr) => {
  if (!amountStr || typeof amountStr !== 'string') return 0;
  const cleanedStr = amountStr.replace(/₹/g, '').trim();
  let multiplier = 1;
  if (cleanedStr.toLowerCase().includes('lakh')) {
    multiplier = 100000;
  } else if (cleanedStr.toLowerCase().includes('crore')) {
    multiplier = 10000000;
  }
  const numberPart = parseFloat(cleanedStr);
  return isNaN(numberPart) ? 0 : numberPart * multiplier;
};

// @desc    Find matching schemes based on all criteria
// @route   POST /api/schemes/find
// @access  Public
const findSchemes = async (req, res) => {
  try {
    const criteria = req.body;
    let query = { $and: [] }; // Use $and to combine multiple conditions

    // --- Build Query from UDYAM Criteria ---

    // Basic Classification (only add if criteria is provided)
    if (criteria.msmeClassification) query.$and.push({ 'udyamCriteria.msmeClassification': { $in: [criteria.msmeClassification] } });
    if (criteria.majorActivity) query.$and.push({ 'udyamCriteria.majorActivity': { $in: [criteria.majorActivity] } });
    if (criteria.organizationType) query.$and.push({ 'udyamCriteria.organizationType': { $in: [criteria.organizationType] } });

    // Location
    if (criteria.location?.state) query.$and.push({ 'udyamCriteria.location.state': criteria.location.state });
    if (criteria.location?.district) query.$and.push({ 'udyamCriteria.location.district': criteria.location.district });

    // Financials
    const turnover = Number(criteria.financialDetails?.annualTurnover);
    if (!isNaN(turnover) && turnover > 0) {
      query.$and.push({
        $or: [
          { 'udyamCriteria.financials.minTurnover': { $exists: false } }, // Include schemes with no turnover limit
          { 'udyamCriteria.financials.minTurnover': { $lte: turnover }, 'udyamCriteria.financials.maxTurnover': { $gte: turnover } }
        ]
      });
    }

    const investment = Number(criteria.financialDetails?.plantInvestment);
    if (!isNaN(investment) && investment > 0) {
      query.$and.push({
        $or: [
          { 'udyamCriteria.financials.minInvestment': { $exists: false } }, // Include schemes with no investment limit
          { 'udyamCriteria.financials.minInvestment': { $lte: investment }, 'udyamCriteria.financials.maxInvestment': { $gte: investment } }
        ]
      });
    }

    const employees = Number(criteria.financialDetails?.employeeCount);
    if (!isNaN(employees) && employees > 0) {
      query.$and.push({
        $or: [
          { 'udyamCriteria.financials.minEmployees': { $exists: false } }, // Include schemes with no employee limit
          { 'udyamCriteria.financials.minEmployees': { $lte: employees }, 'udyamCriteria.financials.maxEmployees': { $gte: employees } }
        ]
      });
    }

    if (criteria.financialDetails?.hasGSTIN) query.$and.push({ 'udyamCriteria.financials.requiresGSTIN': true });
    if (criteria.financialDetails?.hasPAN) query.$and.push({ 'udyamCriteria.financials.requiresPAN': true });

    // Entrepreneur Details
    if (criteria.entrepreneurDetails?.gender) query.$and.push({ 'udyamCriteria.targetBeneficiaries.gender': { $in: [criteria.entrepreneurDetails.gender] } });
    if (criteria.entrepreneurDetails?.socialCategory) query.$and.push({ 'udyamCriteria.targetBeneficiaries.socialCategory': { $in: [criteria.entrepreneurDetails.socialCategory] } });
    if (criteria.entrepreneurDetails?.speciallyAbled) query.$and.push({ 'udyamCriteria.targetBeneficiaries.speciallyAbled': true });

    // If no filters are applied, find all schemes. Otherwise, use the built query.
    let finalQuery = query.$and.length > 0 ? query : {};

    let schemes = await Scheme.find(finalQuery);

    // --- Fallback Logic ---
    // If the strict search finds nothing, try a broader search.
    if (schemes.length === 0 && query.$and.length > 0) {
        console.log('Strict search found 0 results. Trying a broader search...');
        const broadQuery = { $or: query.$and }; // Use $or instead of $and
        schemes = await Scheme.find(broadQuery);
    }

    // Post-filter for loan amount because it's a string
    const loanAmount = Number(criteria.financialDetails?.loanAmount);
    if (!isNaN(loanAmount) && loanAmount > 0) {
        schemes = schemes.filter(scheme => {
            const maxSchemeAmount = parseAmount(scheme.financialDetails.maxAmount);
            // Include schemes where maxAmount is not defined (0) or is sufficient
            return maxSchemeAmount === 0 || maxSchemeAmount >= loanAmount;
        });
    }

    res.json(schemes);

  } catch (error) {
    console.error('Error finding schemes:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { findSchemes };
