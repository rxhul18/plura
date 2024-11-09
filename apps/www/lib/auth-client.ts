import { createAuthClient } from "better-auth/react";
import { multiSessionClient } from "better-auth/client/plugins";
export const authClient = createAuthClient({
  baseURL: "http://localhost:3001",
  plugins:[multiSessionClient()]
});

export const { signIn, signUp, useSession,signOut,multiSession} = authClient;