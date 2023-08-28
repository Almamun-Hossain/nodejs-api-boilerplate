const mongoose = require('mongoose');
const becrypt = require('bcryptjs');
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

/**
 * check if a eamil already in used
 * @param {string} email
 * @param {ObjectId} [excludeId]
 * @returns {Promise<boolean>}
 */
userSchema.methods.isEmailExist = async (email, excludeId) => {
  const user = await this.findOne({ email, _id: { $ne: excludeId } });
  return !!user;
};

/**
 * compare if the password is matched
 * @param {string} password
 * @returns {Promise<boolean>}
 */

userSchema.methods.isPasswordMatched = (password) => {
  let user = this;
  return becrypt.compare(password, user.password);
};

/**
 * 
 */
userSchema.pre('save', async (next) => {
  let user = this;
  if (user.isModifiled('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
