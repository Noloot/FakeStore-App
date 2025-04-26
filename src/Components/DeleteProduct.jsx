import { useState, useEffect } from 'react';
import { Button, Modal, Alert, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteProduct = () => {
    const { id: productId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setShowModal(true);
    }, []);

    const handleClose = () => {
        setShowModal(false);
        navigate(`/products/${productId}`);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://fakestoreapi.com/products/${productId}`);
            setSuccess(true);
            setError(null);
            setShowModal(false);
            setTimeout(() => navigate('/products'), 2000); // Redirect to Product Listing page after deletion
        } catch (err) {
            setError('Error deleting the product. Please try again.');
            setSuccess(false);
        }
    };

    return (
        <>
            <Container className='mt-5 text-center'>
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this product? This action cannot be undone.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                {success && <Alert variant='success'>Product deleted successfully! Redirecting...</Alert>}
                {error && <Alert variant='danger'>{error}</Alert>}
            </Container>
           
        </>
    );
};

export default DeleteProduct;