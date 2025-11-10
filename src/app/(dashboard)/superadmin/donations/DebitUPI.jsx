import {
  DonationAnonymous,
  DonationTaxReciepts,
  DonationWallDonars,
} from "@/src/components/debitForm/DebitRadio";
import {
  DonationRecurring,
  DonationRecurringDuration,
  DonationSelectInput,
} from "@/src/components/debitForm/DonationSelectInput";
import Input from "@/src/components/ui/Input/InputField";
import Label from "@/src/components/ui/Input/Label";
import React, { useState } from "react";

const DebitUPI = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    affiliation: "",
    panNumber: "",
    amount: "",
    customAmount: "",
    donationType: "oneTime",
    frequency: "quarterly",
    isAnonymous: "no",
    displayAmount: "yes",
    taxReceipt: "email",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmountSelect = (amount) => {
    setFormData((prev) => ({
      ...prev,
      amount: amount,
      customAmount: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle payment processing logic here
  };

  // Predefined amount options
  const oneTimeAmounts = [
    { value: "500000", label: "₹ 5,00,000" },
    { value: "300000", label: "₹ 3,00,000" },
    { value: "100000", label: "₹ 1,00,000" },
    { value: "51000", label: "₹ 51,000" },
    { value: "21000", label: "₹ 21,000" },
    { value: "other", label: "Other" },
  ];

  const recurringAmounts = [
    { value: "1000", label: "₹ 1,000" },
    { value: "2000", label: "₹ 2,000" },
    { value: "5000", label: "₹ 5,000" },
    { value: "10000", label: "₹ 10,000" },
    { value: "25000", label: "₹ 25,000" },
    { value: "other", label: "Other" },
  ];

  const getFinalAmount = () => {
    return formData.amount === "other"
      ? formData.customAmount
      : formData.amount;
  };

  const formatIndianCurrency = (amount) => {
    return parseInt(amount).toLocaleString("en-IN");
  };

  return (
    <div className="w-full mx-auto p-6 dark:bg-[#1D1F24] rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="mb-8">
        <div className="dark:bg-[#16181D] bg-white border-l-4 border-blue-500 p-4 rounded ">
          <p className="text-sm text-gray-700 leading-relaxed dark:text-white/90  ">
            Please note that all donations are eligible for a 100% tax
            deduction, and tax receipts will be issued upon receipt of funds, a
            process that generally takes 3-4 working days.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <div className="dark:bg-[#1D1F24] p-6 rounded-lg border dark:border-[#344054]">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90  mb-4">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Input
                type="text"
                name="name"
                value={formData.name}
                // onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Input
                type="email"
                name="email"
                value={formData.email}
                // onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-0">
            <div>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                // onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <DonationSelectInput />
            </div>

            <div>
              <Input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                // onChange={handleInputChange}
                required
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                title="Please enter a valid PAN number (e.g., ABCDE1234F)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                placeholder="Enter PAN Number"
              />
              <span className="block text-xs text-gray-500 mb-2">
                (Mandatory Field for 80G certificate)
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="dark:bg-[#16181D] p-4 bg-white rounded-md">
            <p className="text-sm text-gray-700 leading-relaxed dark:text-white/90  text-center  ">
              Annual-Gift Programme
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Donation Amount Section */}
          <div className="dark:bg-[#1D1F24] p-6 rounded-lg border dark:border-[#344054]">
            {/* Donation Type Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-6">
              <button
                type="button"
                className={`flex-1 py-3 px-4 font-medium transition-colors ${
                  formData.donationType === "oneTime"
                    ? "bg-brand-500 text-white"
                    : "bg-brand-100 hover:bg-brand-200"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, donationType: "oneTime" }))
                }
              >
                One Time
              </button>
              <button
                type="button"
                className={`flex-1 py-3 px-4 font-medium transition-colors ${
                  formData.donationType === "recurring"
                    ? "bg-brand-500 text-white"
                    : "bg-brand-100 hover:bg-brand-200"
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    donationType: "recurring",
                  }))
                }
              >
                Recurring
              </button>
            </div>

            {/* Amount Options */}
            <div className="mb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ">
                {(formData.donationType === "oneTime"
                  ? oneTimeAmounts
                  : recurringAmounts
                ).map((amount) => (
                  <button
                    key={amount.value}
                    type="button"
                    className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${
                      formData.amount === amount.value
                        ? "bg-brand-500 text-white"
                        : "bg-brand-100 hover:bg-brand-200"
                    }`}
                    onClick={() => handleAmountSelect(amount.value)}
                  >
                    {amount.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Options for Recurring */}
            {formData.donationType === "recurring" && (
              <div className="mb-6">
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 font-medium transition-colors rounded-md mb-3 ${
                    formData.donationType === "recurring"
                      ? "bg-brand-500 text-white"
                      : "bg-brand-100 hover:bg-brand-200"
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      donationType: "oneTime",
                    }))
                  }
                >
                  Frequency
                </button>
                <div className="flex gap-6 w-full">
                  <DonationRecurring />
                  <DonationRecurringDuration />
                </div>
              </div>
            )}

            {/* Custom Amount Input */}
            {formData.amount === "other" && (
              <div className="mb-4">
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Custom Amount *
                </Label>
                <Input
                  type="number"
                  name="customAmount"
                  value={formData.customAmount}
                  // onChange={handleInputChange}
                  required
                  min="1"
                  max="500000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount in ₹"
                />
              </div>
            )}

            {/* Selected Amount Display */}
            {/* {formData.amount && formData.amount !== "other" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800 font-medium">
                  Selected Amount:{" "}
                  <span className="text-lg">
                    ₹ {formatIndianCurrency(formData.amount)}
                  </span>
                </p>
              </div>
            )} */}
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={
                  !formData.amount ||
                  (formData.amount === "other" && !formData.customAmount)
                }
                className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 text-lg"
              >
                Give Back Now
                {/* {getFinalAmount()
                  ? `₹ ${formatIndianCurrency(getFinalAmount())}`
                  : "Select Amount"} */}
              </button>
            </div>

            <div className="rounded-lg p-4 text-center mt-2">
              <p className="text-gray-600 dark:text-gray-300">
                <strong>
                  Max. transaction limit: ₹5,00,000.Use multiple payments or
                  bank transfer for higher amounts.
                </strong>
              </p>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="dark:bg-[#1D1F24] p-6 rounded-lg border dark:border-[#344054]">
            <div className="space-y-6">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-3">
                  Mark this donation as Anonymous *
                </Label>
                <DonationAnonymous />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-3">
                  Display donated amount on Wall of Donors *
                </Label>
                <DonationWallDonars />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-3">
                  Need tax receipt *
                </Label>
                <DonationTaxReciepts />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DebitUPI;
