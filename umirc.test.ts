import { IConfig } from 'umi-types';
const config: IConfig = {
  define: {
    "process.env.apiUrl": 'http://test.service_provider_api.tdianyi.com/',
    "window.api": "http://api.supplier.tdianyi.com/",
  }
}
export default config;
