import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './Components/NavigationBar';
import Home from './Components/Home';
import ProductList from './Components/ProductList';
import ProductDetails from './Components/ProductDetails';
import AddProduct from './Components/AddProduct';
import EditProduct from './Components/EditProduct';
import DeleteProduct from './Components/DeleteProduct';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path='/delete-product/:id' element={<DeleteProduct />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;