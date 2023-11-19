import { createContext, useState } from "react";

const CardContext = createContext({})

export const CardProvider = ({ children }) => {
    const [cards, setCards] = useState([
        { id: 1, front: 'Hello', back: 'Hi', public: true },
        { id: 2, front: 'Goodbye', back: 'Sayonara', public: false },
    ])

    /** To switch between create and edit card */
    const [edit, setEdit] = useState(false)

    /** For card editing */
    const [editID, setEditID] = useState(null)

    return <CardContext.Provider value={{ cards, setCards, editID, setEditID, edit, setEdit }}>
        {children}
    </CardContext.Provider>
}

export default CardContext