import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface EditorPanelProps {
  selectedElement: any;
  onUpdate: (updates: any) => void;
  onClose: () => void;
}

const EditorPanel = ({
  selectedElement,
  onUpdate,
  onClose,
}: EditorPanelProps) => {
  const [values, setValues] = useState<any>(null);

  useEffect(() => {
    setValues(selectedElement);
  }, [selectedElement]);

  if (!values) return null;

  const handleChange = (field: string, value: string) => {
    const updated = { ...values, [field]: value };
    setValues(updated);
    onUpdate({ [field]: value });
  };

  const handleStyleChange = (style: string, value: string) => {
    const updated = {
      ...values,
      styles: {
        ...values.styles,
        [style]: value,
      },
    };
    setValues(updated);
    onUpdate({ styles: { [style]: value } });
  };

  return (
    <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 animate-fade-in fade-in ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Edit Element</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <div className="space-y-4 text-black">
        {/* Text */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Tag Content
          </label>
          <textarea
            value={values.text}
            onChange={(e) => handleChange("text", e.target.value)}
            className="w-full text-sm p-2 border border-gray-400 rounded-md"
          />
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Class Name
          </label>
          <input
            type="text"
            value={values.className || ""}
            onChange={(e) => handleChange("className", e.target.value)}
            className="w-full text-sm p-2 border border-gray-400 rounded-md"
          />
        </div>

        {/* Padding & Margin */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={values.styles.padding}
            onChange={(e) => handleStyleChange("padding", e.target.value)}
            placeholder="Padding"
            className="text-sm p-2 border border-gray-400 rounded-md"
          />
          <input
            type="text"
            value={values.styles.margin}
            onChange={(e) => handleStyleChange("margin", e.target.value)}
            placeholder="Margin"
            className="text-sm p-2 border border-gray-400 rounded-md"
          />
        </div>

        {/* Font Size */}
        <input
          type="text"
          value={values.styles.fontSize}
          onChange={(e) => handleStyleChange("fontSize", e.target.value)}
          placeholder="Font Size"
          className="w-full text-sm p-2 border border-gray-400 rounded-md"
        />

        {/* Colors */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="color"
            value={
              values.styles.backgroundColor === "rgba(0,0,0,0)"
                ? "#ffffff"
                : values.styles.backgroundColor
            }
            onChange={(e) =>
              handleStyleChange("backgroundColor", e.target.value)
            }
            className="h-10 rounded-md border border-gray-300"
          />

          <input
            type="color"
            value={values.styles.color}
            onChange={(e) => handleStyleChange("color", e.target.value)}
            className="h-10 rounded-md border border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;