import React from "react";

import { Textarea } from "@nextui-org/react";

export default function Output() {
  return (
    <div>
      <Textarea
        isDisabled
        label="Description"
        labelPlacement="outside"
        placeholder="Enter your description"
        defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
        className="w-full"
      />
    </div>
  );
}
