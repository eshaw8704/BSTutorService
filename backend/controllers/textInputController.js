export const handleTextInput = (req, res) => {
    const { inputName, inputValue } = req.body;
    console.log(`Input received: ${inputName}`);
    console.log(`Input value: ${inputValue}`);
    res.json({ message: `Input "${inputName}" received with value: "${inputValue}"` });
};
