import mongoose from 'mongoose';
const reviewSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  }, { timestamps: true });

const productSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    image: { type: String, required: true },
    images: [String],
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    salePrice: { type: Number },
    countInStock: { type: Number, required: true, default: 0 },
    variations: [{
      name: String, // e.g., Size, Color
      options: [String] // e.g., ['S', 'M', 'L'], ['Red', 'Blue']
    }],
    isFeatured: { type: Boolean, default: false },
  }, { timestamps: true });
const Product = mongoose.model('Product', productSchema);
export default Product;
