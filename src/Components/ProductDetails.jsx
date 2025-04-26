import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col, Spinner, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    useEffect(() => {
        axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch product details. Please try again later.');
                setLoading(false);
            });
    }, [id]);

    const handleEdit = () => {
        navigate(`/edit-product/${id}`);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://fakestoreapi.com/products/${id}`);
            setDeleteSuccess(true);
            setDeleteError(null);
            setShowModal(false);
            setTimeout(() => navigate(`/products`), 2000);
        } catch (err) {
            setDeleteError('Error deleting the product. Please try again.');
            setDeleteSuccess(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" variant="primary" />
                <p>Loading product details...</p>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    return (
        <Container>
            <Row className="my-5">
                <Col md={6}>
                    <Card>
                        <Card.Img variant="top" src={product.image} />
                        <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
                            <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>

                            <div className="d-flex gap-2 mb-3">
                                <Button variant="primary" onClick={handleEdit}>Edit</Button>
                                <Button variant="danger" onClick={handleShowModal}>Delete</Button>
                            </div>

                            {deleteSuccess && (
                                <Alert variant="success">Product deleted successfully! Redirecting...</Alert>
                            )}
                            {deleteError && (
                                <Alert variant="danger">{deleteError}</Alert>
                            )}

                            <Link to="/products">
                                <Button variant="secondary">Back to Product List</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this product? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProductDetails;