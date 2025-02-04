import {Corso} from '../corsi/corso.model';

export interface Studente {
  id: number;
  nome: string;
  cognome: string;
  matricola: string;
  data_nascita: string;
  corsi:Corso[];
}
