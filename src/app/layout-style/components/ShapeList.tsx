'use client';

import { Col, Row } from 'antd';
import { useDict } from '../DictContext';
import styles from '../styles/page.module.scss';
import shape from '../styles/shape.module.scss';
import { IShapeList } from './interface/ShapeList.interface';

export default function ShapeList({ data, onShuffleClick }: IShapeList) {
  useDict(); // consume to keep consistent access; future copy can use dict values

  const half = Math.ceil(data.length / 2);

  const dataRow1 = data.slice(0, half);
  const dataRow2 = data.slice(half);

  return (
    <>
      <Row justify="end">
        {dataRow1.map((shapeItem) => {
          return (
            <Col span={6} key={shapeItem}>
              <div className={styles.card}>
                <div
                  className={`${shape.shapeButton} ${shape[shapeItem]}`}
                  onClick={onShuffleClick}
                ></div>
              </div>
            </Col>
          );
        })}
      </Row>

      <Row justify="center">
        {dataRow2.map((shapeItem) => {
          return (
            <Col span={6} key={shapeItem}>
              <div className={styles.card}>
                <div
                  className={`${shape.shapeButton} ${shape[shapeItem]}`}
                  onClick={onShuffleClick}
                ></div>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
