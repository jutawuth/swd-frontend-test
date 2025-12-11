'use client';

import type { InputRef } from 'antd';
import { Button, Col, DatePicker, Form, Input, InputNumber, Radio, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { useDict } from '../DictContext';
import styles from '../styles/user-form.module.scss';

export default function UserForm() {
  const dict = useDict();
  const required = dict.formValidation.required;

  const [form] = Form.useForm();
  const citizenRefs = useRef<Array<InputRef | null>>([]);
  const sampleData = {
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
  };

  const titleOptions = Object.entries(dict.form.titleOptions).map(([value, label]) => ({
    label,
    value,
  }));

  const genderOptions = Object.entries(dict.form.genderOptions).map(([value, label]) => ({
    label,
    value,
  }));

  const nationalityOptions = Object.entries(dict.form.nationalityOptions).map(([value, label]) => ({
    label,
    value: label,
  }));

  const mobilePhoneOptions = Object.entries(dict.form.mobilePhoneOptions).map(([value, label]) => ({
    label,
    value: label,
  }));

  const initialValues = {};

  const handleCitizenChange = (index: number, maxLength: number, value: string) => {
    if (value.length >= maxLength) {
      const next = citizenRefs.current[index + 1];
      next?.focus();
    }
  };

  const setFormFromData = (data: typeof sampleData) => {
    const citizenParts = data.citizenId.split('-');
    const mobilePrefix = mobilePhoneOptions.find((opt) => data.mobilePhone.startsWith(opt.label));
    const mobileNumber = mobilePrefix
      ? data.mobilePhone.slice(mobilePrefix.label.length)
      : data.mobilePhone;

    console.log('mobilePrefix: ', mobilePrefix);
    console.log('mobileNumber: ', mobileNumber);

    form.setFieldsValue({
      title: data.title,
      firstname: data.firstname,
      lastname: data.lastname,
      birthday: dayjs(data.birthday),
      nationality: data.nationality,
      citizenId: citizenParts,
      gender: data.gender,
      mobilePhone: [mobilePrefix?.label ?? '', mobileNumber],
      passportNo: data.passportNo,
      expectedSalary: data.expectedSalary,
    });
  };

  const onFinish = (fieldsValue: any) => {
    const citizenArray = (fieldsValue.citizenId as string[] | undefined) ?? [];
    const citizenId = citizenArray.join('-');
    const mobileArray = (fieldsValue.mobilePhone as string[] | undefined) ?? [];
    const mobilePhone = mobileArray.join('');

    const values = {
      ...fieldsValue,
      birthday: fieldsValue['birthday']?.format?.('YYYY-MM-DD'),
      citizenId,
      mobilePhone,
    };
    console.log('Raw form values: ', values);
  };

  return (
    <div className={styles.form}>
      <div className={styles.formPanal}>
        <Button
          onClick={() => {
            setFormFromData(sampleData);
          }}
        >
          Set Form
        </Button>
        <Form form={form} onFinish={onFinish} initialValues={initialValues}>
          <Row gutter={[16, 16]}>
            <Col span={4}>
              <Form.Item
                name="title"
                label={dict.form.title}
                rules={[{ required: true, message: required.title }]}
              >
                <Select placeholder={dict.form.title} options={titleOptions} />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="firstname"
                label={dict.form.firstname}
                rules={[{ required: true, message: required.firstname, whitespace: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="lastname"
                label={dict.form.lastname}
                rules={[{ required: true, message: required.lastname, whitespace: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item
                name="birthday"
                label={dict.form.birthday}
                rules={[{ required: true, message: required.birthday }]}
              >
                <DatePicker placeholder={dict.form.birthday} />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="nationality"
                label={dict.form.nationality}
                rules={[{ required: true, message: required.title }]}
              >
                <Select placeholder={dict.form.nationality} options={nationalityOptions} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={4}>
              <Form.Item name={['citizenId', 0]} label={dict.form.cityzenId}>
                <Input
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  ref={(el) => {
                    citizenRefs.current[0] = el;
                  }}
                  onChange={(e) => handleCitizenChange(0, 1, e.target.value)}
                />
              </Form.Item>
            </Col>

            <Col span={5}>
              <Form.Item name={['citizenId', 1]} label="-" colon={false}>
                <Input
                  maxLength={4}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  ref={(el) => {
                    citizenRefs.current[1] = el;
                  }}
                  onChange={(e) => handleCitizenChange(1, 4, e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name={['citizenId', 2]} label="-" colon={false}>
                <Input
                  maxLength={5}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  ref={(el) => {
                    citizenRefs.current[2] = el;
                  }}
                  onChange={(e) => handleCitizenChange(2, 5, e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name={['citizenId', 3]} label="-" colon={false}>
                <Input
                  maxLength={2}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  ref={(el) => {
                    citizenRefs.current[3] = el;
                  }}
                  onChange={(e) => handleCitizenChange(3, 2, e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name={['citizenId', 4]} label="-" colon={false}>
                <Input
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  ref={(el) => {
                    citizenRefs.current[4] = el;
                  }}
                  onChange={(e) => handleCitizenChange(4, 1, e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="gender"
                label={dict.form.gender}
                rules={[{ required: true, message: required.gender }]}
              >
                <Radio.Group>
                  {genderOptions.map(({ value, label }) => (
                    <Radio key={value} value={value}>
                      {label}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                name={['mobilePhone', 0]}
                label={dict.form.mobilePhone}
                rules={[{ required: true, message: required.mobilePhone }]}
              >
                <Select placeholder={dict.form.mobilePhone} options={mobilePhoneOptions} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={['mobilePhone', 1]} label="-" colon={false}>
                {/* <Input maxLength={10} />
                 */}
                <InputNumber maxLength={10} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="passportNo"
                label={dict.form.passportNo}
                rules={[{ required: true, message: required.passportNo, whitespace: true }]}
              >
                <Input maxLength={10} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="expectedSalary"
                label={dict.form.expectedSalary}
                rules={[
                  {
                    required: true,
                    message: required.expectedSalary,
                    type: 'number',
                    transform: (value) =>
                      value === '' || value === null || value === undefined
                        ? undefined
                        : Number(value),
                  },
                ]}
              >
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Row justify="space-around">
                <Col>
                  <Button htmlType="reset">{dict.form.buttons.reset}</Button>
                </Col>
                <Col>
                  <Button htmlType="submit">{dict.form.buttons.submit}</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
