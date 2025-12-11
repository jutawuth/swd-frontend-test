'use client';

import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

export type UserRecord = {
  key: string;
  birthday: string;
  citizenId: string;
  expectedSalary: number;
  firstname: string;
  gender: string;
  lastname: string;
  mobilePhone: string;
  mobilePrefix?: string;
  mobileNumber?: string;
  nationality: string;
  passportNo: string;
  title: string;
};

export type FormTableState = {
  users: UserRecord[];
  editing: UserRecord | null;
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
    mobilePrefix: '+66',
    mobileNumber: '3124234324',
    nationality: 'Thai',
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
    mobilePrefix: '+1',
    mobileNumber: '9999999999',
    nationality: 'American',
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
    mobilePrefix: '+33',
    mobileNumber: '1234567890',
    nationality: 'French',
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
    mobilePrefix: '+66',
    mobileNumber: '0987654321',
    nationality: 'Thai',
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
    mobilePrefix: '+1',
    mobileNumber: '1234509876',
    nationality: 'American',
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
    mobilePrefix: '+33',
    mobileNumber: '5566778899',
    nationality: 'French',
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
    mobilePrefix: '+66',
    mobileNumber: '1122334455',
    nationality: 'Thai',
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
    mobilePrefix: '+1',
    mobileNumber: '7777888899',
    nationality: 'American',
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
    mobilePrefix: '+33',
    mobileNumber: '9900112233',
    nationality: 'French',
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
    mobilePrefix: '+66',
    mobileNumber: '5566778899',
    nationality: 'Thai',
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
    mobilePrefix: '+1',
    mobileNumber: '1111222233',
    nationality: 'American',
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
    mobilePrefix: '+33',
    mobileNumber: '4455667788',
    nationality: 'French',
    passportNo: 'FR112299',
    title: 'mr',
  },
];

const initialState: FormTableState = {
  users: sampleData,
  editing: null,
};

const formTableSlice = createSlice({
  name: 'formTable',
  initialState,
  reducers: {
    setEditing(state, action: PayloadAction<UserRecord | null>) {
      state.editing = action.payload;
    },
    addUser(state, action: PayloadAction<Omit<UserRecord, 'key'>>) {
      const key = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`;
      state.users.push({ ...action.payload, key });
    },
    updateUser(state, action: PayloadAction<UserRecord>) {
      const idx = state.users.findIndex((u) => u.key === action.payload.key);
      if (idx !== -1) {
        state.users[idx] = action.payload;
      }
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter((u) => u.key !== action.payload);
    },
    deleteMany(state, action: PayloadAction<string[]>) {
      const removeSet = new Set(action.payload);
      state.users = state.users.filter((u) => !removeSet.has(u.key));
    },
    setAll(state, action: PayloadAction<UserRecord[]>) {
      state.users = action.payload;
    },
  },
});

export const { setEditing, addUser, updateUser, deleteUser, deleteMany, setAll } =
  formTableSlice.actions;

export const loadState = (): { formTable: FormTableState } | undefined => {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = localStorage.getItem('formTableState');
    if (!raw) return undefined;
    return JSON.parse(raw) as { formTable: FormTableState };
  } catch (error) {
    console.error('Failed to load formTableState', error);
    return undefined;
  }
};

export const makeStore = (preloadedState?: { formTable: FormTableState }) =>
  configureStore({
    reducer: {
      formTable: formTableSlice.reducer,
    },
    preloadedState,
  });

export type UserStore = ReturnType<typeof makeStore>;
export type UserState = ReturnType<UserStore['getState']>;
export type UserDispatch = UserStore['dispatch'];

export const useUserDispatch: () => UserDispatch = useDispatch;
export const useUserSelector: TypedUseSelectorHook<UserState> = useSelector;

export const setupStorePersistence = (store: UserStore) => {
  if (typeof window === 'undefined') return;
  store.subscribe(() => {
    try {
      const state = store.getState();
      localStorage.setItem('formTableState', JSON.stringify(state));
    } catch (error) {
      console.error('Failed to persist formTableState', error);
    }
  });
};
