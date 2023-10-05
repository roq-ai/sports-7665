import { UserInterface } from 'interfaces/user';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface AdministratorInterface {
  id?: string;
  user_id: string;
  company_id: string;
  admin_since?: any;
  admin_until?: any;
  access_level?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  company?: CompanyInterface;
  _count?: {};
}

export interface AdministratorGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  company_id?: string;
  access_level?: string;
}
