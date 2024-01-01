import { Timestamp } from "@firebase/firestore-types";


export interface Workout {
  name: string;
  date: Date; // oder Date, falls Sie Date-Objekte verwenden
  user: string; // User-ID oder -name
}
