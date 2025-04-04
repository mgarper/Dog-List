import React from "react";
import { useState } from 'react'

import PrimaryButton from "../buttons/PrimaryButton";

import styles from "./Card.module.css"

type CardProps = {
    id: number;
    url: string;
    n_likes: number;
    n_dislikes: number;
    onClick?: (num: number, vote: string) => void;
}

const Card: React.FC<CardProps> = ({id, url, n_likes, n_dislikes, onClick}) => {
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)

    const handleOnClickCute = () => {
        let count = likes
        setLikes(count + 1)
        if (onClick) onClick(id, "like")
    }

    const handleOnClickUgly = () => {
        let count = dislikes
        setDislikes(count + 1)
        if (onClick) onClick(id, "dislike")
    }

    return (
    <>
        <div className={styles.container}>
            <img src={url} alt="" />
            <div>
            <p><span>{n_likes}</span>❤️ <span>{n_dislikes}</span>🤮</p>
            </div>
            <div>
                <PrimaryButton text="Cute af" onClick={handleOnClickCute} isFilter={false}></PrimaryButton>
                <PrimaryButton text="Ugly ahh boi" onClick={handleOnClickUgly} isFilter={false}></PrimaryButton>
            </div>
        </div>
    </>)
}

export default Card