import Request from '@/service/request';


/*
  首页总数汇总
*/
export const getTotalData = () => {
  return Request({
    url: '/qrCodeCalc',
    method: 'GET'
  })
}

/* 
  已铺设二维码 
*/
export const getAlreadyLayingData = (params: Object) => {
  return Request({
    url: '/qrCodeLaid',
    method: "GET",
    params
  })
}

/* 未铺设二维码 */
export const getNoLayingData = (params: Object) => {
  return Request({
    url: '/qrCodeUnLaid',
    method: "GET",
    params
  })
}

/* 全部二维码 */
export const getAllListData = (params: Object) => {
  return Request({
    url: '/qrCodeAll',
    method: "GET",
    params
  })
}

/* 请求码包页面数据  */
export const getCodePackageData = (params: Object) => {
  return Request({
    url: '/Packages',
    method: "GET",
    params
  })
}


/* 请求铺垫队列页数据  */
export const getQueueData = (params: Object) => {
  return Request({
    url: '/Attacheds',
    method: "GET",
    params
  })
}


/*请求列表记录页数据  */
export const getRecordData = (params:Object) => {
  return Request({
    url: '/LayoutLog',
    method: "GET",
    params
  })
}

/*二维码列表搜索  */
export const getSearchData = (params: Object) => {
  return Request({
    url: '/qrCodeSearch',
    method: "GET",
    params
  })
}