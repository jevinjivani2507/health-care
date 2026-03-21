"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Envelope, Lock, User, Spinner } from "@phosphor-icons/react";

type Mode = "login" | "register";

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isRegister = mode === "register";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        if (password.length < 6) {
          setError("Password must be at least 6 characters.");
          return;
        }
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (name.trim()) {
          await updateProfile(user, { displayName: name.trim() });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      if (message.includes("email-already-in-use")) {
        setError("An account with this email already exists.");
      } else if (message.includes("weak-password")) {
        setError("Password must be at least 6 characters.");
      } else if (
        message.includes("invalid-credential") ||
        message.includes("wrong-password") ||
        message.includes("user-not-found")
      ) {
        setError("Invalid email or password.");
      } else if (message.includes("invalid-email")) {
        setError("Please enter a valid email address.");
      } else if (message.includes("too-many-requests")) {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(isRegister ? "login" : "register");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isRegister && (
        <Field>
          <label className="text-sm font-medium text-foreground">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Dr. Jane Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10"
            />
          </div>
        </Field>
      )}

      <Field>
        <label className="text-sm font-medium text-foreground">Email</label>
        <div className="relative">
          <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </Field>

      <Field>
        <label className="text-sm font-medium text-foreground">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            required
            minLength={6}
          />
        </div>
        {isRegister && (
          <p className="text-[11px] text-muted-foreground mt-1">
            Must be at least 6 characters
          </p>
        )}
      </Field>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Spinner className="mr-2 h-4 w-4 animate-spin" />
            {isRegister ? "Creating account..." : "Signing in..."}
          </>
        ) : isRegister ? (
          "Create Account"
        ) : (
          "Sign In"
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={toggleMode}
          className="text-primary hover:underline font-medium"
        >
          {isRegister ? "Sign in" : "Create one"}
        </button>
      </p>
    </form>
  );
}
