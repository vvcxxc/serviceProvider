import React, { Component } from 'react';
import { TabBar, Flex } from 'antd-mobile';
import { connect } from 'dva';
import { routerRedux, withRouter } from 'dva/router';

const TabBarItem = TabBar.Item;

interface Props {
	show?: boolean;
	active: number;
	dispatch: (arg0: any) => any;
}
/**显示tabbar的页面路径集合 */
export type Pages = Array<string>;

export default withRouter(
	connect((state: any) => state.tabbar)(
		class GlobalTabbar extends Component<Props> {
			pushHome = (): any => {
				this.props.dispatch(
					routerRedux.push({
						pathname: '/dataPage'
					})
				);
			};
			pushFinance = (): any => {
				this.props.dispatch(
					routerRedux.push({
						pathname: '/finance'
					})
				);
			};
			pushQRcode = (): any => {
				this.props.dispatch(
					routerRedux.push({
						// pathname: '/QRcode'
						pathname: '/'
					})
				);
			};
			pushInvitationServiceProvider = (): any => {
				this.props.dispatch(
					routerRedux.push({
						pathname: '/InvitationServiceProvider'
					})
				);
			};
			pushPersonalInformation = (): any => {
				this.props.dispatch(
					routerRedux.push({
						pathname: '/PersonalInformation'
					})
				);
			};
			render() {
				const img1 = <img src={require('../assets/tabbar/1.png')} />;
				const img2 = <img src={require('../assets/tabbar/2.png')} />;
				const img3 = <img src={require('../assets/tabbar/3.png')} />;
				const img4 = <img src={require('../assets/tabbar/4.png')} />;
				const img5 = <img src={require('../assets/tabbar/5.png')} />;
				const img6 = <img src={require('../assets/tabbar/6.png')} />;
				const img7 = <img src={require('../assets/tabbar/7.png')} />;
				const img8 = <img src={require('../assets/tabbar/8.png')} />;
				const img9 = <img src={require('../assets/tabbar/9.png')} />;
				const img10 = <img src={require('../assets/tabbar/10.png')} />;
				return (
					<Flex direction="column" style={{ height: '100%' }}>
						<Flex.Item style={{ width: '100%', overflow: 'auto' }}>{this.props.children}</Flex.Item>
						{
							this.props.show ? (
								<TabBar
									tintColor="#547BE7"
									noRenderContent={true}
									tabBarPosition="bottom"
								>
									<TabBarItem
										icon={img3}
										selectedIcon={img8}
										title="二维码"
										onPress={this.pushQRcode}
										key={0}
										selected={this.props.active === 0}
									/>


									<TabBarItem
										icon={img1}
										selectedIcon={img6}
										title="数据"
										key={1}
										onPress={this.pushHome}
										selected={this.props.active === 1}
									/>
									<TabBarItem
										icon={img2}
										selectedIcon={img7}
										title="账单"
										key={2}
										selected={this.props.active === 2}
										onPress={this.pushFinance}
									/>

									{/* <TabBarItem
										icon={img3}
										selectedIcon={img8}
										title="二维码"
										onPress={this.pushQRcode}
										key={2}
										selected={this.props.active === 2}
									/> */}
									<TabBarItem
										icon={img4}
										selectedIcon={img9}
										title="我的邀请"
										key={3}
										selected={this.props.active === 3}
										onPress={this.pushInvitationServiceProvider}
									/>
									<TabBarItem
										icon={img5}
										selectedIcon={img10}
										title="个人信息"
										key={4}
										selected={this.props.active === 4}
										onPress={this.pushPersonalInformation}
									/>
								</TabBar>
							) : null
						}
					</Flex>
				);
			}
		}
	)
);
