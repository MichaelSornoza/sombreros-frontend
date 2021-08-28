import Axios from "axios";
import { setCookie } from "nookies";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import SC from "../server_connections/index.json";
import {
  Container,
  Form,
  FormGroup,
  InputGroup,
  Row,
  Col,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import Router from "next/router";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await Axios.post(`${SC.api}/auth/login`, form)
      .then((res) => {
        const token = res.data.access_token;
        setCookie(null, "access_token", token);
        Router.push("/");
      })
      .catch((err) => {
        alert("Error, revise sus credenciales");
      });
  };

  return (
    <div className='login-page'>
      <Head>
        <title>Inicio de Sesion</title>
      </Head>
      <div className='background background-filter'>
        <div className='login-form-container'>
          <Form className='login-form' action='submit' onSubmit={handleSubmit}>
            <Container className='login-form-container-child'>
              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label htmlFor='email'>Correo Electronico</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className='bx bxs-id-card'></i>
                      </InputGroup.Text>
                      <Form.Control
                        type='email'
                        id='email'
                        name='email'
                        required
                        onChange={handleChange}
                        placeholder='correo@correo.com'
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label htmlFor='password'>Contrasena</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className='bx bxs-lock-alt'></i>
                      </InputGroup.Text>
                      <Form.Control
                        type='password'
                        id='password'
                        name='password'
                        required
                        onChange={handleChange}
                        placeholder='**************'
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>

              <Row lg={2} md={2} xs={1}>
                <Col>
                  <Link href='/signup'>
                    <Button
                      variant='secondary'
                      onClick={() => Router.push("/signup")}
                      as='a'
                      className='fix-button'
                    >
                      Registrarse
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <Button
                    variant='danger'
                    className='fix-button'
                    onClick={handleSubmit}
                  >
                    Iniciar Sesion
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
