"use server";

export type JoinFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn(
      "[psc-form] RECAPTCHA_SECRET_KEY not set — skipping verification.",
    );
    return true;
  }

  if (!token) return false;

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }).toString(),
      cache: "no-store",
    });
    const data: { success?: boolean; score?: number } = await res.json();
    return Boolean(data.success) && (data.score ?? 0) >= 0.5;
  } catch (err) {
    console.error("[psc-form] reCAPTCHA verification failed", err);
    return false;
  }
}

export async function joinWhatsAppList(
  _prev: JoinFormState,
  formData: FormData,
): Promise<JoinFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const district = String(formData.get("district") ?? "").trim();
  const recaptchaToken = String(formData.get("recaptchaToken") ?? "").trim();

  console.log("[psc-form] processing submission", { name, phone, hasToken: !!recaptchaToken });

  if (name.length < 2) {
    console.log("[psc-form] validation failed: name too short");
    return { status: "error", message: "ദയവായി പേര് ശരിയായി നൽകുക." };
  }

  const normalizedPhone = phone
    .replace(/[\s\-\(\)\.]/g, "") // Remove common delimiters
    .replace(/^(\+91|91)/, ""); // Remove +91 or 91 prefix

  console.log("[psc-form] normalized phone", { original: phone, normalized: normalizedPhone });

  if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    console.log("[psc-form] validation failed: phone invalid");
    return {
      status: "error",
      message: "ദയവായി സാധുവായ 10 അക്ക നമ്പർ നൽകുക. (ഉദാ: 9845xxxxxx)",
    };
  }

  const ok = await verifyRecaptcha(recaptchaToken);
  if (!ok) {
    console.log("[psc-form] validation failed: recaptcha invalid");
    return {
      status: "error",
      message: "സുരക്ഷാ പരിശോധന പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    };
  }

  console.log("[psc-form] submmitting to finepher api", {
    name,
    phone: normalizedPhone,
    district,
  });

  try {
    const apiRes = await fetch("https://api.finepher.com/public/contact-forms/submit/contact", {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "x-recaptcha-token": recaptchaToken,
      },
      body: JSON.stringify({
        fullName: name,
        email: "aspirant@psc-victory.com", // Placeholder as our form doesn't collect email
        subject: "PSC Landing Page Leads",
        phoneNumber: normalizedPhone,
        company: district || "Kerala PSC Aspirant",
        message: `New lead from PSC Landing Page. District: ${district || "Not specified"}`,
      }),
      cache: "no-store",
    });

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      console.error("[psc-form] external api error", errorText);
    }
  } catch (err) {
    console.error("[psc-form] failed to call external api", err);
  }

  return {
    status: "success",
    message: `സ്വാഗതം, ${name}! ഞങ്ങൾ നിങ്ങളെ ഉടൻ ബന്ധപ്പെടും.`,
  };
}
