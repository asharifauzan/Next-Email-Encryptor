import React from "react";

// Components
import CodeBlock from "./CodeBlock";

type Props = {
  encryptedData: string;
  decryptedData: string;
};

export default function EncryptionStatus({
  encryptedData,
  decryptedData,
}: Props) {
  return (
    <div className="space-y-2">
      {/* Show result of Encrypted Email */}
      {encryptedData && (
        <>
          <h2 className="text-xl font-bold">Encrypted Email:</h2>
          <CodeBlock>{encryptedData}</CodeBlock>
        </>
      )}

      {/* Show result of Decrypted Email */}
      {decryptedData && (
        <>
          <h2 className="text-xl font-bold">Decrypted Email:</h2>
          <CodeBlock>{decryptedData}</CodeBlock>
        </>
      )}

      {/* Show result of last action */}
      {/* {encryptedEmailData?.encrypted && decryptedEmailData && (
        <p className="text-gray-500">
          Last action {decryptedEmailData} on{" "}
          <span className="font-bold italic">{new Date().toString()}</span>
        </p>
      )} */}
    </div>
  );
}
