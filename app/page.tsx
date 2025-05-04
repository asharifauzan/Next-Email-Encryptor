"use client";

import React, { useState, useTransition } from "react";

// Components
import CodeBlock from "@/components/custom/CodeBlock";
import EncryptionStatus from "@/components/custom/EncryptionStatus";
import ResultLoading from "@/components/custom/ResultLoading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Utilities
import {
  generateKey,
  encryptData,
  decryptData,
  type EncryptionSchema,
} from "@/utils/crypto";

type ResponseAPI = {
  id?: number;
  name?: string;
  email?: string;
  publicKey?: string;
};

export default function HomePage() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<ResponseAPI | null>(null);
  const [encryptedEmailData, setEncryptedEmailData] =
    useState<EncryptionSchema | null>(null);
  const [decryptedEmailData, setDecrypytedEmailData] = useState<string>("");

  const encryptEmail = async (email: string) => {
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

  const fetchData = () => {
    startTransition(async () => {
      const response = await fetch("/api/user");
      const json = await response.json();
      setData(json);

      // Encrypt email and show the status
      encryptEmail(json.email);

      // Simulate 3s loading
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 3000);
      });
    });
  };

  const renderLoading = () => {
    return (
      <div className="space-y-8">
        <ResultLoading />
        <div className="space-y-2">
          <ResultLoading />
          <ResultLoading />
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center gap-1.5">
        <Button type="button" onClick={() => fetchData()} disabled={isPending}>
          Get User (simulate 3s loading)
        </Button>

        <p>
          Or try manual encryption{" "}
          <Link
            href="/email-encryptor"
            target="_blank"
            className="text-blue-500 hover:text-blue-700"
          >
            here
          </Link>
        </p>
      </div>

      {isPending ? (
        // Render skeleton during fetch api and encrypt an email
        renderLoading()
      ) : (
        // Render result after the loading is finished
        <>
          {data && (
            <div>
              <h2 className="text-xl font-bold">Response API:</h2>
              <CodeBlock>{JSON.stringify(data)}</CodeBlock>
            </div>
          )}

          <EncryptionStatus
            encryptedData={encryptedEmailData?.encrypted as string}
            decryptedData={decryptedEmailData}
          />
        </>
      )}
    </div>
  );
}
