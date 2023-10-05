import { AdministratorInterface } from 'interfaces/administrator';
import { OwnerInterface } from 'interfaces/owner';
import { ProductInterface } from 'interfaces/product';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  administrator?: AdministratorInterface[];
  owner?: OwnerInterface[];
  product?: ProductInterface[];
  user?: UserInterface;
  _count?: {
    administrator?: number;
    owner?: number;
    product?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
