import axios from 'axios';
import React from 'react';

const axious = axios.create({
  baseURL: 'http://localhost:3000',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
});

const useAxious = () => {
    return axious
};

export default useAxious;