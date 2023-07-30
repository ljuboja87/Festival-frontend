import axios from "axios";


var FestivalsAxios = axios.create({
    baseURL: 'http://localhost:8080/'
});

FestivalsAxios.interceptors.request.use(
    function interceptor(config){
      const token = window.localStorage['token']
      if(token){
        config.headers['Authorization']="Bearer " + token
      }
      return config;
    }
  );

export default FestivalsAxios;