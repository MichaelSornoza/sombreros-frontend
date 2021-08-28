import { Container, Row, Col } from "react-bootstrap";

import SC from "../../server_connections/index.json";

const ExpandedComponent = ({ data }) => {
  console.log(data);

  return (
    <Container>
      <Row>
        <Col>
          <div className='expanded-container'>
            <img
              className='expanded-image'
              src={`${SC.api}/products/image/${data.image || ""}`}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpandedComponent;
