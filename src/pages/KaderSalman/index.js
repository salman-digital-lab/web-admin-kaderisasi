import React from "react";
import "../../assets/scss/Kader.scss";
import KaderFilter from "./components/kader-filter";
import KaderTable from "./components/kader-table";
import { AdminActivityProvider } from "../../context/AdminActivityContext";

const KaderSalman = () => {
  return (
    <AdminActivityProvider>
      <div className="userlist">
        <div className="flex-container">
          <div className="flex-left">
            <KaderTable />
          </div>
          <div className="flex-right">
            <KaderFilter />
          </div>
        </div>
      </div>
      </AdminActivityProvider>
  );
};
export default KaderSalman;
