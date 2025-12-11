'use client';

import { Button, Checkbox, Form, Pagination, Row, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';
import { useDict } from '../DictContext';

import styles from '../styles/user-table.module.scss';

type UserRecord = {
  key: string;
  birthday: string;
  citizenId: string;
  expectedSalary: number;
  firstname: string;
  gender: string;
  lastname: string;
  mobilePhone: string;
  nationality: string;
  passportNo: string;
  title: string;
};

const sampleData: UserRecord[] = [
  {
    key: '1',
    birthday: '2025-12-10',
    citizenId: '1-2213-44234-23-4',
    expectedSalary: 234234,
    firstname: 'qweqw',
    gender: 'female',
    lastname: 'rerwe',
    mobilePhone: '+663124234324',
    nationality: 'thai',
    passportNo: '3242342343',
    title: 'mrs',
  },
  {
    key: '2',
    birthday: '2025-11-01',
    citizenId: '2-9988-11223-55-6',
    expectedSalary: 100000,
    firstname: 'john',
    gender: 'male',
    lastname: 'doe',
    mobilePhone: '+19999999999',
    nationality: 'us',
    passportNo: 'AB123456',
    title: 'mr',
  },
  {
    key: '3',
    birthday: '1990-05-20',
    citizenId: '3-4444-55555-66-7',
    expectedSalary: 75000,
    firstname: 'alice',
    gender: 'female',
    lastname: 'walker',
    mobilePhone: '+331234567890',
    nationality: 'french',
    passportNo: 'FR889900',
    title: 'ms',
  },
  {
    key: '4',
    birthday: '1988-02-14',
    citizenId: '4-1234-56789-01-2',
    expectedSalary: 120000,
    firstname: 'bob',
    gender: 'male',
    lastname: 'smith',
    mobilePhone: '+660987654321',
    nationality: 'thai',
    passportNo: 'TH112233',
    title: 'mr',
  },
  {
    key: '5',
    birthday: '1995-07-07',
    citizenId: '5-7777-88888-99-0',
    expectedSalary: 95000,
    firstname: 'carol',
    gender: 'female',
    lastname: 'johnson',
    mobilePhone: '+11234509876',
    nationality: 'us',
    passportNo: 'US445566',
    title: 'ms',
  },
  {
    key: '6',
    birthday: '1992-03-30',
    citizenId: '6-3333-22222-11-4',
    expectedSalary: 68000,
    firstname: 'david',
    gender: 'male',
    lastname: 'lee',
    mobilePhone: '+335566778899',
    nationality: 'french',
    passportNo: 'FR334455',
    title: 'mr',
  },
  {
    key: '7',
    birthday: '1985-09-12',
    citizenId: '7-6666-11111-22-5',
    expectedSalary: 130000,
    firstname: 'ella',
    gender: 'female',
    lastname: 'martin',
    mobilePhone: '+661122334455',
    nationality: 'thai',
    passportNo: 'TH556677',
    title: 'mrs',
  },
  {
    key: '8',
    birthday: '1998-12-25',
    citizenId: '8-2222-33333-44-6',
    expectedSalary: 72000,
    firstname: 'frank',
    gender: 'male',
    lastname: 'brown',
    mobilePhone: '+17777888899',
    nationality: 'us',
    passportNo: 'US778899',
    title: 'mr',
  },
  {
    key: '9',
    birthday: '1993-01-18',
    citizenId: '9-5555-66666-77-8',
    expectedSalary: 88000,
    firstname: 'gina',
    gender: 'female',
    lastname: 'taylor',
    mobilePhone: '+339900112233',
    nationality: 'french',
    passportNo: 'FR667788',
    title: 'ms',
  },
  {
    key: '10',
    birthday: '1987-08-08',
    citizenId: '10-1111-22222-33-4',
    expectedSalary: 110000,
    firstname: 'harry',
    gender: 'male',
    lastname: 'wilson',
    mobilePhone: '+665566778899',
    nationality: 'thai',
    passportNo: 'TH889900',
    title: 'mr',
  },
  {
    key: '11',
    birthday: '1991-04-04',
    citizenId: '11-9999-00000-11-2',
    expectedSalary: 64000,
    firstname: 'irene',
    gender: 'female',
    lastname: 'harris',
    mobilePhone: '+11111222233',
    nationality: 'us',
    passportNo: 'US990011',
    title: 'mrs',
  },
  {
    key: '12',
    birthday: '1996-06-16',
    citizenId: '12-8888-77777-66-5',
    expectedSalary: 101000,
    firstname: 'jack',
    gender: 'male',
    lastname: 'clark',
    mobilePhone: '+334455667788',
    nationality: 'french',
    passportNo: 'FR112299',
    title: 'mr',
  },
];

export default function UserTable() {
  const dict = useDict();
  const [data, setData] = useState<UserRecord[]>(sampleData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pagedData = useMemo(
    () => data.slice((page - 1) * pageSize, page * pageSize),
    [data, page, pageSize]
  );

  const columns: ColumnsType<UserRecord> = useMemo(
    () => [
      {
        title: 'Name',
        key: 'name',
        render: (_, record) => `${record.title} ${record.firstname} ${record.lastname}`,
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        render: (value: string) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : ''),
      },
      { title: 'Mobile Phone', dataIndex: 'mobilePhone', key: 'mobilePhone' },
      {
        title: 'Nationality',
        dataIndex: 'nationality',
        key: 'nationality',
        render: (value: string) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : ''),
      },
      {
        title: 'MANAGE',
        key: 'action',
        width: '180px',
        render: (_, record) => (
          <Space>
            <Button size="small" type="text" onClick={() => handleEdit(record.key)}>
              EDIT
            </Button>
            <Button size="small" type="text" onClick={() => handleDelete(record.key)}>
              DELETE
            </Button>
          </Space>
        ),
      },
    ],
    []
  );

  const handleEdit = (key: React.Key) => {
    console.log('Edit', key);
  };

  const handleDelete = (key: React.Key) => {
    setData((prev) => {
      const next = prev.filter((item) => item.key !== key);
      const maxPage = Math.max(1, Math.ceil(next.length / pageSize));
      setPage((p) => Math.min(p, maxPage));
      return next;
    });
    setSelectedRowKeys((prev) => prev.filter((k) => k !== key));
  };

  const handleSelectChange = (newKeys: React.Key[]) => {
    setSelectedRowKeys(newKeys);
  };

  const handleDeleteAll = () => {
    setData((prev) => {
      const next = prev.filter((item) => !selectedRowKeys.includes(item.key));
      const maxPage = Math.max(1, Math.ceil(next.length / pageSize));
      setPage((p) => Math.min(p, maxPage));
      return next;
    });
    setSelectedRowKeys([]);
  };

  return (
    <div className={styles.tablePanal}>
      <Row>
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
      </Row>

      <Row justify={'end'}>
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
