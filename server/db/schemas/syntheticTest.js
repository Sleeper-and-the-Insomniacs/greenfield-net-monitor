const { Schema, model } = require('mongoose');

// A single step in the user journer (e.g. hit login endpoint)
// These are subdocuments
const stepSchema = new Schema({
  method: { type: String, enum: ['GET', 'POST', 'PUT', 'DELETE'], default: 'GET' },
  url: { type: String, required: true },
  body: { type: Schema.Types.Mixed }, // Optional payload for POST/PUT steps
  expectedStatus: { type: Number, default: 200 }, // Status if this step passed successfully
}, { _id: false });

// Definition of a synthetic test: what to run, how often, and the steps
const syntheticTestSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  interval: { type: Number, required: true, default: 300 }, // Seconds between runs
  steps: { type: [stepSchema], required: true }, // Ordered - runs top to bottom
  active: { type: Boolean, default: true }, // Toggled off = scheduler stops running it
}, { timestamps: true });

module.exports = model('SyntheticTest', syntheticTestSchema);
