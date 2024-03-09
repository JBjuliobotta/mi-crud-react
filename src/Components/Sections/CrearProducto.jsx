//import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import { validarCategoria } from "../../helpers/validaciones";
import clsx from "clsx";
import * as Yup from "yup"
import { useFormik } from "formik";

const CrearProducto = () => {
  //los productos van a tener las siguientes props: titulo, categoría y además un indentificador único
  //const [title, setTitle] = useState("");
  //const [description, setDescription] = useState("");
  //const [category, SetCategory] = useState("");
  const ProdcutoSchema=Yup.object().shape(
    {
      title: Yup.string().min(4, "min. 4 caracteres").max(20, "máx. 20 caracteres").required("el campo es requerido"),
      description: Yup.string().min(4).max(200).required("el campo es requerido"),
      category: Yup.string().required("el campo es requerido")
    }
  );

  const initialValues={
    title:'',
    description:'',
    category:'',
  };

  const formik=useFormik({
    initialValues,
    validationSchema: ProdcutoSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values)=>{
      console.log("values de formik->", values);
    }
  })

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

  return (
    <div className="container py-3 my-3">
      <div className="text-center">
        <h2>Crear Producto</h2>
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
            {...formik.getFieldProps('title')}
            className={clsx('form-control',{
              'is-invalid': formik.touched.title && formik.errors.title
            },
            {
              'is-valid': formik.touched.title && !formik.errors.title
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
            {...formik.getFieldProps('description')}
            className={clsx('form-control',{
              'is-invalid': formik.touched.description && formik.errors.description
            },
            {
              'is-valid': formik.touched.description && !formik.errors.description
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
            {...formik.getFieldProps('category')}
            className={clsx('form-control',{
              'is-invalid': formik.touched.category && formik.errors.category
            },
            {
              'is-valid': formik.touched.category && !formik.errors.category
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

export default CrearProducto;
