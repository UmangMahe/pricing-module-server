import React from "react";
import LoginForm from "../../components/LoginForm";
import { Card, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { APP_BASE_URL, AUTH_PREFIX_PATH } from "../../../../configs/AppConfig";

const backgroundStyle = {
  backgroundImage: `url(${APP_BASE_URL}/img/others/img-17.jpg)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const LoginOne = (props) => {
  return (
    <div className="h-100" style={backgroundStyle}>
      <div className="container d-flex flex-column justify-content-center h-100">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={7}>
            <Card>
              <div className="my-4">
                <div className="text-center">
                  <h1 className="heading">Pricing Module v2</h1>
                  {/* <img className="img-fluid" src={`/img/${theme === 'light' ? 'logo.png': 'logo-white.png'}`} alt="" /> */}
                  <p className="my-3">
                    Don't have an account yet?{" "}
                    <Link to={AUTH_PREFIX_PATH+'/register'}>Sign Up</Link>
                  </p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <LoginForm {...props} />
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginOne;
