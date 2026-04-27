"use client";

import { useEffect, useState } from "react";
import { UserCheck } from "lucide-react";

const API_URL = "https://api.finepher.com/public/contact-forms/count/psc-enquiry";

export default function RegistrationCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          // We add the real count to our base social proof number
          setCount(data.count);
        }
      } catch (err) {
        console.error("Failed to fetch registration count:", err);
      }
    }

    fetchCount();
    // Refresh count every 30 seconds
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!count) return null;


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
