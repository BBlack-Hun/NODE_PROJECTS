const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'product name must be provied'],
    },

    price: {
      type: Number,
      required: [true, 'product price name must be provied'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    company: {
      type: String,
      enum: ['ikea', 'liddy', 'caressa', 'marcos'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
