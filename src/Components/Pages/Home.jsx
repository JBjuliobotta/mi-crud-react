import { Container, Row} from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import CardProducto from "../Sections/CardProducto";

const Home = () => {
    const [productos, setProductos] = useState([]);

  const API = import.meta.env.VITE_API;

  const getProductos = async () => {
    try {
        const response = await axios.get(`${API}/productos`);
        console.log("RESPONSE AXIOS-->", response);
        //const productos=response.data;
        //setProductos(productos);
        setProductos(response.data);

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
  return (
    <div>
      <div className="text-center">
        <h1>Catálogo de Productos</h1>
      </div>
      <div className="my-5"></div>
      <Container>
        <Row>
          {productos.map((element, index)=>{
            return (
                <CardProducto producto={element} key={index}/>
            )
          })}

        </Row>
      </Container>
    </div>
  );
};

export default Home;
