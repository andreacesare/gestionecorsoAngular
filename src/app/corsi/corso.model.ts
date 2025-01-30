import {Docente} from '../docenti/docente.model';

export interface Corso{
  id?: number;
  nome: string;
  data_inizio: string;
  durata:string;
  docente:Docente;


}
