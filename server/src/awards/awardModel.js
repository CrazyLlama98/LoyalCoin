import mongoose from 'mongoose';

const awardSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
    alias: 'id'
  },
  amount: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  retailerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: mongoose.Schema.Types.String,
    required: true
  }
});

awardSchema.methods.toDto = function () {
  return {
    id: this._id,
    amount: this.amount,
    retailerId: this.retailerId,
    title: this.title
  };
};

export default mongoose.model('Award', awardSchema);