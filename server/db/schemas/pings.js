const { Schema, model } = require('mongoose');

const pingsSchema = new Schema({
  monitorId: {
    type: Schema.type.ObjectId,
    ref: 'Monitors',
    required: true,
  },
  status: {
    type: String,
    enum: ['up', 'down'],
  },
  responsetime: { type: Number },
  statusCode: { type: Number },
  error: { type: String },
}, { timestamps: true });

module.exports = model('Pings', pingsSchema);
