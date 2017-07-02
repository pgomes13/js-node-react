const mongoose = require('mongoose');

// defined the Store schema as per following relationships 
// - A brand may have many stores.
// - A store belongs to a brand.
const StoreSchema = new mongoose.Schema({
	store_id: { type: Number },
	name: { type: String, required: true },
	brand_id: { type: Number }
});

mongoose.model('Store', StoreSchema);