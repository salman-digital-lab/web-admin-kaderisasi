import React from "react";
import "../../assets/scss/Kader.scss";
import CategoryTable from "./components/category-table";
import { AdminActivityProvider } from "../../context/AdminActivityContext";

const CategorySetting = () => {
  return (
    <AdminActivityProvider>
      <div className="userlist">
        <div className="flex-container">
          <CategoryTable />
        </div>
      </div>
    </AdminActivityProvider>
  );
};
export default CategorySetting;
