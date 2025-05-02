// This file contains the controller for handling button click events in the Express application.
// It exports a function that processes the request and sends a response back to the client.
export const handleButtonClick = (req, res) => {
    const { buttonName, inputText } = req.body;
    console.log(`Button clicked: ${buttonName}`);
    console.log(`Input text: ${inputText}`);
    res.json({ message: `Button "${buttonName}" clicked with text: "${inputText}"` });
};
