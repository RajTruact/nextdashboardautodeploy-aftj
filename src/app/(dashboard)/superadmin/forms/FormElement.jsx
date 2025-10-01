import CheckboxComponents from "@/src/components/form/form-elements/CheckboxComponents";
import DefaultInputs from "@/src/components/form/form-elements/DefaultInputs";
import DropzoneComponent from "@/src/components/form/form-elements/DropZone";
import FileInputExample from "@/src/components/form/form-elements/FileInputExample";
import InputGroup from "@/src/components/form/form-elements/InputGroup";
import InputStates from "@/src/components/form/form-elements/InputStates";
import RadioButtons from "@/src/components/form/form-elements/RadioButtons";
import SelectInputs from "@/src/components/form/form-elements/SelectInputs";
import TextAreaInput from "@/src/components/form/form-elements/TextAreaInput";
import ToggleSwitch from "@/src/components/form/form-elements/ToggleSwitch";
import React from "react";

export const metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function FormElements() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs />
          {/* <SelectInputs /> */}
          {/* <TextAreaInput /> */}
          {/* <InputStates /> */}
        </div>
        <div className="space-y-6">
          <InputGroup />
          {/* <FileInputExample /> */}
          <CheckboxComponents />
          {/* <RadioButtons /> */}
          {/* <ToggleSwitch /> */}
          <DropzoneComponent />
        </div>
      </div>
    </div>
  );
}
