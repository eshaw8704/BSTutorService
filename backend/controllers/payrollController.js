import { Payroll } from '../models/Payroll.js';

export const createPayroll = async (req, res) => {
  try {
    const { tutor, confirmedHours, nonConfirmedHours, confirmedBy } = req.body;

    const newPayroll = await Payroll.create({
      tutor,
      confirmedHours,
      nonConfirmedHours,
      confirmedBy
    });

    res.status(201).json(newPayroll);
    
  } catch (error) {
    console.error("Error creating payroll record:", error);
    res.status(500).json({ message: "Failed to create payroll record" });
  }
};
