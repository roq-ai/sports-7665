import { OrderInterface } from 'interfaces/order';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  description?: string;
  price?: number;
  company_id: string;
  created_at?: any;
  updated_at?: any;
  order?: OrderInterface[];
  company?: CompanyInterface;
  _count?: {
    order?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  company_id?: string;
}
