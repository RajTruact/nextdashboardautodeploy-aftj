"use client";
import React, { useState } from "react";
import * as yup from "yup";
import Button from "@/src/components/ui/button/Button";
import Input from "@/src/components/ui/input/InputField";
import Label from "@/src/components/ui/input/Label";
import TextArea from "@/src/components/ui/input/TextArea";
import { EyeClosed, EyeIcon } from "lucide-react";
import DatePicker from "@/src/components/form/date-picker";
import DropzoneComponent from "@/src/components/form/form-elements/DropZone";
import CheckboxComponents from "@/src/components/form/form-elements/CheckboxComponents";
import RadioButtons from "@/src/components/form/form-elements/RadioButtons";
import SignatureField from "@/src/components/form/SignatureField";

// Define validation schema
const formSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),

  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),

  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
      "Please enter a valid email address"
    ),

  phone: yup
    .string()
    .min(10, "Minimum 10 numbers allowed")
    .max(10, "Maximum 10 numbers allowed")
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      "Please enter a valid phone number"
    ),

  subject: yup
    .string()
    .required("Subject is required")
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  // File upload validation
  files: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        size: yup.number().required(),
        type: yup.string().required(),
      })
    )
    .max(5, "Maximum 5 files allowed")
    .test("fileSize", "File size must be less than 10MB", (files) => {
      if (!files || files.length === 0) return true; // Optional field
      return files.every((file) => file.size <= 10 * 1024 * 1024);
    })
    .test("fileType", "Unsupported file format", (files) => {
      if (!files || files.length === 0) return true; // Optional field
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      return files.every((file) => allowedTypes.includes(file.type));
    }),

  // Date picker validation
  selectedDate: yup
    .date()
    .nullable()
    .required("Date is required")
    .min(new Date(), "Date cannot be in the past"),

  // Checkbox validation
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),

  // Signature validation
  signature: yup
    .string()
    .required("Signature is required")
    .test("signature-valid", "Please provide a valid signature", (value) => {
      if (!value) return false;

      // Check if it's a valid data URL
      if (!value.startsWith("data:image/")) return false;

      // Check if it contains actual Base64 data (not just the empty canvas)
      const base64Data = value.split(",")[1];
      if (!base64Data || base64Data.length < 100) {
        return false; // Too short to be a meaningful signature
      }

      return true;
    })
    .test("signature-size", "Signature appears to be too simple", (value) => {
      if (!value) return false;

      // Check Base64 data length to ensure it's not empty
      const base64Data = value.split(",")[1];
      return base64Data && base64Data.length > 500; // Minimum signature complexity
    }),
});

