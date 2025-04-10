import { Schema, model } from 'mongoose';
import { TProduct } from './products.interface';
import { ProductCategory } from './products.constant';

// Create the schema for a Car Product
const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ProductCategory,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      required: true,
      default: true,
    },
    image: {
      type: String,
      required: true,
    },
    productDetails: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

//Before saving pre hook used to update stock
productSchema.pre('save', function (next) {
  this.inStock = this.stock > 0;
  next();
});

// Export the model
export const Products = model<TProduct>('Products', productSchema);
