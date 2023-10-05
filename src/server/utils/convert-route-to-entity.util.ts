const mapping: Record<string, string> = {
  administrators: 'administrator',
  companies: 'company',
  orders: 'order',
  owners: 'owner',
  products: 'product',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
