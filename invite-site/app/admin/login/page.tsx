"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: authErr } = await supabase.auth.signInWithPassword({ email, password });
      if (authErr) throw authErr;

      // Check if user is admin
      const { data: profile } = await supabase
        .from("admin_profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (!profile) {
        await supabase.auth.signOut();
        throw new Error("Not authorized as admin");
      }

      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#faf8f4" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full mb-4" style={{ background: "#9c7f5412" }}>
            <Lock size={22} style={{ color: "#9c7f54" }} />
          </div>
          <h1 className="font-serif text-2xl" style={{ color: "#1a1816" }}>Admin Login</h1>
          <p className="mt-1 text-[12px]" style={{ color: "#9a9189" }}>The Digital Inviters</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-lg p-3 text-[12px]" style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}>
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-medium tracking-[0.15em] uppercase mb-1.5" style={{ color: "#9c7f54" }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full rounded-lg border px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-[#9c7f54]"
              style={{ borderColor: "#e0d6c4", background: "#fffdfb", color: "#1a1816" }}
              placeholder="admin@thedigitalinviters.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-medium tracking-[0.15em] uppercase mb-1.5" style={{ color: "#9c7f54" }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full rounded-lg border px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-[#9c7f54]"
              style={{ borderColor: "#e0d6c4", background: "#fffdfb", color: "#1a1816" }}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-[13px] font-semibold tracking-wide transition-all disabled:opacity-50"
            style={{ background: "#1a1816", color: "#faf8f4" }}
          >
            {loading ? "Signing in..." : <>Sign In <ArrowRight size={13} /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
