import { Modal, Button } from "react-bootstrap";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

const ModalEditar = ({ show, handleClose, producto, getProductos }) => {
  const API = import.meta.env.VITE_API;
  //const navigate = useNavigate();

  useEffect(() => {
    if (producto) {
        formik.setFieldValue('title', producto.title, true);
        formik.setFieldValue('description', producto.description, true);
        formik.setFieldValue('category', producto.category, true);
    }
  }, [producto]);

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
            const response = await axios.put(`${API}/productos/${producto.id}`, values);

            if (response.status === 200) {
              //formik.resetForm();
              Swal.fire({
                title: "Éxito!",
                text: "Se actualizó correctamente el producto",
                icon: "success",
              });
              //navigate("/administracion");
              CloseModal();
            }
          } catch (error) {
            console.log("ERROR-->", error);
          }
        }
      });
    },
  });

  const CloseModal = ()=>{
    formik.resetForm();
    getProductos();
    handleClose();
  }

  return (
    <div>
      <Modal show={show} onHide={CloseModal} backdrop='static' keyboard={false} data-bs-theme='dark' className="text-light">
        <Modal.Header closeButton>
          <Modal.Title>Modal de Edición</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    "is-invalid":
                      formik.touched.category && formik.errors.category,
                  },
                  {
                    "is-valid":
                      formik.touched.category && !formik.errors.category,
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

            <Button variant="primary" type="submit" className="mx-2">
              Guardar
            </Button>
            <Button variant="danger" onClick={CloseModal} className="mx-2">
            Cerrar
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalEditar;
