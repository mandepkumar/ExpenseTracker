import React, { useState } from "react";
import Form, { Button } from "./Form";

// <Card heading={"Wallet Balance:"} amt={4500} formData={addIncomeForm} />

const Card = ({ heading, amt, formData }) => {
  const [showForm, setShowForm] = useState(false);
  const popUpForm = () => {
    setShowForm(true);
  };
  return (
    <div className="card">
      <h2>
        {heading}{" "}
        <span style={{ color: `var(${formData.color})`, fontWeight: "700" }}>
          ₹{amt}
        </span>
      </h2>
      <Button
        bgColor={formData.bgColor}
        formData={formData}
        onClick={popUpForm}
      >
        {formData.actionBtn.name}
      </Button>
      {showForm && <Form data={formData} setShowForm={setShowForm} />}
    </div>
  );
};

export default Card;
