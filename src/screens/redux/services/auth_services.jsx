// auth_services.js
import Axios from 'axios';
import {METHODS} from '../constants';

//loginService
export const loginService = data => {
  return new Promise((resolve, reject) => {
    let config = {
      url: 'https://api.injazrent.ae/user/login',
      method: METHODS.POST,
      data,
    };

    Axios.request(config)
      .then(res => {
        console.log(res, '.......response from signup services');

        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

//signUpService
export const signUpService = data => {
  return new Promise((resolve, reject) => {
    let config = {
      url: 'https://injazrental.onrender.com/user/signUp',
      method: METHODS.POST,
      data,
    };

    Axios.request(config)
      .then(res => {
        console.log(res, '.......response from signup services');

        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
// getAllCarsService
export const getAllCarsService = (data = {}) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: 'https://api.injazrent.ae/user/getAllCars',
      method: METHODS.GET,
      data: data,
    };

    Axios.request(config)
      .then(res => {
        console.log(res, '.......response from get all cars services');
        resolve(res);
      })
      .catch(err => {
        console.error('Error in getAllCarsService:', err.message);
        reject(err.message); // Reject with a specific error message
      });
  });
};
