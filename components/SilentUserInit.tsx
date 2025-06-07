"use client";

import { useEffect } from "react";

const SilentUserInit = () => {
  useEffect(() => {
    fetch("/api/aku").catch((err) => {
      console.error("Failed to create/get user:", err);
    });
  }, []);

  return null; // tidak menampilkan apa-apa
};

export default SilentUserInit;
