import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const { user, profile } = useAuth();

  return (
    <div 
    // style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      <h1>Tableau de bord</h1>

      <p><strong>Nom :</strong> {profile.nom}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Rôle :</strong> {profile.role}</p>

      <Link to="/add-activity">➕ Nouvelle activité</Link>
      <br /><br />

      <button onClick={() => signOut(auth)}>Déconnexion</button>
    </div>
  );
}
