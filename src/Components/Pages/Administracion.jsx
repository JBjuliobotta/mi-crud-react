import ListadoProductos from "../Sections/ListadoProductos";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Administracion = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="container my-3 py-3">
                <Button onClick={()=>{navigate("/crearproducto")}} variant="primary">Crear Producto</Button>
            </div>
            <ListadoProductos/>
                        
        </div>
    );
};

export default Administracion;