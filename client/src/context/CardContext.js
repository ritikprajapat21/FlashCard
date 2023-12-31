import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import axios from "../axios/axios";
import useAuth from "../hooks/useAuth";

const CardContext = createContext({})

export const CardProvider = ({ children }) => {

    const navigate = useNavigate()
    const [cards, setCards] = useState([])

    /** To switch between create and edit card */
    const [edit, setEdit] = useState(false)

    /** For card editing */
    const [editID, setEditID] = useState(null)

    const { auth, isLogin } = useAuth()

    const postCards = () => {
        if (isLogin) {
            const newCards = cards.filter(card => card.new).map(card =>{ 
                return {
                    front: card.front, 
                    back: card.back, 
                    createdBy: card.createdBy,
                    share: true,
                }
            })
            console.log("new cards:", newCards)

            
            const editedCards = cards.filter(card => card.edited && !card.new)
            console.log("edited cards:", editedCards)

            const response = axios.post('/card/save', { newCards, editedCards, email: auth?.email })

            toast.promise(response, {
                loading: 'Saving Created Cards....',
                success: (res) => {
                    console.log(res.data.message)
                    return "Cards Saved"
                },
                error: (err) => {
                    console.log(err)
                    return "Create new cards or edit existing ones"
                }
            })
        } else {
            navigate('/signin', { replace: true })
        }
    }

    return <CardContext.Provider value={{ cards, setCards, editID, setEditID, edit, setEdit, postCards }}>
        {children}
    </CardContext.Provider>
}

export default CardContext