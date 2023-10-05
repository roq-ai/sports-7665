import { UserInterface } from 'interfaces/user';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface OwnerInterface {
  id?: string;
  user_id: string;
  company_id: string;
  ownership_percentage?: number;
  start_date?: any;
  end_date?: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  company?: CompanyInterface;
  _count?: {};
}

export interface OwnerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  company_id?: string;
}
