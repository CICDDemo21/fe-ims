import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { Layout, Row, Col } from 'antd';

const { Header, Footer, Content } = Layout;

const headerStyle = {
  position: 'fixed',
  zIndex: 1,
  width: '100%',
  textAlign: 'center',
  color: 'white',
  fontSize: '30px',
};

ReactDOM.render(
  <>
    <Layout
      style={{
        height: '100vh',
        backgroundColor: 'white'
      }}>

      <Header
        style={headerStyle}>
        Incident Management Service
      </Header>

      <Layout>
        <Content
          className="site-layout" style={{ padding: '0 50px', marginTop: 10 }}
        >
          <div>
            <Row>
              <Col span={24}>
                <App />
              </Col>
            </Row>
          </div>
        </Content>
        <Footer
          style={{ textAlign: 'center' }}
        >
          sparescnx.com
        </Footer>
      </Layout>
    </Layout>
  </>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
