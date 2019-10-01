import {create} from 'apisauce';

const api = create({
    baseURL: 'http://api.cieemg.org.br:9001',
});

export default api;