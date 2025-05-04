"use client";

import React, { ChangeEventHandler, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EmailForm({
  value,
  onChangeEmail,
  onReset,
  onSubmit,
}: {
  value: string;
  onChangeEmail: ChangeEventHandler<HTMLInputElement>;
  onReset: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} onReset={onReset} className="mb-8 space-y-2">
      <Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email.."
          className="h-12"
          onChange={onChangeEmail}
          value={value}
        />
      </Label>
      <div className="flex gap-1.5">
        <Button type="submit" className="flex-1 h-12">
          Encrypt Email
        </Button>
        <Button type="reset" variant="outline" className="h-12">
          Clear
        </Button>
      </div>
    </form>
  );
}
