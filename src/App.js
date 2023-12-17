// src/App.js
import React, { useState, useEffect } from 'react';
import ProductList from './componentes/productolista';
import ProductForm from './componentes/productoform';
import './componentes/estilo.css';


const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formProduct, setFormProduct] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleSubmit = () => {
    if (!formProduct.name || !formProduct.price) {
      alert('Nombre y precio son obligatorios');
      return;
    }

    if (selectedProduct) {
      // Modificar producto existente
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProduct.id ? { ...product, ...formProduct } : product
        )
      );
      setSelectedProduct(null);
    } else {
      // Agregar o editar nuevo producto
      if (formProduct.id) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === formProduct.id ? { ...product, ...formProduct } : product
          )
        );
      } else {
        setProducts((prevProducts) => [...prevProducts, { id: Date.now(), ...formProduct }]);
      }
    }

    setFormProduct({ name: '', description: '', price: '' });
  };

  const handleDelete = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormProduct(product);
  };

  return (
    <div>
      <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
      <ProductForm
        formProduct={formProduct}
        setFormProduct={setFormProduct}
        onSubmit={handleSubmit}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default App;

