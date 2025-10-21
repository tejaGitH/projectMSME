import mongoose from 'mongoose';

const schemeSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  authority: { type: String },

  // New fields for better filtering
  registrationStatus: { type: String, required: true, enum: ['new', 'existing', 'both'] }, // For new vs old MSMEs
  creditGuarantee: { type: Boolean, default: false }, // Does the scheme offer a credit guarantee?

  // Existing fields
  businessType: [{ type: String }],
  businessSize: [{ type: String }],
  purpose: [{ type: String }],
  location: { type: String },

  // Financials
  subsidy: { type: String },
  maxAmount: { type: String },

  tags: [{ type: String }],
}, {
  timestamps: true
});

const Scheme = mongoose.model('Scheme', schemeSchema);

export default Scheme;
