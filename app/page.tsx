"use client";

import React, { FormEvent, useState } from "react";
import EmailForm from "@/components/custom/EmailForm";
import CodeBlock from "@/components/custom/CodeBlock";
import {
  decryptData,
  encryptData,
  generateKey,
  EncryptionSchema,
} from "@/utils/crypto";

export default function HomePage() {
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

      <div className="space-y-2">
        {/* Show result of Encrypted Email */}
        {encryptedEmailData?.encrypted && (
          <>
            <h2 className="text-xl font-bold">Encrypted Email:</h2>
            <CodeBlock>{encryptedEmailData?.encrypted}</CodeBlock>
          </>
        )}

        {/* Show result of Decrypted Email */}
        {decryptedEmailData && (
          <>
            <h2 className="text-xl font-bold">Decrypted Email:</h2>
            <CodeBlock>{decryptedEmailData}</CodeBlock>
          </>
        )}

        {/* Show result of last action */}
        {encryptedEmailData?.encrypted && decryptedEmailData && (
          <p className="text-gray-500">
            Last action {decryptedEmailData} on{" "}
            <span className="font-bold italic">{new Date().toString()}</span>
          </p>
        )}
      </div>
    </div>
  );
}
