import * as yup from 'yup';

export const administratorValidationSchema = yup.object().shape({
  admin_since: yup.date().nullable(),
  admin_until: yup.date().nullable(),
  access_level: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
  company_id: yup.string().nullable().required(),
});
