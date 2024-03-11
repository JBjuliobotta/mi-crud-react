import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//import BorrarProducto from "./BorrarProducto";
import Swal from "sweetalert2";
//import axios from "axios";

const Producto = ({ producto, handleShow, getProductos }) => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API;
  const handleDelete = () => {
    Swal.fire({
      title: "Estás seguro de eliminar éste producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "No, mejor no",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`${API}/productos/` + producto.id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          getProductos();
        } catch (error) {
          console.log("ERROR-->", error);
        }
        Swal.fire({
          title: "Éxito!",
          text: "Se eliminó el producto",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <tr>
        <td>{producto.id}</td>
        <td>{producto.title}</td>
        <td>{producto.description}</td>
        <td>{producto.category}</td>
        <td className="d-flex justify-content-around">
          <Button
            type="buton"
            variant="warning"
            onClick={() => {
              navigate(`/editar/${producto.id}`);
            }}
          >
            Editar
          </Button>
          <Button
            type="button"
            variant="success"
            onClick={() => {
              console.log("desde modal edicion");
              handleShow(producto);
            }}
          >
            M.Eliminar
          </Button>
          <Button type="button" variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
          {/*<BorrarProducto id={producto.id} getProductos={getProductos}/>*/}
        </td>
      </tr>
    </>
  );
};

export default Producto;
