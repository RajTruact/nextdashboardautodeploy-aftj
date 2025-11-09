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
    { value: "1000", label: "₹ 1,000" },
    { value: "2000", label: "₹ 2,000" },
    { value: "5000", label: "₹ 5,000" },
    { value: "10000", label: "₹ 10,000" },
    { value: "25000", label: "₹ 25,000" },
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
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700 leading-relaxed">
            Please note that all donations are eligible for a 100% tax
            deduction, and tax receipts will be issued upon receipt of funds, a
            process that generally takes 3-4 working days.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Affiliation *
              </label>
              <select
                name="affiliation"
                value={formData.affiliation}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Affiliation</option>
                <option value="alumni">Alumni</option>
                <option value="faculty">Faculty</option>
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PAN NUMBER *
            </label>
            <span className="block text-xs text-gray-500 mb-2">
              (Mandatory Field for 80G certificate)
            </span>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleInputChange}
              required
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              title="Please enter a valid PAN number (e.g., ABCDE1234F)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
              placeholder="Enter PAN Number"
            />
          </div>
        </div>

        {/* Donation Amount Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Annual-Gift-Programme
          </h3>

          {/* Donation Type Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-6">
            <button
              type="button"
              className={`flex-1 py-3 px-4 font-medium transition-colors ${
                formData.donationType === "oneTime"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
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
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, donationType: "recurring" }))
              }
            >
              Recurring
            </button>
          </div>

          {/* Amount Options */}
          <div className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(formData.donationType === "oneTime"
                ? oneTimeAmounts
                : recurringAmounts
              ).map((amount) => (
                <button
                  key={amount.value}
                  type="button"
                  className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${
                    formData.amount === amount.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-700 hover:border-blue-300"
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
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Frequency *
              </label>
              <div className="flex gap-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="frequency"
                    value="quarterly"
                    checked={formData.frequency === "quarterly"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Quarterly</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="frequency"
                    value="5years"
                    checked={formData.frequency === "5years"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">5 Years</span>
                </label>
              </div>
            </div>
          )}

          {/* Custom Amount Input */}
          {formData.amount === "other" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Custom Amount *
              </label>
              <input
                type="number"
                name="customAmount"
                value={formData.customAmount}
                onChange={handleInputChange}
                required
                min="1"
                max="500000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount in ₹"
              />
            </div>
          )}

          {/* Selected Amount Display */}
          {formData.amount && formData.amount !== "other" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-800 font-medium">
                Selected Amount:{" "}
                <span className="text-lg">
                  ₹ {formatIndianCurrency(formData.amount)}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Transaction Limit Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-800">
            <strong>Max. transaction limit: ₹5,00,000.</strong> Use multiple
            payments or bank transfer for higher amounts.
          </p>
        </div>

        {/* Preferences Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Donation Preferences
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Mark this donation as Anonymous *
              </label>
              <div className="flex gap-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isAnonymous"
                    value="yes"
                    checked={formData.isAnonymous === "yes"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isAnonymous"
                    value="no"
                    checked={formData.isAnonymous === "no"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Display donated amount on Wall of Donors *
              </label>
              <div className="flex gap-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="displayAmount"
                    value="yes"
                    checked={formData.displayAmount === "yes"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="displayAmount"
                    value="no"
                    checked={formData.displayAmount === "no"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Need tax receipt *
              </label>
              <div className="flex gap-6 flex-wrap">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="taxReceipt"
                    value="email"
                    checked={formData.taxReceipt === "email"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Email</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="taxReceipt"
                    value="hardcopy"
                    checked={formData.taxReceipt === "hardcopy"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Hard Copy</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="taxReceipt"
                    value="both"
                    checked={formData.taxReceipt === "both"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Both</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={
              !formData.amount ||
              (formData.amount === "other" && !formData.customAmount)
            }
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
          >
            Give Back Now -{" "}
            {getFinalAmount()
              ? `₹ ${formatIndianCurrency(getFinalAmount())}`
              : "Select Amount"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DebitUPI;
