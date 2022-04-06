import { Layout, Row, Col } from "antd";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter>
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">© 2022 Company. All Rights Reserved</div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
