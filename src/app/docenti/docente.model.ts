import {Corso} from '../corsi/corso.model';

export interface Docente{
  id: number;
  nome: string;
  cognome: string;
  corsi:Corso[];
}
