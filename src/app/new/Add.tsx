"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";

export default function Add() {
  const [emails, setEmails] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function addEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input) return;
    if (emails.includes(input)) {
      setError("Email already added");
      return;
    }
    setEmails([...emails, input]);
    setInput("");
    setError(null);
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <form onSubmit={addEmail}>
        <Label htmlFor="email">Add Emails</Label>
        <div className="flex gap-2">
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button variant="outline" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Button>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <h2 className="font-semibold text-lg pt-4">Added Emails:</h2>
      {emails.map((email) => (
        <div
          key={email}
          className="flex items-center w-full gap-2 justify-between"
        >
          <span>{email}</span>
          <Button
            variant="outline"
            size="icon"
            className="w-8"
            onClick={() => setEmails(emails.filter((e) => e !== email))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
      ))}
    </div>
  );
}
