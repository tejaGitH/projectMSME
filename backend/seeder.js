import mongoose from 'mongoose';
import dotenv from 'dotenv';
import schemes from './data/schemes.js';
import Scheme from './models/scheme.js';

dotenv.config();

console.log('Starting data import...');

const connectDB = async () => {
  try {
    // Connect with timeout option
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000 // 30 seconds
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();
    console.log('Clearing existing schemes...');
    await Scheme.deleteMany();
    
    console.log('Transforming schemes data to match new schema...');
    const transformedSchemes = schemes.map(scheme => {
      const specialCategoryEnum = ['women', 'sc-st', 'minorities', 'differently-abled', 'ex-servicemen', 'rural', 'tribal'];
      
      // Provide default nested structure for udyamCriteria
      const udyamDefaults = {
        msmeClassification: scheme.businessSize || ['micro', 'small', 'medium'],
        majorActivity: scheme.businessType || ['manufacturing', 'service', 'trading'],
        organizationType: ['proprietary', 'partnership', 'huf', 'company', 'llp', 'cooperative', 'society', 'trust'],
        location: {
          geographicScope: 'all',
          state: scheme.location === 'all' ? null : scheme.location,
          district: null,
        },
        financials: {
          // Set to null/undefined so the $exists:false query works
          minTurnover: undefined,
          maxTurnover: undefined,
          minInvestment: undefined,
          maxInvestment: undefined,
          minEmployees: undefined,
          maxEmployees: undefined,
          requiresGSTIN: false,
          requiresPAN: false,
        },
        targetBeneficiaries: {
          gender: ['M', 'F', 'other'],
          socialCategory: ['general', 'sc', 'st', 'obc'],
          speciallyAbled: false,
          // Correctly filter and MAP tags to find real special categories
          specialCategories: (scheme.tags || [])
            .map(tag => tag.toLowerCase().replace(' ', '-')) // Convert all tags to the enum format first
            .filter(tag => specialCategoryEnum.includes(tag)), // Then filter the ones that are valid
        },
      };

      // Create a new object for insertion, removing old top-level fields
      const { businessSize, businessType, ...restOfScheme } = scheme;

      return {
        ...restOfScheme,
        udyamCriteria: udyamDefaults,
      };
    });

    console.log('Inserting new schemes...');
    const insertedSchemes = await Scheme.insertMany(transformedSchemes);
    console.log(`Successfully imported ${insertedSchemes.length} schemes`);
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error during import:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Scheme.deleteMany();
    console.log('Data Destroyed!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error during destroy:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
