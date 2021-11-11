import React, { useState } from "react";
import './Card.css';

/** Single card: just renders the card as received from deck. */

const Card = ({ name, image }) => {

    const [{ angle, x, y }] = useState({
        angle: Math.random() * 90 - 45,
        x: Math.random() * 45 - 20,
        y: Math.random() * 45 - 20
    });
    console.log(name)

    const transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

    return <img className="Card"
        alt={name}
        src={image}
        style={{ transform }} />;
}

export default Card