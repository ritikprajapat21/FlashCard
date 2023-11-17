import { createContext, useState, useEffect } from "react";

import axios from "../axios/axios"

const CardContext = createContext({})

export const CardProvider = ({ children }) => {
    const [cards, setCards] = useState([
        { id: 1, front: 'Hello', back: 'Hi', public: true },
        { id: 2, front: 'Goodbye', back: 'Sayonara', public: false },
    ])

    useEffect(() => {

        const fetchCards = async () => {
            const response = await axios.get('/card')
            console.log(response.data)
        }

        // fetchCards()
    },[])

    return <CardContext.Provider value={{ cards, setCards }}>
        {children}
    </CardContext.Provider>
}

export default CardContext