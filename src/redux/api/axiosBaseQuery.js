export const axiosBaseQuery =
  ({ axiosInstance, baseUrl } = { baseUrl: '' }) =>
  async ({ url, method = 'GET', data, params, headers, skipAuth }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        skipAuth,
      });

      return { data: result.data };
    } catch (error) {
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };
