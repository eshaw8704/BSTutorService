export const createPayroll = async (req, res) => {
  try {
    console.log("📦 Incoming payroll body:", req.body);

    const { tutor, confirmedHours, nonConfirmedHours, confirmedBy } = req.body;

    if (!tutor || !confirmedHours || !nonConfirmedHours || !confirmedBy) {
      return res.status(400).json({
        message: "Missing required fields",
        body: req.body
      });
    }

    const newPayroll = await Payroll.create({
      tutor,
      confirmedHours,
      nonConfirmedHours,
      confirmedBy
    });

    res.status(201).json(newPayroll);
  } catch (error) {
    console.error("❌ Error creating payroll record:", error);
    res.status(500).json({ message: "Failed to create payroll record" });
  }
};
