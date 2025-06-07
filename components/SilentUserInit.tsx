"use client";

import { useEffect } from "react";

const SilentUserInit = () => {
  useEffect(() => {
    const hasFetched = localStorage.getItem("hasFetchedUser");

    if (!hasFetched) {
      fetch("/api/aku")
        .then(() => {
          localStorage.setItem("hasFetchedUser", "true");
        })
        .catch((err) => {
          console.error("Failed to create/get user:", err);
        });
    }
  }, []);

  return null;
};

export default SilentUserInit;