export default function FormPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
    password: "",
    files: [],
    selectedDate: null,
    termsAccepted: false,
    signature: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    try {
      if (!e?.target) {
        console.warn("Invalid event received in handleChange");
        return;
      }

      const { name, value, type, checked } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    } catch (error) {
      console.error("Error in handleChange:", error);
    }
  };

  // Handle file uploads
  const handleFilesChange = (files) => {
    setFormData((prev) => ({
      ...prev,
      files: files,
    }));

    // Clear file errors when new files are selected
    if (errors.files) {
      setErrors((prev) => ({
        ...prev,
        files: "",
      }));
    }
  };

  // Handle date selection
  const handleDateChange = (dates, currentDateString) => {
    const selectedDate = dates ? new Date(dates) : null;

    setFormData((prev) => ({
      ...prev,
      selectedDate: selectedDate,
    }));

    // Clear date errors when a new date is selected
    if (errors.selectedDate) {
      setErrors((prev) => ({
        ...prev,
        selectedDate: "",
      }));
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (isChecked) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: isChecked,
    }));

    // Clear checkbox errors when changed
    if (errors.termsAccepted) {
      setErrors((prev) => ({
        ...prev,
        termsAccepted: "",
      }));
    }
  };

  // Handle signature change
  const handleSignatureChange = (signatureData) => {
    setFormData((prev) => ({
      ...prev,
      signature: signatureData,
    }));

    // Clear signature errors when signature is added
    if (errors.signature) {
      setErrors((prev) => ({
        ...prev,
        signature: "",
      }));
    }
  };

  const validateField = async (name, value) => {
    try {
      await formSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [name]: error.message }));
      }
    }
  };

  const handleBlur = (e) => {
    try {
      if (!e?.target) {
        console.warn("Invalid event received in handleBlur");
        return;
      }

      const { name, value } = e.target;
      validateField(name, value);
    } catch (error) {
      console.error("Error in handleBlur:", error);
    }
  };
  // In your FormPage component, update the handleSubmit function:

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate all fields
      await formSchema.validate(formData, { abortEarly: false });

      // Clear any existing errors
      setErrors({});

      // Simple logging that definitely works
      console.log("✅ FORM SUBMISSION STARTED");
      console.log("📝 Basic Form Data:", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        subject: formData.subject,
        termsAccepted: formData.termsAccepted,
        signatureExists: !!formData.signature,
        signatureLength: formData.signature?.length || 0,
      });

      // Check signature specifically
      if (formData.signature) {
        console.log("🖊️ SIGNATURE DATA:");
        console.log("  - Exists: YES");
        console.log("  - Total length:", formData.signature.length);
        console.log(
          "  - Starts with data:image:",
          formData.signature.startsWith("data:image")
        );

        // Simple Base64 check
        const hasComma = formData.signature.includes(",");
        console.log("  - Contains comma (has Base64):", hasComma);

        if (hasComma) {
          const base64Part = formData.signature.split(",")[1];
          console.log("  - Base64 length:", base64Part?.length || 0);
          console.log(
            "  - Base64 preview:",
            base64Part?.substring(0, 30) + "..."
          );
        }
      } else {
        console.log("🖊️ SIGNATURE DATA: NO SIGNATURE");
      }

      // Here you would typically send the data to your backend
      console.log("🚀 Simulating API call...");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);

      // Reset form after submission
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          description: "",
          password: "",
          files: [],
          selectedDate: null,
          termsAccepted: false,
          signature: null,
        });
      }, 3000);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);

        console.log("❌ VALIDATION ERRORS:", newErrors);
      } else {
        console.error("💥 SUBMISSION ERROR:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 mb-5">
        {isSubmitted ? (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <svg
              className="w-12 h-12 text-green-500 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white/90 mb-1">
              Thank You!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your request has been submitted with your digital signature.
            </p>
          </div>
        ) : (
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Personal Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Your First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Your Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>
            {/* Contact & Security Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 5555 0000000"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Brief description of your issue"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeClosed className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>
            {/* Description & File Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="description">Description *</Label>
                <TextArea
                  id="description"
                  name="description"
                  placeholder="Please provide detailed information"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="min-h-[380px] !py-2"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>
              <div>
                <DropzoneComponent
                  onFilesChange={handleFilesChange}
                  maxFiles={5}
                  maxSize={10 * 1024 * 1024} // 10MB in bytes
                  acceptedFiles={[
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  ]}
                />
                {errors.files && (
                  <p className="mt-1 text-sm text-red-500">{errors.files}</p>
                )}
                {formData.files.length > 0 && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {formData.files.length} file(s) selected
                  </p>
                )}
              </div>
            </div>
            {/* Date, Terms & Radio Buttons Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <DatePicker
                  id="date-picker"
                  label="Date Picker *"
                  placeholder="Select a date"
                  value={formData.selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                />
                {errors.selectedDate && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.selectedDate}
                  </p>
                )}
              </div>
              <div>
                <CheckboxComponents
                  checked={formData.termsAccepted}
                  onChange={handleCheckboxChange}
                  label="By accessing this website we assume you accept these terms and conditions.*"
                />
                {errors.termsAccepted && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.termsAccepted}
                  </p>
                )}
              </div>

              <div>
                <RadioButtons />
              </div>
            </div>
            {/* Signature Section */}
            <div className="grid grid-cols-1 gap-5">
              <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20">
                <SignatureField
                  label="Digital Signature *"
                  required={true}
                  value={formData.signature}
                  onChange={handleSignatureChange}
                  error={errors.signature}
                  width={400}
                  height={150}
                  validate={true}
                  className="w-full"
                />
                {errors.signature && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.signature}
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Please provide your signature using your mouse, touchpad, or
                  touchscreen device.
                </p>
              </div>
            </div>
            // Add this anywhere in your form
            {formData.signature && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border">
                <p className="font-medium mb-2">Get Complete Base64:</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(formData.signature);
                      alert("Complete Base64 copied to clipboard!");
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    Copy Base64 to Clipboard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const blob = new Blob([formData.signature], {
                        type: "text/plain",
                      });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = "signature-base64.txt";
                      link.click();
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                  >
                    Download as .txt File
                  </button>
                </div>
              </div>
            )}
            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <Button type="submit" size="sm" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
