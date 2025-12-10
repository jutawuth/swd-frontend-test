export type SlideDirectionType = 'left' | 'right';

export interface IShapeActions {
  onSlideClick: (direction: SlideDirectionType) => void;
  onSwapClick: () => void;
}
