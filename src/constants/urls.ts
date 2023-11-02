const baseURL = process.env.BASE_URL || 'http://localhost:5000';

const orders = '/orders';
const groups = '/groups';
const users = '/users';
const auth = '/auth';

const urls = {
  orders: {
    orders,
    getById: (id: number): string => `${orders}/${id}`,
    addComment: (id: number): string => `${orders}/${id}/comments`,
    getStatistic: `${orders}/statistic`,
    getExcel: `${orders}/excel`,
  },

  users: {
    users,
    getStatistic: (id: number): string => `${users}/${id}/statistic`,
    getActivateToken: (id: number): string => `${users}/${id}/activateToken`,
    ban: (id: number): string => `${users}/${id}/ban`,
    unban: (id: number): string => `${users}/${id}/unban`,
  },
  auth: {
    auth,
    login: `${auth}/login`,
    refreshToken: `${auth}/refresh-token`,
  },
  groups: { groups },
};

export { baseURL, urls };
