/* eslint-disable */
import React from "react"
import { Card, Box, CardContent } from "@material-ui/core"
import ProfileProvider from "../../context/ProfileContext"
import Profile from "./Profile"

const index = () => {
  return (
    <ProfileProvider>
      <div className="userdetail">
        <Card>
          <CardContent className="filter-content">
            <Box>
              <Profile />
            </Box>
          </CardContent>
        </Card>
      </div>
    </ProfileProvider>
  )
}

export default index
