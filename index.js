const BetterDoctorAPI = require('./modules/better-doctor');

const userKey = '7ebf62f4ff0babbfda5853f6c6fc4292';
const api = new BetterDoctorAPI(userKey);

const params = {
  name: 'george'
}

api.findDoctor(params)
   .then(console.log)
   .catch(err => console.error('Error finding doctor:', err))


