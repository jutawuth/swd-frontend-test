'use client';

import { Col, Row } from 'antd';
import { useShapeDict } from '../ShapeDictContext';
import styles from '../styles/page.module.scss';
import shape from '../styles/shape.module.scss';
import { IShapeActions } from './interface/ShapeActions.interface';

export default function ShapeActions({ onSlideClick, onSwapClick }: IShapeActions) {
  const dict = useShapeDict();

  return (
    <Row justify="center">
      <Col span={6}>
        <div className={styles.card}>
          <div
            className={`${shape.shapeButton} ${shape.triangleLeft}`}
            onClick={() => onSlideClick('left')}
          ></div>
          <div className={styles.badge}> {dict.actions.slide} </div>
        </div>
      </Col>
      <Col span={12}>
        <div className={styles.card}>
          <div
            className={`${shape.shapeButton} ${shape.triangleUp}`}
            onClick={() => onSwapClick()}
          ></div>
          <div
            className={`${shape.shapeButton} ${shape.triangleDown}`}
            onClick={() => onSwapClick()}
          ></div>
          <div className={styles.badge}> {dict.actions.shuffle} </div>
        </div>
      </Col>
      <Col span={6}>
        <div className={styles.card}>
          <div
            className={`${shape.shapeButton} ${shape.triangleRight}`}
            onClick={() => onSlideClick('right')}
          ></div>
          <div className={styles.badge}> {dict.actions.slide} </div>
        </div>
      </Col>
    </Row>
  );
}
