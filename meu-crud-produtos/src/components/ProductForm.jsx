import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from "../services/api";
import {Form, Button} from "react-bootstrap";

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        nome: "",
        preco: "",
        ativo: true,
        data_criacao: new Date().toISOString().split('T')[0],
        data_atualizacao: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (id) {
            api.get(`/products/${id}`).then((response) => {
                setProduct(response.data);
            });
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setProduct({ ...product, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const produtoParaSalvar = {
            ...product,
            preco: Number(product.preco) // garante que seja número
        };
        if (id) {
            await api.put(`/products/${id}`, produtoParaSalvar);
        } else {
            await api.post('/products', produtoParaSalvar);
        }
        navigate('/products');
    } catch (error) {
        console.error(error);
    }
};
    return (
        <div className="container mt-4">
            <h1>{id ? 'Editar Produto' : 'Adicionar Produto'}</h1>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text" 
                        name="nome"
                        value={product.nome}
                        onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        name="preco"
                        value={product.preco}
                        onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Ativo"
                        name="ativo"
                        checked={product.ativo}
                        onChange={handleChange} />
                </Form.Group>
                
                <Button variant="success" type="submit">
                    Salvar
                </Button>
            </Form>
                </div>
    );
}
