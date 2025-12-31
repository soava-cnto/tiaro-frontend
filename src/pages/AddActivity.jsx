import { useState } from "react";
import { addActivity } from "../services/activityService";
import { useAuth } from "../auth/AuthProvider";

export default function AddActivity() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    date: "",
    lieu: "",
    description: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    await addActivity({
      ...form,
      benevoleEmail: user.email,
    });

    alert("Activité envoyée pour validation");
    setForm({ date: "", lieu: "", description: "" });
  };

  return (
      <div>
        <h2>Nouvelle activité</h2>

        <form onSubmit={submit} style={{alignContent: "center", display: "flex", flexDirection: "column", gap: "20px" }}>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />

          <input
            placeholder="Lieu"
            value={form.lieu}
            onChange={(e) => setForm({ ...form, lieu: e.target.value })}
            required
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <button type="submit">Envoyer</button>
        </form>
      </div>
  );
}
