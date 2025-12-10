'use client';

import { Divider } from 'antd';
import { useState } from 'react';
import styles from '../styles/page.module.scss';
import ShapeActions from './ShapeActions';
import ShapeList from './ShapeList';
import { SlideDirectionType } from './interface/ShapeActions.interface';

export default function ShapeSection() {
  const [shapeList, setShapeList] = useState([
    'square',
    'circle',
    'oval',
    'trapezoid',
    'rectangle',
    'parallelogram',
  ]);

  function slideLeft() {
    setShapeList((prev) => {
      if (prev.length === 0) return prev;
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  }

  function slideRight() {
    setShapeList((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      return [last, ...prev.slice(0, -1)];
    });
  }

  function shuffle() {
    setShapeList((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    });
  }

  function swapHalves() {
    setShapeList((prev) => {
      if (prev.length < 2) return prev;
      const mid = Math.floor(prev.length / 2);
      const front = prev.slice(0, mid);
      const back = prev.slice(mid);
      return [...back, ...front];
    });
  }

  function handleSlideClick(direction: SlideDirectionType) {
    switch (direction) {
      case 'left':
        slideLeft();
        break;
      case 'right':
        slideRight();
        break;

      default:
        break;
    }
  }

  function handleSwapClick() {
    swapHalves();
  }

  function handleShuffleClick() {
    shuffle();
  }

  return (
    <div className={styles.container}>
      <ShapeActions onSlideClick={handleSlideClick} onSwapClick={handleSwapClick} />

      <Divider />

      <ShapeList data={shapeList} onShuffleClick={handleShuffleClick} />
    </div>
  );
}
