// src/components/ProductForm.js
import React from 'react';

const ProductForm = ({ formProduct, setFormProduct, onSubmit, selectedProduct }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>{selectedProduct ? 'Modificar Producto' : 'Agregar Producto'}</h2>
      <label>
        Nombre:
        <input
          type="text"
          value={formProduct.name}
          onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
        />
      </label>
      <label>
        Descripción:
        <input
          type="text"
          value={formProduct.description}
          onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })}
        />
      </label>
      <label>
        Precio:
        <input
          type="text"
          value={formProduct.price}
          onChange={(e) => setFormProduct({ ...formProduct, price: e.target.value })}
        />
      </label>
      <button type="submit">{selectedProduct ? 'Modificar' : 'Agregar'}</button>
    </form>
  );
};

export default ProductForm;
