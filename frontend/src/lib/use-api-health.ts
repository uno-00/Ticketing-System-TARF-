import { useEffect, useState } from "react";

export type ApiHealthStatus = "checking" | "ok" | "down";

export function useApiHealth() {
  const [status, setStatus] = useState<ApiHealthStatus>("checking");

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        const res = await fetch("/api/health", { cache: "no-store" });
        if (!cancelled) setStatus(res.ok ? "ok" : "down");
      } catch {
        if (!cancelled) setStatus("down");
      }
    };

    void check();
    return () => {
      cancelled = true;
    };
  }, []);

  return status;
}
