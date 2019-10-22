import React from 'react';
import GlobalTabbar from './tabbar';

const BasicLayout: React.FC = props => {
  return <GlobalTabbar>{props.children}</GlobalTabbar>;
};

export default BasicLayout;
