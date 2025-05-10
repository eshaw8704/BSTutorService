// 🔧 Admin Test Page for Traffic Data — модель MongoDB
import mongoose from "mongoose";

const trafficSchema = new mongoose.Schema({
  date: {
    type: String, // формат YYYY-MM-DD
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