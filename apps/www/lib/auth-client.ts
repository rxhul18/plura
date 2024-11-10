import { createAuthClient } from "better-auth/react";
import { multiSessionClient } from "better-auth/client/plugins";
<<<<<<< HEAD
import { Http2ServerRequest } from "http2";
const BaseDomain =
  process.env.NODE_ENV === "production"
    ? "https://api.plura.pro"
    : "http://localhost:3001";
export const authClient = createAuthClient({
  baseURL: BaseDomain,
  plugins: [multiSessionClient()],
});

export const { signIn, signUp, useSession, signOut, multiSession } = authClient;
=======
export const authClient = createAuthClient({
  baseURL: "http://localhost:3001",
  plugins:[multiSessionClient()]
});

export const { signIn, signUp, useSession,signOut,multiSession} = authClient;
>>>>>>> 5b4aadf (add better-auth in hono)
