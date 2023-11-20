import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast"

import useAuth from "../hooks/useAuth";
import axios from "../axios/axios";

const CardContext = createContext({})

export const CardProvider = ({ children }) => {
    const [cards, setCards] = useState([
        { id: 1, front: 'Hello', back: 'Hi', public: true },
        { id: 2, front: 'Goodbye', back: 'Sayonara', public: false },
    ])

    const { isLogin, auth } = useAuth()

    useEffect(() => {

        // User not logged in, then import from localstorage if available
        setCards(prev => JSON.parse(localStorage.getItem('cards') || prev))

        //For public cards
        const fetchPublicCards = () => {
            try {
                const response = axios.get('/card/public')

                toast.promise(response, {
                    loading: "Retriving Public cards....",
                    success: (res) => {
                        console.log(res)
                        setCards(prev => [...prev, ...res.data.cards])
                        return "Retrived Successfully!"
                    },
                    error: (err) => {
                        console.error(err)
                        return "Cannot retrive now..."
                    }
                })
            } catch (err) {
                console.error(err)
            }
        }

        // User logged in, then fetch the cards
        const fetchPrivateCards = () => {
            try {
                const response = axios.get(`/card/${auth.email}`)

                toast.promise(response, {
                    loading: 'Retrieving your cards...',
                    success: 'Retrival successfull',
                    error: 'Internal error, Try again!'
                })

                response.then((data) => {
                    setCards(data.cards)
                }).catch((err) => { throw err })
            } catch (err) {
                console.error(err)
            }
        }

        fetchPublicCards()

        isLogin && fetchPrivateCards()

    }, [isLogin])

    /** To switch between create and edit card */
    const [edit, setEdit] = useState(false)

    /** For card editing */
    const [editID, setEditID] = useState(null)

    return <CardContext.Provider value={{ cards, setCards, editID, setEditID, edit, setEdit }}>
        {children}
    </CardContext.Provider>
}

export default CardContext