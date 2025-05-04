import React, { type PropsWithChildren } from "react";

export default function CodeBlock({ children }: PropsWithChildren) {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  );
}
