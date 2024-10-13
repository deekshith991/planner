import React, { useState } from "react";
import Header from "../Sections/Header";
import Navbar from "../Sections/Navbar";
import ViewContainer from "../Sections/ViewContainer";

const PlannerPage = () => {
  const [activeTab, setActiveTab] = useState('list'); // Default active tab

  return (
    <div>
      <Header />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <ViewContainer activeTab={activeTab} />
    </div>
  );
};

export default PlannerPage;

