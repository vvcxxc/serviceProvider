import React, {Component} from 'react'

interface Props {
  onChange: ()=>any;
  isShow: boolean
}
/**
 * 只能当做触底使用，暂时不能实现那种距底部多少多少距离触发
 */
export default class ScrollBottom extends Component<Props> {
  componentDidMount (){
    if(this.props.isShow){
      let box:any = document.querySelector(".box");

      let observer = new IntersectionObserver(entries => {
        entries.forEach(item => {
          if(item.isIntersecting){
            this.props.onChange()
          }
        });
      });
      observer.observe(box); // 监听一个box
    }
  }

  // componentDidUpdate(newProps: object) {
  //   console.log(newProps,'newProps');
  //   if (newProps.isShow) {
  //     let box: any = document.querySelector(".box");

  //     let observer = new IntersectionObserver(entries => {
  //       entries.forEach(item => {
  //         if (item.isIntersecting) {
  //           this.props.onChange()
  //         }
  //       });
  //     });
  //     observer.observe(box); // 监听一个box
  //   }
  // }

  render (){
    return (
      <div className='box' style={{width: '100%', height: '1px'}}></div>
    )
  }
}
