import queryString from 'query-string';
import { AdministratorInterface, AdministratorGetQueryInterface } from 'interfaces/administrator';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAdministrators = async (
  query?: AdministratorGetQueryInterface,
): Promise<PaginatedInterface<AdministratorInterface>> => {
  return fetcher('/api/administrators', {}, query);
};

export const createAdministrator = async (administrator: AdministratorInterface) => {
  return fetcher('/api/administrators', { method: 'POST', body: JSON.stringify(administrator) });
};

export const updateAdministratorById = async (id: string, administrator: AdministratorInterface) => {
  return fetcher(`/api/administrators/${id}`, { method: 'PUT', body: JSON.stringify(administrator) });
};

export const getAdministratorById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/administrators/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteAdministratorById = async (id: string) => {
  return fetcher(`/api/administrators/${id}`, { method: 'DELETE' });
};
