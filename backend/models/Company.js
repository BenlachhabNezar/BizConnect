import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true
    },

    sector: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    website: {
      type: String,
      default: ""
    },

    phone: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    country: {
      type: String,
      default: "Morocco"
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    verified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Company = mongoose.model("Company", companySchema);

export default Company;