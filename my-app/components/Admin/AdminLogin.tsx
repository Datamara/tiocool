"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = {};

export default function AdminLogin() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="mt-10 space-y-4">
      <input
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="Correo"
        className="w-full border border-black/15 bg-white px-4 py-3 font-display text-sm font-bold text-black outline-none placeholder:text-black/35 focus:border-royal"
      />
      <input
        type="password"
        name="password"
        required
        autoComplete="current-password"
        placeholder="Contraseña"
        className="w-full border border-black/15 bg-white px-4 py-3 font-display text-sm font-bold text-black outline-none placeholder:text-black/35 focus:border-royal"
      />
      {state.error ? (
        <p className="font-display text-xs font-bold uppercase tracking-wide text-red-600">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-royal px-6 py-4 font-display text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-azure disabled:opacity-50"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
