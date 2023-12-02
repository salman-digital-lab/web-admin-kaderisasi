import React from "react"
import {
  Box,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core"
import WarningIcon from "@material-ui/icons/Warning"

const componentStyle = {
  icon: {
    color: "#FF0000",
    width: 25,
    height: 25,
  },
}

export default function Information() {
  return (
    <Card variant="outlined" style={{ backgroundColor: "#FFEBCD" }}>
      <CardHeader
        style={{ paddingLeft: "-10px" }}
        avatar={
          <IconButton style={{ marginRight: "0px" }}>
            <WarningIcon style={componentStyle.icon} />
          </IconButton>
        }
        titleTypographyProps={{ variant: "h6", paddingLeft: "-20px" }}
        title="Information"
      />
      <CardContent style={{ marginTop: "-25px" }}>
        <Typography variant="body2" color="text.secondary">
          Tidak perlu membuat pertanyaan yang sudah disediakan datanya nama,
          gender, email, no hp, Line ID, domisili, tgl lahir, kota lahir ,
          alamat, kampus, fakultas, jurusan, angkatan, jenjang, angkatan ssc lmd
        </Typography>
      </CardContent>
    </Card>
  )
}
