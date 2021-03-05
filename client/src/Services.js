import fetcher from './utils/fetcher';

/**
 * @typedef IRequestConfig
 * @property {object} [params] - Parameters for GET requests
 * @property {object} [data] - Data for POST/PUT/PATCH requests
 */

export const RequestMethod = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};

/**
 * Service route constants.
 */
export const Route = {
  FOO: '/foo'
};

export default class Services {
  /**
   * A base URL used for API service calls.
   *
   * @private
   */
  static serviceBaseUrl = '';


  /**
   * Sets the base URLs for various services used by the APP.
   *
   * @param {object}
   */
  static setBaseUrls({ serviceBaseUrl }) {
    Services.serviceBaseUrl = serviceBaseUrl;
  }

  /**
   * @param {string} fooId
   */
  static async fetchFoo(fooId) {
    const route = `${Services.serviceBaseUrl}${Route.FOO}/${fooId}`;

    return (
      await Services.request(RequestMethod.GET, route)
    );
  }

  /**
   * @param {string} fooName
   */
  static async createFoo(fooName) {
    return Services.request(RequestMethod.POST, `${Services.serviceBaseUrl}${Route.FOO}`, {
      data: {
        fooName
      }
    });
  }

  /**
   * @param {string} fooId
   */
  static deleteFoo(fooId) {
    return Services.request(RequestMethod.DELETE, `${Services.serviceBaseUrl}${Route.FOO}/${fooId}`);
  }

  /**
   * @param {string} fooId
   * @param {string} fooName
   */
  static async updateFoo(fooId, fooName) {
    const route = `${Services.serviceBaseUrl}${Route.FOO}/${fooId}`;

    return Services.request(RequestMethod.PUT, route, {
      data: {
        fooName
      }
    });
  }


  /**
   * Performs a service request of the provided method type, with
   * an optionally provided request config, and resolves the response.
   *
   * @param {RequestMethod} method
   * @param {Route} route
   * @param {IRequestConfig} [requestConfig]
   * @private
   */
  static async request(method, route, requestConfig = {}) {
    try {

      let headers = {};

      const { data: response } = await fetcher.request({
        ...requestConfig,
        url: route,
        method,
        headers
      });

      return response;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`${method.toUpperCase()} error [route: '${route}']: ${error.message}`);

      const errorResponse = this.buildErrorResponse(error, {
        url: route,
        method
      });

      throw errorResponse;
    }
  }
}
