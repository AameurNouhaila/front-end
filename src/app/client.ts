import { NiveauRecommandation } from "./enum/niveauRecommandation";

export class Client {
    _id: string | undefined;
    nom: string | undefined;
    prenom: string | undefined;
    adresse: string | undefined;
    date_event: Date | undefined;
    niveau_recommandation: NiveauRecommandation | undefined;
    montant: number | undefined;
    description: string | undefined;
    dateFormatted?: string | undefined;
    poids: number | undefined ;
  }
  