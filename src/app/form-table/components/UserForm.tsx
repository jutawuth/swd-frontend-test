'use client';

import type { InputRef } from 'antd';
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef } from 'react';
import { useDict } from '../DictContext';
import { addUser, setEditing, updateUser, useUserDispatch, useUserSelector } from '../store';
import styles from '../styles/user-form.module.scss';

type FormValues = {
  title: string;
  firstname: string;
  lastname: string;
  birthday?: dayjs.Dayjs;
  nationality: string;
  citizenId?: (string | undefined)[];
  gender: string;
  mobilePhone?: (string | undefined)[];
  passportNo?: string;
  expectedSalary?: number;
};

export default function UserForm() {
  const dict = useDict();
  const required = dict.formValidation.required;

  const [form] = Form.useForm();
  const citizenRefs = useRef<Array<InputRef | null>>([]);
  const dispatch = useUserDispatch();
  const editing = useUserSelector((state) => state.formTable.editing);

  const titleOptions = Object.entries(dict.form.titleOptions).map(([value, label]) => ({
    label,
    value,
  }));

  const genderOptions = Object.entries(dict.form.genderOptions).map(([value, label]) => ({
    label,
    value,
  }));

  const nationalityOptions = Object.entries(dict.form.nationalityOptions).map(([, label]) => ({
    label,
    value: label,
  }));

  const flagMap: Record<string, string> = { '+66': '🇹🇭', '+1': '🇺🇸', '+33': '🇫🇷' };
  const mobilePhoneOptions = Object.entries(dict.form.mobilePhoneOptions).map(([code, label]) => {
    const flag = flagMap[code] ?? '';
    return { label: `${flag ? `${flag} ` : ''}${label}`, value: code };
  });

  const initialValues = {};

  const handleCitizenChange = (index: number, maxLength: number, value: string) => {
    if (value.length >= maxLength) {
      const next = citizenRefs.current[index + 1];
      next?.focus();
    }
  };

  const splitMobile = useCallback(
    (phone: string | undefined): [string, string] => {
      if (!phone) return ['', ''];
      const matchedPrefix = mobilePhoneOptions.find((opt) => phone.startsWith(opt.value));
      if (matchedPrefix) {
        return [matchedPrefix.value, phone.slice(matchedPrefix.value.length)];
      }
      const plusMatch = phone.match(/^(\+\d{1,3})(.*)$/);
      if (plusMatch) {
        return [plusMatch[1], plusMatch[2]];
      }
      return ['', phone];
    },
    [mobilePhoneOptions]
  );

  useEffect(() => {
    if (editing) {
      const citizenParts = editing.citizenId ? editing.citizenId.split('-') : [];
      const [mobilePrefix, mobileNumber] = splitMobile(editing.mobilePhone);

      form.setFieldsValue({
        title: editing.title,
        firstname: editing.firstname,
        lastname: editing.lastname,
        birthday: editing.birthday ? dayjs(editing.birthday) : undefined,
        nationality: editing.nationality,
        citizenId: citizenParts,
        gender: editing.gender,
        mobilePhone: [mobilePrefix, mobileNumber],
        passportNo: editing.passportNo,
        expectedSalary: editing.expectedSalary,
      });
    } else {
      form.resetFields();
    }
  }, [editing, form, splitMobile]);

  const onFinish = (fieldsValue: FormValues) => {
    const citizenArray = (fieldsValue.citizenId as string[] | undefined) ?? [];
    const citizenId = citizenArray.join('-');
    const phoneVal = fieldsValue.mobilePhone;
    const mobilePhone = Array.isArray(phoneVal) ? phoneVal.filter(Boolean).join('') : '';

    const values = {
      title: fieldsValue.title,
      firstname: fieldsValue.firstname,
      lastname: fieldsValue.lastname,
      birthday: fieldsValue['birthday']?.format?.('YYYY-MM-DD') ?? '',
      nationality: fieldsValue.nationality,
      citizenId,
      gender: fieldsValue.gender,
      mobilePhone,
      passportNo: fieldsValue.passportNo ?? '',
      expectedSalary: fieldsValue.expectedSalary ?? 0,
    };

    if (editing) {
      dispatch(updateUser({ ...values, key: editing.key }));
      dispatch(setEditing(null));
    } else {
      dispatch(addUser(values));
    }

    form.resetFields();
    alert('Save Success');
  };

  return (
    <div className={styles.form}>
      <div className={styles.formPanal}>
        <Form
          form={form}
          onFinish={onFinish}
          onReset={() => dispatch(setEditing(null))}
          initialValues={initialValues}
        >
          <Row gutter={[16, 16]}>
            <Col span={5}>
              <Form.Item
                name="title"
                label={dict.form.title}
                rules={[{ required: true, message: required.title }]}
              >
                <Select placeholder={dict.form.title} options={titleOptions} />
              </Form.Item>
            </Col>
            <Col span={9}>
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
                <DatePicker placeholder={dict.form.birthday} style={{ width: '100%' }} />
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
            <Col span={5}>
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
                <Select
                  placeholder={dict.form.mobilePhone}
                  options={mobilePhoneOptions}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={['mobilePhone', 1]} label="-" colon={false}>
                <Input inputMode="numeric" pattern="[0-9]*" maxLength={10} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item name="passportNo" label={dict.form.passportNo}>
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
                <Input inputMode="numeric" pattern="[0-9]*" min={0} />
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
