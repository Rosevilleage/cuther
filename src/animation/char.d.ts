export type CaractorPath =
  | 'chair'
  | 'cherry blossoms'
  | 'Circulator'
  | 'coat'
  | 'cold'
  | 'headphone'
  | 'lev-char-half'
  | 'trench';

export interface CharAnimationProp {
  loop?: boolean;
  autoPlay?: boolean;
  size: 'small' | 'medium' | 'lage';
}
