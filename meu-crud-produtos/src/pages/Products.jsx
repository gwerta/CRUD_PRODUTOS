import { useEffect, useState } from "react";
import api from "../services/api";
import $ from "jquery";
import "datatables.net";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const loadProducts = async () => {
    const response = await api.get("/products");
    setProducts(response.data);
    $("#productsTable").DataTable();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
   if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      await api.delete(`/products/${id}`);
      loadProducts();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Produtos</h2>
      <Button className="mb-3" onClick={() => navigate("/products/new")}>
        Novo Produto
      </Button>
        <table id="productsTable" className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Ativo</th>
              <th>Data de Criação</th>
              <th>Data de Atualização</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.nome}</td>
                <td>{product.preco.toFixed(2)}</td>
                <td>{product.ativo ? "Sim" : "Não"}</td>
                <td>{product.data_criacao}</td>
                <td>{product.data_atualizacao}</td>
                <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => navigate(`/products/edit/${product.id}`)}
                    >
                      <FaEdit />
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <FaTrash />
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
  };