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
              {/* <img
                alt="Google"
                title="Se connecter avec Google"
                src="https://gitlab.com/assets/auth_buttons/google_64-9ab7462cd2115e11f80171018d8c39bd493fc375e83202fbb6d37a487ad01908.png"
                loading="lazy"
                className="google-logo"
              /> */}
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                // width="24px"
                // height="24px"
                className="google-logo"
              >
                <path
                  d="M21 12.207c0-.606-.054-1.18-.146-1.74h-8.659v3.456h4.958c-.222 1.134-.873 2.092-1.839 2.744v2.298h2.958C20.004 17.364 21 15.004 21 12.207z"
                  fill="#4285f4"
                >
                </path>
                <path
                  d="M12.195 21.195c2.483 0 4.56-.827 6.077-2.23l-2.958-2.298c-.827.551-1.877.889-3.119.889-2.398 0-4.429-1.617-5.157-3.801h-3.05v2.368c1.51 3.003 4.614 5.072 8.207 5.072z"
                  fill="#34a853"
                >
                </path>
                <path
                  d="M7.038 13.755c-.191-.552-.29-1.142-.29-1.755s.106-1.203.29-1.755V7.877h-3.05a9.089 9.089 0 000 8.246z"
                  fill="#fbbc05"
                >
                </path>
                <path
                  d="M12.195 6.444c1.357 0 2.567.468 3.525 1.38l2.621-2.62c-1.586-1.488-3.663-2.4-6.146-2.4-3.593 0-6.697 2.07-8.207 5.073l3.05 2.368c.728-2.184 2.759-3.8 5.157-3.8z"
                  fill="#ea4335"
                >
                </path>
              </svg>
              
              <span>Google</span>
            </span>
          </button>
          
        </div>
      </div>
    </AuthLayout>
  );
}
