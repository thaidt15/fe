import React from 'react';
import { Button, Card, Layout } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { GoogleLogin } from 'react-google-login';

const { Content } = Layout;

const LoginPage = () => {
  const responseGoogle = (response) => {
    console.log(response);
    // Handle the response: either send the token to the server or handle errors
  };

  return (
    <Layout style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{ width: 300, textAlign: 'center' }}>
          <h3>Login to Your Account</h3>
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"
            render={renderProps => (
              <Button
                type="primary"
                icon={<GoogleOutlined />}
                size="large"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                block
              >
                Log in with Google
              </Button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;
