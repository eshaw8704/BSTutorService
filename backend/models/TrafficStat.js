import mongoose from "mongoose";

const trafficSchema = new mongoose.Schema({
  date: {
    type: String, // "YYYY-MM-DD"
    required: true,
    unique: true,
  },
  visits: {
    type: Number,
    default: 0,
  },
});

const Traffic = mongoose.model("Traffic", trafficSchema);
export default Traffic;