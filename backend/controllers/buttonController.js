export const handleButtonClick = (req, res) => {
    const { buttonName, inputText } = req.body;
    console.log(`Button clicked: ${buttonName}`);
    console.log(`Input text: ${inputText}`);
    res.json({ message: `Button "${buttonName}" clicked with text: "${inputText}"` });
};
