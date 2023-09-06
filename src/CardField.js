import { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
const BASE_URL = "https://deckofcardsapi.com/api/deck";

const CardField = () => {
    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function fetchNewDeck() {
            const res = await axios.get(`${BASE_URL}/new/shuffle`);
            setDeck(res.data);
        }
        fetchNewDeck();
        console.log("New Deck!", deck);
    }, []);

    const shuffleDeck = async () => {
        await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle`);
        setCards([]);
    };

    const drawCard = async () => {
        console.log("draw card!");
        const cardRes = await axios.get(`${BASE_URL}/${deck.deck_id}/draw`);
        const cardData = cardRes.data.cards[0];
        setCards((cards) => [
            ...cards,
            {
                id: cardData.code,
                name: cardData.suit + " " + cardData.value,
                image: cardData.image,
            },
        ]);
        console.log(cards);
    };

    return (
        <div>
            <h1>Cards</h1>
            <button onClick={drawCard}>Draw Card</button>
            <button onClick={shuffleDeck}>Shuffle Deck</button>
            <div>
                {cards.map(({ id, name, image }) => (
                    <Card key={id} name={name} image={image} />
                ))}
            </div>
        </div>
    );
};

export default CardField;
