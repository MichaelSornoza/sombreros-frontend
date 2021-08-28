import Layout from "../../components/layout/index";

import { useState, useMemo, createRef } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Row,
  Col,
  FormGroup,
} from "react-bootstrap";

import Axios from "axios";
import nookies from "nookies";
import SC from "../../server_connections/index.json";

import DataTable from "react-data-table-component";
import ExpandedComponent from "../../components/reports_admin/ExpandedComponent";

import FormData from "form-data";

const Add = ({ onAdd }) => (
  <Button onClick={(e) => onAdd(e.target.value)}>Agregar</Button>
);

const Admin = ({ access_token, user, products }) => {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [form, setForm] = useState({
    stock: "Ilimitado",
  });
  const [editForm, setEditForm] = useState({});

  const inputRef = createRef();
  const editInputRef = createRef();

  const columns = useMemo(() => [
    {
      name: "Id",
      selector: "id",
      sortable: true,
      width: "70px",
      key: 1,
      id: 1,
    },
    {
      name: "Nombre",
      selector: "name",
      sortable: true,
    },
    {
      name: "Stock",
      selector: "stock",
      sortable: true,
    },
    {
      name: "Precio",
      selector: "price",
      sortable: true,
    },
    {
      name: "Creado",
      selector: "createdAt",
      sortable: true,
    },
    {
      name: "Actualizado",
      selector: "updatedAt",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className='actions'>
          <div className='action-button' onClick={() => handleEdit(row)}>
            <i className='bx bxs-edit-alt'></i>
          </div>
          <div className='action-button' onClick={() => handleDelete(row)}>
            <i className='bx bxs-trash'></i>
          </div>
        </div>
      ),
    },
  ]);

  const handleEdit = (product) => {
    setEditForm(product);
    console.log(product);
    setEditModal(true);
  };

  const actionsMemo = useMemo(() => <Add onAdd={() => setModal(true)} />, []);

  const handleImageSelection = async (event) => {
    let formData = new FormData();
    for (let i = 0; i < inputRef.current.files.length; i++) {
      formData.append("image", inputRef.current.files[i]);
    }

    await Axios.post(`${SC.api}/products/image`, formData, {
      headers: {
        Authorization: `bearer ${access_token}`,
      },
    })
      .then((res) => {
        setForm({
          ...form,
          image: res.data,
        });
      })
      .catch((err) => {
        alert("Error al subir imagenes, contacte al soporte");
      });
  };

  const handleEditImageSelection = async (event) => {
    let formData = new FormData();
    for (let i = 0; i < editInputRef.current.files.length; i++) {
      formData.append("image", inputRef.current.files[i]);
    }

    await Axios.post(`${SC.api}/products/image`, formData, {
      headers: {
        Authorization: `bearer ${access_token}`,
      },
    })
      .then((res) => {
        setEditForm({
          ...form,
          image: res.data,
        });
      })
      .catch((err) => {
        alert("Error al subir imagenes, contacte al soporte");
      });
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditChange = (event) => {
    setEditForm({
      ...editForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();

    await Axios.post(`${SC.api}/products`, form, {
      headers: {
        Authorization: `bearer ${access_token}`,
      },
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert("Error, verifica los campos o contacte a soporte");
      });
  };

  const handleEditSubmit = async (event) => {
    if (event) event.preventDefault();

    await Axios.patch(`${SC.api}/products/${editForm.id}`, editForm, {
      headers: {
        Authorization: `bearer ${access_token}`,
      },
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert("Error al actualizar producto");
      });
  };

  const handleDelete = async (product) => {
    await Axios.delete(`${SC.api}/products/${product.id}`, {
      headers: {
        Authorization: `bearer ${access_token}`,
      },
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert("Error al eliminar el producto");
      });
  };

  return (
    <Layout user={user} access_token={access_token}>
      <div className='main-background main-background-filter'>
        <div className='products-admin-card-content'>
          <DataTable
            columns={columns}
            className='products-table'
            title='Tabla de Productos'
            striped
            highlightOnHover
            data={products || []}
            expandableRows
            expandableRowsComponent={<ExpandedComponent />}
            actions={actionsMemo}
          />
        </div>
      </div>
      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Container>
              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label htmlFor='name'>Nombre del Producto</Form.Label>
                    <Form.Control
                      name='name'
                      id='name'
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Form.Label>Stock del Producto</Form.Label>
                    <Form.Control value='Ilimitado' disabled />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label htmlFor='price'>Precio del Producto</Form.Label>
                    <Form.Control
                      name='price'
                      id='price'
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label htmlFor='image'>
                      Seleccione las Fotos del Incidente
                    </Form.Label>
                    <Form.Control
                      type='file'
                      id='image'
                      multiple
                      ref={inputRef}
                      onChange={(e) => handleImageSelection(e)}
                    ></Form.Control>
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setModal(false)}>
            Cerrar
          </Button>
          <Button variant='primary' onClick={() => handleSubmit()}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editForm.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Container>
              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label htmlFor='name'>Nombre del Producto</Form.Label>
                    <Form.Control
                      name='name'
                      id='name'
                      value={editForm.name}
                      onChange={handleEditChange}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Form.Label>Stock del Producto</Form.Label>
                    <Form.Control value='Ilimitado' disabled />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label htmlFor='price'>Precio del Producto</Form.Label>
                    <Form.Control
                      name='price'
                      id='price'
                      value={editForm.price}
                      onChange={handleEditChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label htmlFor='image'>
                      Seleccione las Fotos del Incidente
                    </Form.Label>
                    <Form.Control
                      type='file'
                      id='image'
                      multiple
                      ref={editInputRef}
                      onChange={(e) => handleEditImageSelection(e)}
                    ></Form.Control>
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setEditModal(false)}>
            Cerrar
          </Button>
          <Button variant='primary' onClick={() => handleEditSubmit()}>
            Guardar
          </Button>
        </Modal.Footer>
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

  if (!user) {
    ctx.res.writeHead(302, { location: "/" });
    ctx.res.end();
    return { props: {} };
  }

  if (user.role !== "admin") {
    ctx.res.writeHead(302, { location: "/" });
    ctx.res.end();
    return {
      props: {
        access_token,
        user,
      },
    };
  }

  return {
    props: {
      access_token,
      user,
      products,
    },
  };
};

export default Admin;
