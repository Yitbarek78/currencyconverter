// src/App.jsx
import React from "react";
import Converter from "./components/Converter";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Converter />
    </div>
  );
}
