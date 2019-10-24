import { IConfig } from 'umi-types';
const config: IConfig = {
  define: {
    "process.env.apiUrl": 'http://test.service_provider_api.tdianyi.com/',
    "API": "http://api.supplier.tdianyi.com/",
  }
}
export default config;
