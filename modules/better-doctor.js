const fetch         = require('node-fetch');
const { snakeCase } = require('lodash');

class BetterDoctorAPI {

  /**
   * Initializes the the baseURL and userKey for the BetterDoctor API
   * @param {string} userKey the BetterDoctor API key
   * @constructor
   */
  constructor(userKey) {
    this.userKey = `?user_key=${userKey}`;
    this.baseURL = "https://api.betterdoctor.com/2016-03-01";
  }

  /**
   * Calls the betterdoctor `/doctors` API route
   * @param {Object} params BetterDoctor API parameters
   * @returns {Promise}
   */
  findDoctor(params) {
    if (!params || Object.keys(params).length === 0) {
      return Promise.reject('No Paramaters Provided');
    }
    const url = this._generateURL(params, 'doctors')
    return fetch(url).then(res => res.json()).then(this._checkErrors);
  }

  /**
   * Serializes an object into `&` delimited query strings
   * @param {Object} params api query parameters
   * @returns {string} query strings
   */
  _formatQueries(params) {
    if (!params) return '';
    let queries = '';
    for (let p in params) {
      if (params.hasOwnProperty(p)) {
        const key = encodeURIComponent(snakeCase(p));
        const value = encodeURIComponent(params[p]);
        queries += `&${key}=${value}`;
      }
    }
    return queries;
  }

  /**
   * Generates a complete url from query params and resource type
   * @param {Object} params api query parameters
   * @param {Object} type api resource type
   * @returns {string} complete url
   */
  _generateURL(params, type) {
    return this.baseURL + `/${type}` + this.userKey + this._formatQueries(params);
  }

  /**
   * Checks for errors in the response object
   * @param {Object} response BetterDoctor API parameters
   * @returns {Promise} 
   */
  _checkErrors(response) {
    const hasError = response && response.meta && response.meta.error;
    return hasError ? Promise.reject(response.meta.message) : Promise.resolve(response);
  }

}

module.exports = BetterDoctorAPI;