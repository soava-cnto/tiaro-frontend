import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import "./login.css";
import Spinner from "../components/Spinner";

// Composant Loading (UX)
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    Chargement...
  </div>
);

export default function Login() {
  const navigate = useNavigate();

  // 🔐 Données venant du AuthProvider
  const { user, loading, authError } = useAuth();

  // 🎛️ États locaux
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState(null);
  const [spinnerVisible, setSpinnerVisible] = useState(false); // Ajout d'un état pour contrôler la visibilité du spinner

  // ✅ Redirection si l'utilisateur est AUTORISÉ
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  // ❌ Affichage de l'erreur si AuthProvider refuse l'accès
  useEffect(() => {
    if (authError) {
      setError(authError);
      setIsLoggingIn(false);
    }
  }, [authError]);

  // 🔘 Action bouton Google
  const login = async () => {
    setIsLoggingIn(true);
    setError(null);
    setSpinnerVisible(true); // Afficher le spinner dès que le login commence

    // Ajout d'un délai de 10 secondes avant de continuer
    setTimeout(async () => {
      try {
        await signInWithPopup(auth, provider);
        // ⚠️ IMPORTANT :
        // on NE FAIT RIEN ici après
        // AuthProvider gère TOUT (validation Firestore)
      } catch (e) {
        setError("Popup bloquée ou annulée");
        setIsLoggingIn(false);
      }
    }, 300); // Attendre 3 secondes avant d'afficher l'authentification
  };

  // Si le spinner est visible, afficher LoadingSpinner
  if (loading || spinnerVisible) return <Spinner />;

  return (
    <AuthLayout>
      <div className="login-container">
        <h2>Se connecter en tant que membre Tiaro</h2>

        {/* Message d'erreur */}
        {error && <p className="error-text">{error}</p>}

        <div className="divider">
          <hr />
          <span>avec</span>
          <hr />
        </div>

        <div className="google-login-btn-container">
          <button
            className="google-login-btn"
            onClick={login}
            disabled={isLoggingIn}
            aria-label="Se connecter avec Google"
          >
            <span className="google-btn-content">
              <img
                alt="Google"
                title="Se connecter avec Google"
                src="https://gitlab.com/assets/auth_buttons/google_64-9ab7462cd2115e11f80171018d8c39bd493fc375e83202fbb6d37a487ad01908.png"
                loading="lazy"
                className="google-logo"
              />
              <span>Google</span>
            </span>
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
