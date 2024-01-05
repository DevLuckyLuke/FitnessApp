import { Timestamp } from "@firebase/firestore-types";


export interface Workout {
  name: string;
  date: Date;
  user: string;
}
