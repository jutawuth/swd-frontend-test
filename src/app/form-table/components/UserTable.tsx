'use client';

import { Button, Checkbox, Form, Pagination, Row, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import { useDict } from '../DictContext';
import {
  deleteMany,
  deleteUser,
  setEditing,
  useUserDispatch,
  useUserSelector,
  type UserRecord,
} from '../store';

import styles from '../styles/user-table.module.scss';

export default function UserTable() {
  const dict = useDict();
  const dispatch = useUserDispatch();
  const data = useUserSelector((state) => state.formTable.users);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const pagedData = useMemo(
    () => data.slice((page - 1) * pageSize, page * pageSize),
    [data, page, pageSize]
  );

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(data.length / pageSize));
    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [data.length, page, pageSize]);

  const columns: ColumnsType<UserRecord> = useMemo(
    () => [
      {
        title: 'Name',
        key: 'name',
        render: (_, record) => `${record.firstname} ${record.lastname}`,
      },
      {
        title: dict.form.gender,
        dataIndex: 'gender',
        key: 'gender',
        render: (value: string) => {
          const key = value?.toLowerCase() as keyof typeof dict.form.genderOptions;
          return dict.form.genderOptions?.[key] ?? value;
        },
      },
      { title: dict.form.mobilePhone, dataIndex: 'mobilePhone', key: 'mobilePhone' },
      {
        title: dict.form.nationality,
        dataIndex: 'nationality',
        key: 'nationality',
        render: (value: string) => {
          const key = value?.toLowerCase() as keyof typeof dict.form.nationalityOptions;
          return dict.form.nationalityOptions?.[key] ?? value;
        },
      },
      {
        title: dict.form.manage,
        key: 'action',
        width: '180px',
        render: (_, record) => (
          <Space>
            <Button size="small" type="text" onClick={() => dispatch(setEditing(record))}>
              EDIT
            </Button>
            <Button size="small" type="text" onClick={() => dispatch(deleteUser(record.key))}>
              DELETE
            </Button>
          </Space>
        ),
      },
    ],
    [dispatch, dict]
  );

  const handleSelectChange = (newKeys: React.Key[]) => {
    setSelectedRowKeys(newKeys);
  };

  const handleDeleteAll = () => {
    dispatch(deleteMany(selectedRowKeys as string[]));
    setSelectedRowKeys([]);
  };

  return (
    <div className={styles.tablePanal}>
      <Row justify="space-between" style={{ width: '100%', marginBottom: 16 }}>
        <Form layout="inline">
          <Form.Item>
            <Checkbox
              indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < data.length}
              checked={data.length > 0 && selectedRowKeys.length === data.length}
              disabled={data.length === 0}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedRowKeys(data.map((item) => item.key));
                } else {
                  setSelectedRowKeys([]);
                }
              }}
            >
              Select All
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button onClick={handleDeleteAll} disabled={selectedRowKeys.length === 0}>
              Delete
            </Button>
          </Form.Item>
        </Form>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data.length}
          itemRender={(pageNumber, type, originalElement) => {
            if (type === 'prev') {
              return (
                <Button size="small" type="text">
                  {dict.table.prev}
                </Button>
              );
            }
            if (type === 'next') {
              return (
                <Button size="small" type="text">
                  {dict.table.next}
                </Button>
              );
            }
            return originalElement;
          }}
          onChange={(p, size) => {
            setPage(p);
            setPageSize(size);
          }}
        />
      </Row>

      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectChange,
        }}
        columns={columns}
        dataSource={pagedData}
        pagination={false}
      />
    </div>
  );
}
