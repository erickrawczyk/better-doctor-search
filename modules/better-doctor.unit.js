const bdAPI      = require('./better-doctor');
const { expect } = require('chai');

describe('BetterDoctorAPI', () => {
  
  var api;
  const apiKey = 'foobar'
  const baseURL = 'https://api.betterdoctor.com/2016-03-01'

  before(() => {
    api = new bdAPI(apiKey);
  });

  describe('constructor', () => {

    it('populates user key query string', () => {
      expect(api.userKey).to.equal('?user_key=foobar');
    });

    it('populates the base URL', () => {
      expect(api.baseURL).to.equal(baseURL);      
    });

  });

  describe('formatQueries', () => {

    it('returns an empty string for an empty object', () => {
      const queries = api._formatQueries({});
      expect(queries).to.equal('');
    });

    it('returns a single parametrized property', () => {
      const obj = { foo: 'bar' };
      const queries = api._formatQueries(obj);
      expect(queries).to.equal('&foo=bar');
    });

    it('returns multiple parametrized properties', () => {
      const obj = { foo: 'bar', baz: 'qux' };
      const queries = api._formatQueries(obj);
      expect(queries).to.equal('&foo=bar&baz=qux');
    });

    it('URI encodes values', () => {
      const obj = { "foo": "bar baz" };
      const queries = api._formatQueries(obj);
      expect(queries).to.equal('&foo=bar%20baz');
    });

    it('converts camel case properties to snake case queries', () => {
      const obj = { fooBar: 'bazqux' };
      const queries = api._formatQueries(obj);
      expect(queries).to.equal('&foo_bar=bazqux')
    });

  });

  describe('generateURL', () => {
    it('generates the proper URLs', () => {
      const doctorURL = api._generateURL({name: 'george'}, 'doctors')
      expect(doctorURL).to.equal(`${baseURL}/doctors?user_key=${apiKey}&name=george`)
      const practicesURL = api._generateURL({name: 'hospital'}, 'practices')
      expect(practicesURL).to.equal(`${baseURL}/practices?user_key=${apiKey}&name=hospital`)
    });
  });

  describe('findDoctor', () => {

    it('throws error when no params object is provided', () => {
      const result = api.findDoctor();
      result.catch(err => {
        expect(err).to.equal('No Paramaters Provided');
      })
    });

    it('throws error when empty params are provided', () => {
      const result = api.findDoctor({});
      result.catch(err => {
        expect(err).to.equal('No Paramaters Provided');
      })
    });

  });

  describe('checkErrors', () => {

    it('Rejects BetterDoctor level API errors', () => {
      const response = {
        meta: {
          error: true,
          message: 'Invalid'
        }
      }
      return api._checkErrors(response).catch(err => {
        expect(err).to.equal('Invalid');
      });
    });

    it('Allows valid data', () => {
      const response = {
        data: [ {foo: 'bar'} ],
        meta: { data_type: 'array', item_type: 'Doctor' }
      };
      return api._checkErrors(response).then(result => {
        expect(result).to.equal(response);
      });
    });
  
  });

});