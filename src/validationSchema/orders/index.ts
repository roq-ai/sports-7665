import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  quantity: yup.number().integer().nullable(),
  total_price: yup.number().integer().nullable(),
  order_date: yup.date().nullable(),
  delivery_date: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
  product_id: yup.string().nullable().required(),
});
