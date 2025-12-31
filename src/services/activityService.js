import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function addActivity(data) {
  return await addDoc(collection(db, "activities"), {
    ...data,
    statut: "en_attente",
    createdAt: serverTimestamp(),
  });
}
