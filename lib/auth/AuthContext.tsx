import { createContext, useContext, useEffect, useState } from "react";
import { User, onIdTokenChanged } from "firebase/auth";
import nookies from "nookies";
import { auth } from "./firebaseClient";

const AuthContext = createContext<{ user: User | null }>({ user: null });

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  //handle auth logic
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).nookies = nookies;
    }
    // listens for token changes
    // stores token in cookie named "token" on browser
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        console.log("no user!");
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        console.log("user! ", auth.currentUser?.displayName, token);
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);

  //  force refresh of token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval on unmount
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
