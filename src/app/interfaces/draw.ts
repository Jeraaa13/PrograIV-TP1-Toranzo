import { Carta } from './carta';

export interface Draw {
  cards: Carta[];
  succes: boolean;
  deck_id: string;
  remaining: number;
}
