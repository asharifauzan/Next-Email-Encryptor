"use client";

import React, { FormEvent, useState } from "react";

// Components
import EmailForm from "@/components/custom/EmailForm";
import EncryptionStatus from "@/components/custom/EncryptionStatus";

// Utilities
import {
  decryptData,
  encryptData,
  generateKey,
  type EncryptionSchema,
} from "@/utils/crypto";

export default function EmailEncryptorPage() {
  const [email, setEmail] = useState<string>("");
  const [encryptedEmailData, setEncryptedEmailData] =
    useState<EncryptionSchema | null>(null);
  const [decryptedEmailData, setDecrypytedEmailData] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate email is filled
    if (!email) {
      alert("Email is required");
      return;
    }

    // Generate and get public key
    const key: CryptoKey = await generateKey();

    // Encrypt Email
    const enctyptedEmail = await encryptData(email, key);
    setEncryptedEmailData(enctyptedEmail);

    // Decrypt Email
    const decryptedEmail = await decryptData(
      enctyptedEmail.encrypted,
      enctyptedEmail.iv,
      key,
    );
    setDecrypytedEmailData(decryptedEmail);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-12 text-center text-5xl font-bold">
        Encrypt your email, try it!
      </h1>

      <EmailForm
        value={email}
        onChangeEmail={(e) => setEmail(e.target.value)}
        onReset={() => setEmail("")}
        onSubmit={handleSubmit}
      />

      <EncryptionStatus
        encryptedData={encryptedEmailData?.encrypted as string}
        decryptedData={decryptedEmailData}
      />
    </div>
  );
}
