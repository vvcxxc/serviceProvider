import { Model } from 'dva';

const model: Model = {
  namespace: 'homePage',
  state: {
    Index: 0,        //当前索引页面 用来确定是哪一个小页面
    filter: { //筛选条件
      orderBy: "today_money",
      status: "layouted"
    }, 
    showFilter:[],//筛选默认显示
    codeList: [],    //二维码页数据
    codePage: 1,
    codeTitle: {},
    
    packageList: [], //码包数据
    packagePage:1,
    queueList: [],   //铺店队列
    queuePage: 1,
    queueTitle: {
      LayoutDates: "",
      NextLayoutNum: 0,
      Ranking: "",
      row: []
    },
    record_list: [], //铺店记录
    recordPage:1

  },
  reducers: {
    setListData(state, { payload }) {//添加数据
      return {
        ...state,
        ...payload
      }
    },
    clearListData(state,{payload}) {//删除数据
      return {
        ...payload
      }
    }
    
  },
};

export default model;
