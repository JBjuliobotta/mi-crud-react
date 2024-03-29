import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Editar = () => {
  const [producto, setProducto] = useState(undefined);
  const { id } = useParams();
  //UTILIZAMOS LA VARIABLE DE ENTORNO
  const API = import.meta.env.VITE_API;

  const getProducto = async () => {
    try {
      const { data } = await axios.get(`${API}/productos/${id}`);
      setProducto(data);
    } catch (error) {
      console.log("error-->", error);
    }
  };

  useEffect(() => {
    console.log("id del producto a editar->", id);
    getProducto();
  }, []);

  //console.log("API-->", API);

  //UTILIZAMOS useNavigate
  const navigate = useNavigate();
  //inicio config formik

  const ProductoSchema = Yup.object().shape({
    title: Yup.string()
      .min(4, "min. 4 caracteres")
      .max(20, "máx. 20 caracteres")
      .required("el campo es requerido"),
    description: Yup.string().min(4).max(200).required("el campo es requerido"),
    category: Yup.string().required("el campo es requerido"),
  });

  const initialValues = {
    title: "",
    description: "",
    category: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ProductoSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log("values de formik->", values);
      Swal.fire({
        title: "Estás seguro de guardar éste producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(`${API}/productos/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });
            //console.log("RESPONSE", response);
            //console.log(response.status);
            if (response.status === 200) {
              //formik.resetForm();
              Swal.fire({
                title: "Éxito!",
                text: "Se actualizó correctamente el producto",
                icon: "success",
              });
              navigate('/administracion')
            }
          } catch (error) {
            console.log("ERROR-->", error);
          }
        }
      });
    },
  });
  //fin config formik

  /* const handleSubmit = (e) => {
    e.preventDefault();
    console.log("desde submit");
    const nuevoProducto = {
      titulo: title,
      descripcion: description,
      categoria: category,
    };
    console.log("nuevo producto-->", nuevoProducto);
  };*/
  useEffect(()=>{
    if (producto !== undefined) {
    formik.setFieldValue('title', producto.title, true);
    formik.setFieldValue('description', producto.description, true);
    formik.setFieldValue('category', producto.category, true);
    }
  },[producto])

  return (
    <div className="container py-3 my-3">
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Atras
      </Button>{" "}
      {/*se puede usar el menos 1 si es para volver una vez*/}
      <div className="text-center">
        <h2>Editar Producto</h2>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el título del producto"
            minLength={4}
            maxLength={25}
            //value={title}
            /*onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}*/
            name="title"
            {...formik.getFieldProps("title")}
            className={clsx(
              "form-control",
              {
                "is-invalid": formik.touched.title && formik.errors.title,
              },
              {
                "is-valid": formik.touched.title && !formik.errors.title,
              }
            )}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.title}</span>
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese una descripción"
            as="textarea"
            rows={3}
            minLength={4}
            maxLength={200}
            //value={description}
            //onChange={(e) => {
            //  setDescription(e.currentTarget.value);
            //}}
            name="description"
            {...formik.getFieldProps("description")}
            className={clsx(
              "form-control",
              {
                "is-invalid":
                  formik.touched.description && formik.errors.description,
              },
              {
                "is-valid":
                  formik.touched.description && !formik.errors.description,
              }
            )}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.description}</span>
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            aria-label="category"
            /*value={category}
            onChange={(e) => {
              let resultado=validarCategoria(e.currentTarget.value);
              console.log("resultado de validar", resultado);
              SetCategory(e.currentTarget.value);
            }} className={clsx("form-select",
            {
              "is-valid": validarCategoria(category)
            },
            {
              "is-invalid": !validarCategoria(category)
            }
            )}*/
            name="category"
            {...formik.getFieldProps("category")}
            className={clsx(
              "form-control",
              {
                "is-invalid": formik.touched.category && formik.errors.category,
              },
              {
                "is-valid": formik.touched.category && !formik.errors.category,
              }
            )}
          >
            <option value="">Seleccione una categoría</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Limpieza">Limpieza</option>
          </Form.Select>
          {formik.touched.category && formik.errors.category && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.category}</span>
            </div>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </div>
  );
};

export default Editar;
