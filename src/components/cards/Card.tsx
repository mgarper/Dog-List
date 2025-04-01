import React from "react";
import { useState } from 'react'

import PrimaryButton from "../buttons/PrimaryButton";

import styles from "./Card.module.css"

type CardProps = {
    url: string;
}

const Card: React.FC<CardProps> = ({url}) => {
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)

    const handleOnClickCute = () => {
        let count = likes
        setLikes(count + 1)
    }

    const handleOnClickUgly = () => {
        let count = dislikes
        setDislikes(count + 1)
    }

    return (
    <>
        <div className={styles.container}>
            <img src={url} alt="" />
            <div>
            <p><span>{likes}</span>❤️ <span>{dislikes}</span>🤮</p>
            </div>
            <div>
                <PrimaryButton text="Cute af" onClick={handleOnClickCute}></PrimaryButton>
                <PrimaryButton text="Ugly ahh boi" onClick={handleOnClickUgly}></PrimaryButton>
            </div>
        </div>
    </>)
}

export default Card