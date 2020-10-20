import React from "react"
import styled from "./Card.module.css"
import CardHeader from "./header/CardHeader"
import CardTitle from "./title/CardTitle"
import CardList from "./list/CardList"
import CardImage from "./image/CardImage"

const Card: any = ({children}: any) => {
    return <div className={styled.card}>{children}</div>
}

Card.Title = CardTitle
Card.Header = CardHeader
Card.List = CardList
Card.Image = CardImage

export default Card
