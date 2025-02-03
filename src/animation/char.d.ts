export type Size = 'small' | 'medium' | 'lage';

export interface AnimationCharProps {
  loop?: boolean;
  autoPlay?: boolean;
  src: string;
  style?: StyleProp<ViewStyle>;
}
