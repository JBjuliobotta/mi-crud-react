import { Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";


const BorrarProducto = ({id, getProductos}) => {
    const API = import.meta.env.VITE_API
    
    const handleDelete = () => {
        Swal.fire({
            title: "Estás seguro de eliminar éste producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Borrar",
            cancelButtonText: "No, mejor no"
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API}/productos/`+id);
                    getProductos();
                } catch (error) {
                    console.log("ERROR-->", error);
                  };
                  Swal.fire({
                    title: "Éxito!",
                    text: "Se eliminó el producto",
                    icon: "success"
                  });
                }

    
            }
          );


    }


  return (
    <div>
      <Button
        type="button"
        variant="danger"
        onClick={handleDelete}
      >
        Eliminar
      </Button>
    </div>
  );
};

export default BorrarProducto;
