import React, { useState } from "react";

const BankTransfer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    panNumber: "",
    amount: "",
    payeeBank: "",
    transactionRef: "",
    transactionDate: "",
    isAnonymous: "no",
    taxReceipt: "email",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const bankDetails = [
    { label: "Account Name", value: "Endowment Fund Account, IIT Kanpur" },
    { label: "Account Number", value: "10426004735" },
    { label: "Branch Name", value: "IIT Kanpur" },
    { label: "Bank Name", value: "SBI" },
    { label: "IFS Code", value: "SBIN0001161" },
    { label: "SWIFT Code", value: "SBININBB499" },
  ];

  return (
    <div className="w-full mx-auto p-6 dark:bg-[#1D1F24] rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="mb-8">
        <div className="dark:bg-[#16181D] bg-white border-l-4 border-blue-500 p-4 rounded ">
          <p className="text-sm text-gray-700 leading-relaxed dark:text-white/90  ">
            All donations qualify for a 100% tax deduction, with tax receipts
            issued upon receipt of funds, typically within 3-4 working days;
            please refer to the Tax Exemption tab for more details.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Personal & Transaction Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="individual">Individual</option>
                <option value="corporate">Corporate</option>
                <option value="trust">Trust/Foundation</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
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

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter donation amount in ₹"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payee Bank *
              </label>
              <input
                type="text"
                name="payeeBank"
                value={formData.payeeBank}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your bank name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Reference Number *
              </label>
              <input
                type="text"
                name="transactionRef"
                value={formData.transactionRef}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter transaction reference number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of transaction *
            </label>
            <input
              type="date"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Bank Transfer Details Section */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-green-800 mb-4">
            Bank Transfer Details : NEFT/RTGS
          </h4>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <tbody>
                {bankDetails.map((detail, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-3 font-medium text-gray-700 border-r border-gray-200 w-1/3">
                      {detail.label}
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-mono">
                      {detail.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800 font-medium">
              Please ensure you use the correct account details for NEFT/RTGS
              transfer
            </p>
          </div>
        </div>

        {/* Annual Gift Programme Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Annual-Gift-Programme
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
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
          >
            Submit Transfer Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default BankTransfer;
