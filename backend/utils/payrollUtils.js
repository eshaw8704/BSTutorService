// backend/utils/payrollUtils.js
import Payroll from '../models/Payroll.js';

export const updateUnconfirmedHours = async (tutorId, hoursToAdd = 1) => {
  let payroll = await Payroll.findOne({ tutor: tutorId });
  if (!payroll) {
    payroll = new Payroll({ tutor: tutorId });
  }
  payroll.nonConfirmedHours += hoursToAdd;
  await payroll.save();
};
