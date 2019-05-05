import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
    alias: 'id'
  },
  retailerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  description: {
    type: mongoose.Schema.Types.String
  },
  price: {
    type: mongoose.Schema.Types.Number,
    required: true
  }
});

productSchema.methods.toDto = function () {
  return {
    id: this._id,
    retailerId: this.retailerId,
    title: this.title,
    description: this.description,
    price: this.price
  }
}

export default mongoose.model('Product', productSchema);