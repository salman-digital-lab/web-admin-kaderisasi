import React from "react";
import "../../assets/scss/KaderDetail.scss";
import KaderDetail from "./components/kader-detail";
import KaderTimeline from "./components/kader-timeline";
import { Card, Box, CardContent } from "@material-ui/core";
import { AdminActivityProvider } from "../../context/AdminActivityContext";

const KaderSalmanDetail = () => {
  return (
    <AdminActivityProvider>
      <div className="userdetail">
        <Card>
          <CardContent className="filter-content">
            <Box pl={5} pr={5}>
              <div className="userdetail-data">
                <KaderDetail />
                <br />
                <KaderTimeline />
              </div>
            </Box>
          </CardContent>
        </Card>
      </div>
    </AdminActivityProvider>
  );
};
export default KaderSalmanDetail;
