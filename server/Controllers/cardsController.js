import CardModel from "../Model/Card.model.js";
import mongoose from "mongoose";


/** To get cards by unauthorized person */
export const getCards = async (req, res) => {
    const result = await CardModel.find({ share: { $all: [true] } });

    // console.log(JSON.parse(result))
    // No content available
    if (!result) return res.status(204).json({ message: "No card available" });

    res.json({ cards: result });
}

export const getCreatedCards = async (req, res) => {
    const { email } = req.params;

    if (!email) return res.status(400).json({ message: "Username is required" });

    const cards = await CardModel.find({ createdBy: { $all: [email] } });

    // No card available 
    if (!cards) return res.status(204).json({ message: "No card available" });

    res.status(200).json({ cards });
}

export const saveCard = async (req, res) => {
    let { newCards, editedCards } = req.body;

    if (!newCards) return res.status(400).send("Cards are required")

    const setId = (card) => {
        return {
            ...card,
            id: new mongoose.Types.ObjectId()
        }
    }

    newCards = newCards.map(setId)
    editedCards = newCards.map(setId)

    console.log(newCards, editedCards)

    const result = await CardModel.create(newCards)
    const result2 = editedCards.map(async card => await CardModel.updateOne({ id: card.id }, { $set: { ...card } }))

    console.log(result)
    if (!result) return res.status(500).send("Internal error")

    return res.status(201).json({ 'message': 'Card created' })
}