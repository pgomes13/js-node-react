const mongoose = require('mongoose');

// defined the Brand schema as per following relationships 
// - A brand may have many stores.
// - A store belongs to a brand.
const BrandSchema = new mongoose.Schema({
	brand_id: { type: Number },
	name: { type: String, required: true },
	stores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }]
});

mongoose.model('Brand', BrandSchema);