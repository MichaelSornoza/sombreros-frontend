import Router from "next/router";
import nookies from "nookies";
import { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";

import Axios from "axios";
import SC from "../server_connections/index.json";

import Layout from "../components/layout";
const Home = ({ access_token, user, products }) => {
  const [modal, setModal] = useState({
    show: false,
    productToBuy: "",
  });

  const handleModal = (productToBuy) => {
    setModal({
      show: !modal.show,
      productToBuy: productToBuy,
    });
  };

  const test = () => {
    Axios.post(
      `${SC.api}/products`,
      {
        name: "test",
        price: "test",
        image: "test",
        stock: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout user={user}>
      <div className='main-background main-background-filter'>
        <div className='products-card-content'>
          <div className='title'>
            <h1>Stock de Productos</h1>
          </div>
          {products && (
            <div className='products-container'>
              {products.map((product, index) => (
                <Card
                  size='xs'
                  className='modified-card shadow'
                  style={{ cursor: "pointer" }}
                  onClick={() => handleModal(product.name)}
                  key={index}
                >
                  <Card.Img
                    variant='top'
                    src={`${SC.api}/products/image/${product.image}`}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <p>
                      Stock: <strong>{product.stock}</strong>
                    </p>
                    <p>
                      Precio:<strong>{product.price}</strong>
                    </p>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Modal show={modal.show} onHide={handleModal} className='buy-modal'>
        <Card className='buy-card'>
          <Card.Header>
            <strong>{modal.productToBuy}</strong>
          </Card.Header>
          <Card.Body>
            {user ? (
              <div className='buy-options'>
                <div className='paypal-button'>
                  <form
                    action='https://www.paypal.com/cgi-bin/webscr'
                    method='post'
                    target='_top'
                  >
                    <input type='hidden' name='cmd' value='_s-xclick' />
                    <input
                      type='hidden'
                      name='hosted_button_id'
                      value='GBYWAZE5SNCLG'
                    />
                    <input
                      type='image'
                      src='https://www.paypalobjects.com/es_XC/i/btn/btn_buynowCC_LG.gif'
                      border='0'
                      name='submit'
                      alt='PayPal - The safer, easier way to pay online!'
                    />
                    <img
                      alt=''
                      border='0'
                      src='https://www.paypalobjects.com/es_XC/i/scr/pixel.gif'
                      width='1'
                      height='1'
                    />
                  </form>
                </div>
                <strong>Or</strong>
                <a
                  className='whatsapp-button'
                  target='_blank'
                  href='https://wa.me/+593994358532/?text=Quisiera%20mayor%20informacion%20sobre%20los%20sombreros'
                >
                  <i className='bx bxl-whatsapp-square'></i>
                </a>
              </div>
            ) : (
              <div className='not-login-message'>
                <div className='message'>
                  <p>
                    Es necesario iniciar sesion para continuar con la compra
                  </p>
                </div>
                <div className='not-login-buttons'>
                  <Button onClick={() => Router.push("/login")}>
                    Iniciar Sesion
                  </Button>
                  <Button
                    variant='danger'
                    onClick={() => Router.push("/signup")}
                  >
                    Registrarse
                  </Button>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      </Modal>
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  const access_token = cookies.access_token || null;

  let user = {};
  let products = {};
  await Axios.get(`${SC.api}/users/me`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((res) => {
      user = res.data;
    })
    .catch((err) => {
      user = null;
    });

  await Axios.get(`${SC.api}/products`)
    .then((res) => {
      products = res.data;
    })
    .catch((err) => {
      products = null;
    });

  return {
    props: {
      access_token,
      user,
      products,
    },
  };
};

export default Home;
