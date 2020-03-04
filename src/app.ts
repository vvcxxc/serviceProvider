export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
    },
  },
};

//路由变化
export const onRouteChange = (params: { location: any, routes: any }) => {
  // 配置微信jssdk
  let url = sessionStorage.getItem('url');
  if(url){
    return
  }else{
    sessionStorage.setItem('url',window.location.href)
  }
}
