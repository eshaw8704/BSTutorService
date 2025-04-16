export const createAppointment = async (req, res) => {
    try {
        const { subject, appointmentTime, appointmentDate, tutor, email } = req.body;

        if (!email || !subject || !appointmentTime || !appointmentDate || !tutor) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newAppointment = new Appointment({
            subject,
            appointmentTime,
            appointmentDate,
            tutor,
        });

        await newAppointment.save();

        // email notification
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password',
            },
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Appointment Confirmation',
            text: `Your appointment for ${subject} on ${appointmentDate} at ${appointmentTime} has been booked successfully.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });

        res.status(201).json({
            message: "Appointment booked successfully!",
            appointment: newAppointment,
        });
    } catch (error) {
        console.error("Error booking appointment:", {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({
            message: "Error booking appointment",
            error: error.message,
        });
    }
};
