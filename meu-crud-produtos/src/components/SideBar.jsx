import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <div className="bg-light p-3 vh-100" style={{ width: '200px'}}>
        <h5>Menu</h5>
        <ul className="list-unstyled">
            <li>
                <Link to="/" style={{ color: "#000000" }} className="text-decoration-none">Dashboard</Link>
            </li>
            <li>
                <Link to="/products" style={{ color: "#000000" }} className="text-decoration-none">Produtos</Link>
            </li>
        </ul>
    </div>
  );
}