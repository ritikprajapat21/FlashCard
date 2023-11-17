import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../SharedElement/Button";
import ViewCard from "./ViewCard/ViewCard";
import ToggleCard from "./ToggleCard/ToggleCard";
import CardContext from "../context/CardContext";

const Viewer = () => {

    const { cards } = CardContext();

    const [index, setIndex] = useState(0)

    const nextCard = () => {
        if (index === cards.length - 1)
            return setIndex(0)
        setIndex(index + 1)
    }

    const previousCard = () => {
        if (index === 0)
            return setIndex(cards.length - 1)
        setIndex(index - 1)
    }

    return (
        <div className="w-full h-2/4 md:h-auto mt-4">
            <h1 className="text-center font-bold text-xl md:text-2xl">
                Viewer
            </h1>
            <div className="flex flex-col items-center justify-center mt-5 h-auto">
                <ViewCard
                    card={cards[index]}
                />
                <ToggleCard
                    nextCard={nextCard}
                    previousCard={previousCard}
                />
            </div>
            <div className="block my-4">
                <Link to="/">
                    <Button
                        title="Switch to Editor mode"
                    />
                </Link>
            </div>
        </div>
    );
}

export default Viewer;