const { Schema, model } = require('mongoose');

// Result of a single step within a test run
const stepResultSchema = new Schema({
  stepIndex: Number, // Which step in SyntheticTest.steps this corresponds to
  status: { type: String, enum: ['pass', 'fail'] },
  statusCode: Number,
  responseTime: Number, // In milliseconds
  error: String, // Only populated on fail
}, { _id: false });

// One full run of a synthetic test (all steps, or however far it got before failing)
const testResultSchema = new Schema({
  syntheticTestId: { type: Schema.Types.ObjectId, ref: 'SyntheticTest', required: true },
  overallStatus: { type: String, enum: ['pass', 'fail'] },
  totalResponseTime: Number, // Milliseconds, sum across all steps that ran
  steps: [stepResultSchema],
  // TTL requires a Date field with `expires` set directly on it -
  // { timestamps: true } alone will not create a TTL index, so this is manual.
  createdAt: { type: Date, default: Date.now, expires: '30d' },
});

module.exports = model('TestResult', testResultSchema);
