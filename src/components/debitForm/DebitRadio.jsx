"use client";
import React, { useState } from "react";
import Radio from "../form/input/Radio";

export const DonationAnonymous = () => {
  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <div className="flex flex-wrap items-center gap-8 rounded-md border border-gray-200 dark:border-gray-600 py-6 px-5">
      <Radio
        id="anonymous-radio1"
        name="anonymous"
        value="option1"
        checked={selectedValue === "option1"}
        onChange={() => setSelectedValue("option1")}
        label="Yes"
      />
      <Radio
        id="anonymous-radio2"
        name="anonymous"
        value="option2"
        checked={selectedValue === "option2"}
        onChange={() => setSelectedValue("option2")}
        label="No"
      />
    </div>
  );
};

export const DonationWallDonars = () => {
  const [selectedValue, setSelectedValue] = useState("option2");

  return (
    <div className="flex flex-wrap items-center gap-8 rounded-md border border-gray-200 dark:border-gray-600 py-6 px-5">
      <Radio
        id="donars-radio1"
        name="donars"
        value="option1"
        checked={selectedValue === "option1"}
        onChange={() => setSelectedValue("option1")}
        label="Yes"
      />
      <Radio
        id="donars-radio2"
        name="donars"
        value="option2"
        checked={selectedValue === "option2"}
        onChange={() => setSelectedValue("option2")}
        label="No"
      />
    </div>
  );
};

export const DonationTaxReciepts = () => {
  const [selectedValue, setSelectedValue] = useState("option3");

  return (
    <div className="flex flex-wrap items-center gap-8 rounded-md border border-gray-200 dark:border-gray-600 py-6 px-5">
      <Radio
        id="tax-radio1"
        name="tax"
        value="option1"
        checked={selectedValue === "option1"}
        onChange={() => setSelectedValue("option1")}
        label="Email"
      />
      <Radio
        id="tax-radio2"
        name="tax"
        value="option2"
        checked={selectedValue === "option2"}
        onChange={() => setSelectedValue("option2")}
        label="Hard Copy"
      />
      <Radio
        id="tax-radio3"
        name="tax"
        value="option3"
        checked={selectedValue === "option3"}
        onChange={() => setSelectedValue("option3")}
        label="Both"
      />
    </div>
  );
};
