export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  notes?: string;
  "history conditions"?: string[];
  "past medication subscribe"?: string[];
}