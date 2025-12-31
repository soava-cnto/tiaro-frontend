import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setAuthError(null);

      if (!firebaseUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      // 🔍 Vérification Firestore
      const ref = doc(db, "users", firebaseUser.email);
      const snap = await getDoc(ref);

      if (!snap.exists() || snap.data().active !== true) {
        await auth.signOut();
        setAuthError("Accès refusé : compte non autorisé");
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      // ✅ Utilisateur autorisé
      setUser(firebaseUser);
      setProfile(snap.data());
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
