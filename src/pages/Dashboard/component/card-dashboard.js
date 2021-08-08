import React from "react"
/* eslint-disable */
const CardDashboard = (props) => {
  return (
    <div className="card-dashboard">
      <div
        className="left-innercard"
        style={{ backgroundColor: `${props.color}` }}
      >
        {props.icon}
      </div>
      <div className="right-innercard">
        <p className="title-innercard">{props.title}</p>
        <h2>{props.value}</h2>
        <p>{props.text}</p>
      </div>
    </div>
  )
}

export default CardDashboard
