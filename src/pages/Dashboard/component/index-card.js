import React from "react"
import CardDashboard from "./card-dashboard"
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

const ColorCard = [
    {icon: <PeopleOutlineIcon fontSize="large"/>, color: "#61B15A", title:"Jumlah Akun", text:"Akun"},
    {icon: <EqualizerIcon fontSize="large"/>,color: "#1C6C7D", title:"Jumlah Jamaah", text:"Jamaah"},
    {icon: <EqualizerIcon fontSize="large"/>, color: "#73C5D0", title:"Jumlah Aktivis", text:"Aktivis"},
    {icon: <EqualizerIcon fontSize="large"/>, color: "#FFA72E", title:"Jumlah Kader", text:"Kader"},
]

const Card = () => {
    const data = [...ColorCard]

    return(
        <>
            {data.map((e,idx) => {
                return <CardDashboard key={idx} color={e.color} icon={e.icon} title={e.title} text={e.text} />
            })}
        </>
    )
}

export default Card