import {
  DonationAnonymous,
  DonationTaxReciepts,
} from "@/src/components/debitForm/DebitRadio";
import { DonationSelectInput } from "@/src/components/debitForm/DonationSelectInput";
import DatePicker from "@/src/components/form/date-picker";
import Input from "@/src/components/ui/input/InputField";
// import Label from "@/src/components/ui/input/Label";
import React, { useState } from "react";

const ChequeDraft = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    panNumber: "",
    amount: "",
    payeeBank: "",
    chequeNumber: "",
    chequeDate: "",
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

  return (
    <div className="w-full mx-auto p-6 dark:bg-[#1D1F24] rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="mb-8">
        <div className="dark:bg-[#16181D] bg-white border-l-4 border-blue-500 p-4 rounded ">
          <p className="text-sm text-gray-700 leading-relaxed dark:text-white/90  ">
            All donations qualify for a 100% tax deduction, with tax receipts
            issued upon clearance of the cheque/draft, a process that typically
            takes 7-10 working days; please refer to the Tax Exemption tab for
            more information.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="dark:bg-[#1D1F24] p-6 rounded-lg border dark:border-[#344054] w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email *
                </label>
                <input
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Phone *
                </label>
                <input
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Category *
                </label>
                <DonationSelectInput />
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
                // onChange={handleInputChange}
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
                // onChange={handleInputChange}
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
                  // onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter bank name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cheque Number *
                </label>
                <input
                  type="text"
                  name="chequeNumber"
                  value={formData.chequeNumber}
                  // onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter cheque number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cheque Date *
              </label>
              <DatePicker
                id="date-picker"
                placeholder="Select a date"
                minDate={new Date()}
              />
            </div>
          </div>

          <div className="  dark:bg-[#1D1F24] p-6 rounded-lg border dark:border-[#344054] w-full">
            {/* Bank Details Section */}
            <div className="">
              <h4 className="text-lg font-semibold text-[#0157AE] mb-4">
                Payable to "Endowment Fund Account, IIT Kanpur"
              </h4>
              <div className="dark:text-white/90  space-y-2">
                <p className="font-medium">
                  Office of, Dean of Resources and Alumni
                </p>
                <p>Room no. 268 Faculty Building,</p>
                <p>Indian Institute of Technology Kanpur</p>
                <p>Kalyanpur Kanpur -208016 (UP), INDIA.</p>
                <p className="font-medium">Phone: +91- 512-6797289</p>
              </div>
              <div className="my-4 p-3 rounded">
                <p className="text-sm dark:text-white/90 font-medium">
                  Please send scanned copy of Cheque at dora_desk@iitk.ac.in
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="dark:bg-[#16181D] p-4 bg-white rounded-md">
                <p className="text-sm text-gray-700 leading-relaxed dark:text-white/90 ">
                  Annual-Gift Programme
                </p>
              </div>
            </div>
            {/* Annual Gift Programme Section */}
            <div className="mb-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Mark this donation as Anonymous *
                  </label>
                  <DonationAnonymous />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Need tax receipt *
                  </label>
                  <DonationTaxReciepts />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 text-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
      </form>
    </div>
  );
};

export default ChequeDraft;
