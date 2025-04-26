import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Style.css';

const Home = () => {
  return (
    <Container className="text-center">
      <Row className="my-5">
        <Col>
          <h1>Welcome to My Product Store!</h1>
          <p>Your one-stop shop for amazing products. Browse, add, or manage products easily!</p>
          <Link to="/products">
            <Button variant="primary" size="lg">
              View Products
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;