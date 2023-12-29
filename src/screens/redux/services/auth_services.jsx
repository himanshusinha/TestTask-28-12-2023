// auth_services.js
import Axios from 'axios';
import {METHODS, SERVICE_ROUTES} from '../constants';

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
        console.log(res, '............response login service');
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
      url: 'https://injazrental.onrender.com',
      method: METHODS.POST,
      headers: {'Content-Type': 'multipart/form-data'},
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
