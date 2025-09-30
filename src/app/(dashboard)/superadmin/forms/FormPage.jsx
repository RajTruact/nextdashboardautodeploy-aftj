"use client";
import React, { useState } from "react";
import * as yup from "yup";
import Button from "@/src/components/ui/button/Button";
import Input from "@/src/components/ui/input/InputField";
import Label from "@/src/components/ui/input/Label";
import TextArea from "@/src/components/ui/input/TextArea";

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
    .email("Please enter a valid email address"),

  phone: yup
    .string()
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
});

export default function FormPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
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
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate all fields
      await formSchema.validate(formData, { abortEarly: false });

      // Clear any existing errors
      setErrors({});

      // Here you would typically send the data to your backend
      console.log("Support request submitted:", formData);
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
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6">
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
              Your request has been submitted. We'll get back to you soon.
            </p>
          </div>
        ) : (
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit}
            noValidate
          >
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
                  error={errors.firstName}
                />
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
                  error={errors.lastName}
                />
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
                  error={errors.email}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.phone}
                />
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
                  error={errors.subject}
                />
              </div>
            </div>

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
                error={errors.description}
              />
            </div>

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
