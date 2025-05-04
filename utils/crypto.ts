/**
 * Reference: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto
 */

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export type EncryptionSchema = {
  encrypted: string;
  iv: string;
};

export async function generateKey(): Promise<CryptoKey> {
  const keyPair = window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  );

  return keyPair;
}

export async function encryptData(
  email: string,
  key: CryptoKey,
): Promise<EncryptionSchema> {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(email),
  );

  return {
    encrypted: Buffer.from(encrypted).toString("base64"),
    iv: Buffer.from(iv).toString("base64"),
  };
}

export async function decryptData(
  encryptedEmail: string,
  iv: string,
  key: CryptoKey,
): Promise<string> {
  const encryptedEmailData = Uint8Array.from(atob(encryptedEmail), (c) =>
    c.charCodeAt(0),
  );
  const ivData = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));

  const decryptedEmail = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivData },
    key,
    encryptedEmailData,
  );

  return decoder.decode(decryptedEmail);
}
