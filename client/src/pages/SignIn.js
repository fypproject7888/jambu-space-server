/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Layout, Button, Row, Col, Typography, Form, Input } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import signinbg from "../assets/images/img-signin.jpg";
import { login } from "../redux/actions/authActions";
import { toast } from "react-toastify";

const { Title } = Typography;
const { Header, Content } = Layout;

function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("authUser")) history.goBack();
  }, []);

  const onFinish = values => {
    dispatch(login(values));
  };

  const onFinishFailed = errorInfo => {
    toast(errorInfo);
  };

  return (
    <Layout className="layout-default layout-signin">
      <Header>
        <div className="header-col header-brand">
          <h5>Jambu Space</h5>
        </div>
      </Header>
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around" style={{ height: "80vh" }}>
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 6, offset: 2 }}
            md={{ span: 12 }}
          >
            <Title className="mb-15">Sign In</Title>
            <Title className="font-regular text-muted" level={5}>
              Enter your email and password to sign in
            </Title>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                    type: "email",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                className="username"
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  SIGN IN
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col
            className="sign-img"
            style={{ padding: 12, height: "100%" }}
            xs={{ span: 24 }}
            lg={{ span: 12 }}
            md={{ span: 12 }}
          >
            <img
              src={signinbg}
              alt=""
              style={{ height: "100%", width: "auto", margin: "0 auto" }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default SignIn;
