"use client";
import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle,
  Download,
  FileText,
  X,
} from "lucide-react";
import {
  isSignatureValid,
  extractBase64FromDataURL,
  getBase64FileSize,
  downloadSignature,
  getSignatureInfo,
} from "@/src/utils/signatureUtils";

const SignatureField = ({
  label = "Signature",
  required = false,
  value = null,
  onChange,
  onBlur,
  error = "",
  width = 400,
  height = 150,
  validate = true,
  className = "",
  showFileInfo = true,
}) => {
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [signature, setSignature] = useState(value);
  const [isTouched, setIsTouched] = useState(false);

  const handleSaveSignature = (signatureData) => {
    console.group("💾 Saving Signature");

    const signatureInfo = getSignatureInfo(signatureData);
    console.log("📊 Signature Info:", signatureInfo);

    if (isSignatureValid(signatureData)) {
      setSignature(signatureData);
      if (onChange) {
        onChange(signatureData);
      }
      setShowSignaturePad(false);
      setIsTouched(true);
      console.log("✅ Signature saved successfully");
    } else {
      console.warn("❌ Signature validation failed");
    }

    console.groupEnd();
  };

  const handleRemoveSignature = () => {
    console.log("🗑️ Removing signature");
    setSignature(null);
    if (onChange) {
      onChange(null);
    }
    setIsTouched(true);
  };

  const handleDownloadSignature = () => {
    if (signature) {
      downloadSignature(signature, `signature-${Date.now()}`);
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
    if (onBlur) {
      onBlur();
    }
  };

  const showError = validate && required && isTouched && !signature;
  const isValidSignature = signature && isSignatureValid(signature);

  // Get file info for display
  const getFileInfo = () => {
    if (!signature) return null;

    const base64Data = extractBase64FromDataURL(signature);
    const fileSize = getBase64FileSize(base64Data);
    const fileSizeKB = (fileSize / 1024).toFixed(2);

    return {
      size: fileSizeKB,
      dimensions: `${width}×${height}px`,
      format: "PNG",
    };
  };

  const fileInfo = getFileInfo();

  return (
    <div className={`w-full ${className}`}>
      {/* Signature Display/Input Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg transition-colors cursor-pointer bg
          ${
            showError
              ? "border-brand-300 bg-brand-500"
              : isValidSignature
              ? "border-brand-300 bg-brand-50"
              : "border-brand-300 bg-brand-100 hover:border-gray-400"
          }
        `}
        onClick={() => setShowSignaturePad(true)}
        onBlur={handleBlur}
        tabIndex={0}
      >
        {isValidSignature ? (
          <div className="relative p-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Signature Preview */}
              <img
                src={signature}
                alt="Signature"
                className="max-h-32 object-contain border border-gray-200 rounded"
              />

              {/* File Information */}
              {/* {showFileInfo && fileInfo && (
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      Signature Details
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>
                      Size: <strong>{fileInfo.size} KB</strong>
                    </div>
                    <div>
                      Format: <strong>{fileInfo.format}</strong>
                    </div>
                    <div>
                      Dimensions: <strong>{fileInfo.dimensions}</strong>
                    </div>
                    <div>
                      Status: <strong className="text-green-600">Valid</strong>
                    </div>
                  </div>
                </div>
              )} */}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadSignature();
                }}
                className="p-1 bg-white rounded shadow-sm hover:bg-gray-100 transition-colors"
                title="Download signature"
              >
                <Download className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSignaturePad(true);
                }}
                className="p-1 bg-white rounded shadow-sm hover:bg-gray-100 transition-colors"
                title="Edit signature"
              >
                <Edit2 className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveSignature();
                }}
                className="p-1 bg-white rounded shadow-sm hover:bg-red-100 transition-colors"
                title="Remove signature"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
              <Edit2 className="w-6 h-6 text-gray-500" />
            </div>
            <p className="text-gray-600 font-medium">Click to sign</p>
            <p className="text-sm text-gray-500 mt-1">
              {required
                ? "Signature is required"
                : "Add your signature (optional)"}
            </p>
          </div>
        )}
      </div>

      {/* Validation States */}
      <div className="mt-2">
        {showError && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>Signature is required</span>
          </div>
        )}

        {isValidSignature && !showError && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span>Signature provided ({fileInfo?.size} KB)</span>
          </div>
        )}

        {signature && !isValidSignature && (
          <div className="flex items-center gap-2 text-sm text-amber-600">
            <AlertCircle className="w-4 h-4" />
            <span>Signature appears to be incomplete. Please sign again.</span>
          </div>
        )}
      </div>

      {/* Signature Pad Modal */}
      {showSignaturePad && (
        <SignaturePadModal
          onSave={handleSaveSignature}
          onClose={() => setShowSignaturePad(false)}
          width={width}
          height={height}
          required={required}
          validate={validate}
        />
      )}
    </div>
  );
};

// Separate modal component for better organization
const SignaturePadModal = ({
  onSave,
  onClose,
  width,
  height,
  required,
  validate,
}) => {
  const sigCanvas = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const clear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setIsEmpty(true);
    }
  };

  const save = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const signatureData = sigCanvas.current.toDataURL("image/png");
      onSave(signatureData);
    }
  };

  const handleBeginDraw = () => {
    setIsEmpty(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Sign Here</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: Math.min(width, window.innerWidth - 40),
                height: height,
                className: "sig-canvas bg-white w-full",
              }}
              onBegin={handleBeginDraw}
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border-t">
          <button
            onClick={clear}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Clear
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={save}
              disabled={isEmpty}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Save Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureField;
