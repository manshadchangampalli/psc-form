"use client";

import { useEffect, useState } from "react";
import { UserCheck } from "lucide-react";

const BASE_COUNT = 87;
const STORAGE_KEY = "psc_submitted_count";

export default function RegistrationCounter() {
  const [count, setCount] = useState(BASE_COUNT);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed)) setCount(parsed);
    }

    // Optional: Listen for storage events (if multiple tabs open)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setCount(parseInt(e.newValue, 10));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="flex items-center gap-5 rounded-2xl border border-psc-200 bg-white p-2 shadow-elegant">
      <div className="flex h-20 w-14 items-center justify-center rounded-xl bg-gradient-hero text-white">
        <UserCheck className="h-7 w-7" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-psc-500">{count}</span>
          <span className="text-sm font-bold text-black">/ 100</span>
        </div>
        <p className="text-sm font-medium text-psc-800">
          ഇതുവരെ രജിസ്റ്റർ ചെയ്തവർ <br /> നിങ്ങളുടെ സീറ്റ് ഇപ്പോൾ തന്നെ ബുക്ക് ചെയ്യൂ!
        </p>
      </div>
    </div>
  );
}
