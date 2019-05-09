import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
    alias: 'id'
  },
  username: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  firstname: {
    type: mongoose.Schema.Types.String
  },
  lastname: {
    type: mongoose.Schema.Types.String
  },
  registerDate: {
    type: mongoose.Schema.Types.Date,
    default: Date.now
  },
  publicKey: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  roles: {
    type: [mongoose.Schema.Types.String],
    required: true
  }
});

userSchema.methods.toDto = function () {
  return {
    id: this._id,
    username: this.username,
    firstname: this.firstname,
    lastname: this.lastname,
    registerDate: this.registerDate,
    email: this.email,
    publicKey: this.publicKey,
    roles: this.roles
  };
};

export default mongoose.model('User', userSchema);