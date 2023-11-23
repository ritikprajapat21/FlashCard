import { useContext } from "react";

import CardContext from "../context/CardContext";

export default function useCard() {
    return useContext(CardContext)
}