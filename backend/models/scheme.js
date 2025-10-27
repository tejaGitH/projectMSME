import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
  // Core Scheme Details
  slNo: Number,
  name: { type: String, required: true, unique: true },
  objective: { type: String, default: '' },
  description: String,
  benefits: { type: String, default: '' },
  applicationPortal: String,
  authority: String,
  tags: [String],

  // Eligibility & Application
  eligibility: { type: String, default: '' },
  documents: [String],
  process: String,
  registrationStatus: { type: String, enum: ['new', 'existing', 'both'] },

  // Financial Details of the Scheme
  financialDetails: {
    fundingType: [{ type: String, enum: ['grant', 'loan', 'subsidy', 'credit-guarantee', 'equity', 'hybrid'] }],
    beneficiaryContribution: String,
    maxAmount: String, // Keep this simple for now
    subsidyPercentage: String,
    interestRate: String,
    marginMoney: String,
    repaymentPeriod: String,
    moratoriumPeriod: String,
  },

  // UDYAM Based Criteria for Eligibility
  udyamCriteria: {
    msmeClassification: [{ type: String, enum: ['micro', 'small', 'medium'] }],
    majorActivity: [{ type: String, enum: ['manufacturing', 'service', 'trading'] }], // Changed 'services' to 'service'
    organizationType: [{ type: String, enum: ['proprietary', 'partnership', 'huf', 'company', 'llp', 'cooperative', 'society', 'trust'] }],
    location: {
      geographicScope: { type: String, enum: ['national', 'state', 'district', 'rural', 'urban', 'all'], default: 'all' },
      state: String,
      district: String,
    },
    financials: {
      minTurnover: Number,
      maxTurnover: Number,
      minInvestment: Number,
      maxInvestment: Number,
      minEmployees: Number,
      maxEmployees: Number,
      requiresGSTIN: Boolean,
      requiresPAN: Boolean,
    },
    targetBeneficiaries: {
      gender: [{ type: String, enum: ['M', 'F', 'other'] }],
      socialCategory: [{ type: String, enum: ['general', 'sc', 'st', 'obc'] }],
      speciallyAbled: Boolean,
      specialCategories: [{ type: String, enum: ['women', 'sc-st', 'minorities', 'differently-abled', 'ex-servicemen', 'rural', 'tribal'] }],
    },
  },
}, {
  timestamps: true
});

// Index for text search
schemeSchema.index({ name: 'text', objective: 'text', description: 'text', tags: 'text' });

const Scheme = mongoose.model('Scheme', schemeSchema);
export default Scheme;
