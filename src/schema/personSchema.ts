import * as Yup from 'yup';

export const NewSuperMasterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  ID: Yup.string().required('User Id is required'),
  role: Yup.mixed<any>().nullable().required('Role is required'),
  exchangeGroup: Yup.mixed<any>().nullable().required('Must have at least 1 exchange'),
  allowedExchange: Yup.mixed<any>().nullable().required('Must have at least 1 exchange'),
  limitOfAddMaster: Yup.number().required('Limit Of Add Master is required'),
  limitOfAddUser: Yup.number().required('Limit Of Add User is required'),
  leverageXY: Yup.mixed<any>().nullable().required('Leverage  is required'),
});

export const NewMasterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  ID: Yup.string().required('User Id is required'),
  role: Yup.mixed<any>().nullable().required('Role is required'),
  exchangeGroup: Yup.mixed<any>().nullable().required('Must have at least 1 exchange'),
  allowedExchange: Yup.mixed<any>().nullable().required('Must have at least 1 exchange'),
  limitOfAddUser: Yup.number().required('Limit Of Add User is required'),
  leverageXY: Yup.mixed<any>().nullable().required('Leverage  is required'),
});

export const NewUserSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  ID: Yup.string().required('User Id is required'),
  creditLimit: Yup.number().required('User creditLimit is required'),
  positionMinTime: Yup.number().required('Position min time is required'),
  role: Yup.mixed<any>().nullable().required('Role is required'),
  exchangeGroup: Yup.mixed<any>().nullable().required('Must have at least 1 exchange'),
  allowedExchange: Yup.mixed<any>().nullable().required('Must have at least 1 exchange'),
  leverageXY: Yup.mixed<any>().nullable().required('Leverage  is required'),
});
