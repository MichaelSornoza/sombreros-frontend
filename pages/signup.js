import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";

import Axios from "axios";
import SC from "../server_connections/index.json";

import {
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  Row,
  Button,
} from "react-bootstrap";

const Signup = () => {
  const [form, setForm] = useState();

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await Axios.post(`${SC.api}/users`, form)
      .then((res) => {
        window.location.replace("/login");
      })
      .catch((err) => {
        alert("Error, verifica los campos enviados.");
      });
  };

  return (
    <div className='signup-page'>
      <Head>
        <title>Registro</title>
      </Head>
      <div className='background background-filter'>
        <div className='signup-container shadow'>
          <Form onSubmit={handleSubmit}>
            <Container className='signup-form-container'>
              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label htmlFor='name'>Nombres</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className='bx bxs-user-detail'></i>
                      </InputGroup.Text>
                      <Form.Control
                        id='name'
                        name='nombres'
                        type='text'
                        onChange={handleChange}
                        placeholder='Carlos Andres'
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Form.Label htmlFor='lastname'>Apellidos</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className='bx bxs-user-detail'></i>
                      </InputGroup.Text>
                      <Form.Control
                        id='lastname'
                        name='apellidos'
                        type='text'
                        onChange={handleChange}
                        placeholder='Andrade Cuzco'
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label htmlFor='phonenumber'>
                      Numero de Telefono
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className='bx bxs-phone'></i>
                      </InputGroup.Text>
                      <Form.Control
                        id='phonenumber'
                        name='phoneNumber'
                        type='text'
                        minLength={10}
                        onChange={handleChange}
                        placeholder='0999999999'
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Form.Label htmlFor='email'>Correo</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className='bx bx-mail-send'></i>
                      </InputGroup.Text>
                      <Form.Control
                        id='email'
                        name='email'
                        type='email'
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
                        id='password'
                        name='password'
                        type='password'
                        minLength={8}
                        onChange={handleChange}
                        placeholder='************'
                      />
                    </InputGroup>
                    <Form.Text className='text-muted'>
                      Minimo 8 caracteres
                    </Form.Text>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Form.Label htmlFor='password-confirmation'>
                      Confirmar Contrasena
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className='bx bxs-lock-alt'></i>
                      </InputGroup.Text>
                      <Form.Control
                        id='password-confirmation'
                        name='passwordConfirmation'
                        type='password'
                        minLength={8}
                        onChange={handleChange}
                        placeholder='************'
                      />
                    </InputGroup>
                    <Form.Text className='text-muted'>
                      Minimo 8 caracteres
                    </Form.Text>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Link href='/login'>
                    <Button
                      variant='secondary'
                      as='a'
                      className='fix-button-signup'
                      onClick={() => Router.push("/login")}
                    >
                      Iniciar Sesion
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <Button
                    variant='danger'
                    className='fix-button-signup'
                    onClick={handleSubmit}
                  >
                    Registrarse
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

export default Signup;
