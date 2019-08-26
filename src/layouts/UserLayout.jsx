import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import Link from 'umi/link';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import SelectLang from '@/components/SelectLang';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;

  let titleStr = '';

  const {
    location: { pathname },
  } = props;
  if (pathname === '/user/forget-password' || pathname === '/user/recover-password') {
    titleStr = '找回密码';
  } else {
    titleStr = '广州中集车辆销售有限公司';
  }

  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props,
      })}
    >
      <div className={styles.LoginWrapper}>
        <div className={styles.loginLeft}>123</div>
        <div className={styles.loginRight}>
          <div className={styles.loginRightContent}>
            <p className={styles.loginTitle}>{titleStr}</p>
            {children}
          </div>
        </div>
      </div>
    </DocumentTitle>

    // <DocumentTitle
    //   title={getPageTitle({
    //     pathname: location.pathname,
    //     breadcrumb,
    //     formatMessage,
    //     ...props,
    //   })}
    // >
    //   <div className={styles.container}>
    //     <div className={styles.lang}>
    //       <SelectLang />
    //     </div>
    //     <div className={styles.content}>
    //       <div className={styles.top}>
    //         <div className={styles.header}>
    //           <Link to="/">
    //             <img alt="logo" className={styles.logo} src={logo} />
    //             <span className={styles.title}>Ant Design</span>
    //           </Link>
    //         </div>
    //         <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
    //       </div>

    //     </div>
    //     <DefaultFooter />
    //   </div>
    // </DocumentTitle>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
