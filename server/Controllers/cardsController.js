import CardModel from "../Model/Card.model.js";


/** To get cards by unauthorized person */
export const getCards = async (req, res) => {
    const result = await CardModel.find({ share: { $all: [true] } });

    // No content available
    if (!result) return res.status(204).json({ message: "No card available" });

    res.status(200).json({cards: result});
}

export const getCreatedCards = async (req, res) => {
    const { username } = req.params;

    if (!username) return res.status(400).json({ message: "Username is required" });

    const cards = await CardModel.find({ createdBy: { $all: [username] } });

    // No card available 
    if (!cards) return res.status(204).json({ message: "No card available" });

    res.status(200).json({ cards });
}

export const saveCard = async (req, res) => {
    const { front, back, createdBy, share } = req.body;

    if (!front || !back || !createdBy) return res.status(400).send("Front, back and created by are required")

    const result = await CardModel.create({
        front,
        back,
        createdBy,
        share: share || false
    })

    if (!result) return res.status(500).send("Internal error")

    return res.status(201).json({ 'message': 'Card created' })
}