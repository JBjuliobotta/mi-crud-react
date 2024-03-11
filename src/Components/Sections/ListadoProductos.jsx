import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Producto from "./Producto";

const ListadoProductos = () => {
  const [productos, setProductos] = useState([]);

  const API = import.meta.env.VITE_API;

  const getProductos = async () => {
    try {
      const response = await fetch(`${API}/productos`);
      //console.log("RESPONSE->", response);
      const resJson = await response.json();
      //console.log("RESJSON->", resJson);
      setProductos(resJson);
    } catch (error) {
      console.log("ERROR-->", error);
    }
  };
  useEffect(() => {
    getProductos();

    return () => {
        setProductos([]);
    };
  }, []);
  //console.log("State productos--", productos);
  return (
    <div className="container-fluid">
      <div className="text-center">
        <h2>Listado de Productos</h2>
      </div>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((element) => {
            return <Producto producto={element} key={element.id} />;
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ListadoProductos;
