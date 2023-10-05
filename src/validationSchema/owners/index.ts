import * as yup from 'yup';

export const ownerValidationSchema = yup.object().shape({
  ownership_percentage: yup.number().integer().nullable(),
  start_date: yup.date().nullable(),
  end_date: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
  company_id: yup.string().nullable().required(),
});
