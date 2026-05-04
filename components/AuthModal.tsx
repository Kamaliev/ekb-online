"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { X, Loader2, AlertCircle } from "lucide-react";
import { useAuthModal } from "@/lib/store";
import { cn } from "@/lib/cn";

export default function AuthModal() {
  const { open, mode, closeModal, setMode } = useAuthModal();
  const t = useTranslations("AuthModal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeModal]);

  useEffect(() => {
    if (!open) {
      setError(null);
      setLoading(false);
      setEmail("");
      setPassword("");
      setName("");
    }
  }, [open]);

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password, mode, name }),
      });
      if (!res.ok) {
        setError(t("error"));
      }
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div
      onClick={onOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade_in"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-glow"
      >
        <button
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 text-muted hover:text-text transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-text mb-1">
          {mode === "login" ? t("login_title") : t("signup_title")}
        </h2>
        <p className="text-sm text-muted mb-6">{t("agreement")}</p>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "signup" && (
            <Field
              label={t("name")}
              type="text"
              value={name}
              onChange={setName}
              placeholder={t("name_placeholder")}
              autoComplete="name"
            />
          )}
          <Field
            label={t("email")}
            type="email"
            value={email}
            onChange={setEmail}
            placeholder={t("email_placeholder")}
            autoComplete="email"
            required
          />
          <Field
            label={t("password")}
            type="password"
            value={password}
            onChange={setPassword}
            placeholder={t("password_placeholder")}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
          />

          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full rounded-lg bg-accent px-4 py-3 font-medium text-bg transition",
              "hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed",
              "flex items-center justify-center gap-2"
            )}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading
              ? t("loading")
              : mode === "login"
                ? t("submit_login")
                : t("submit_signup")}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-accent hover:underline"
          >
            {mode === "login" ? t("switch_to_signup") : t("switch_to_login")}
          </button>
          {mode === "login" && (
            <button
              type="button"
              onClick={() => setError(t("error"))}
              className="text-muted hover:text-text"
            >
              {t("forgot")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm text-muted mb-1.5 block">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-lg border border-border bg-elevated px-3 py-2.5 text-text placeholder:text-muted/60 focus:border-accent focus:outline-none transition"
      />
    </label>
  );
}
