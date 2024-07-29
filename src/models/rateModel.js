import mongoose from "mongoose";

const rateSchema = new mongoose.Schema({
  whoIsChecked: {
    type: String,
    default: "",
  },
  whatIsCheckedEmail: {
    type: String,
    default: "",
  },
  whatIsCheckedId: {
    type: String,
    default: "",
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  rate: {
    type: String,
    default: "0",
  },
});

const Rate = mongoose.models.rates || mongoose.model("rates", rateSchema);

export default Rate;
