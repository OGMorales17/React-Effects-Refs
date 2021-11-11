import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';
import "./Deck.css";

const BASE_URL = "http://deckofcardsapi.com/api/deck";

const CardsDeck = () => {
    const [deck, setDeck] = useState(null);
    const [drawn1, setDrawn1] = useState([]);
    const [autoDraw1, setAutoDraw1] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        async function getData() {
            const dTa = await axios.get(`${BASE_URL}/new/shuffle/`)
            setDeck(dTa.data)
        }
        getData()
    }, [setDeck])

    useEffect(() => {
        async function getCard() {
            const { deck_id } = deck

            try {
                const drawRes = await axios.get(`${BASE_URL}/${deck_id}/draw/`)

                if (drawRes.data.remaining === 0) {
                    setAutoDraw1(false)
                    throw new Error('No cards remaining!')
                }

                const card = drawRes.data.cards[0];

                setDrawn1(dTa => [
                    ...dTa,
                    {
                        id: card.code,
                        image: card.image
                    }
                ]);

            } catch (err) {
                alert(err)
            }
        }
        if (autoDraw1 && !timerRef.current) {
            console.log(timerRef.current)

            timerRef.current = setInterval(async () => {
                await getCard();
            }, 1000);
        }

        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [autoDraw1, setDrawn1, deck])

    const toggleAutoDraw = () => {
        setAutoDraw1(auto => !auto);
    };

    const cards = drawn1.map(c => (
        <Card key={c.id} image={c.image} />
    ));

    return (
        <div className="Deck">
            {deck ? (
                <button className="Deck-gimme" onClick={toggleAutoDraw}>
                    {autoDraw1 ? "STOP" : "KEEP"} DRAWING FOR ME!
                </button>
            ) : null}
            <div className="Deck-cardarea">{cards}</div>
        </div>
    );
}

export default CardsDeck;
