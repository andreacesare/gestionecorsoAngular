import {Docente} from '../docenti/docente.model';
import {Studente} from '../studenti/studente.model';

export interface Corso{
  id?: number;
  nome: string;
  data_inizio: string;
  durata:string;
  docente:Docente;
  discenti:Studente[];


}
