import NavBar from "./Components/NavBar"
import Foot from "./Components/Foot"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Components/Pages/Home"
import AcercaDeNosotros from "./Components/Pages/AcercaDeNosotros"
import Administracion from "./Components/Pages/Administracion"
import CrearProducto from "./Components/Sections/CrearProducto"

function App() {
  
  return (
    <>
    <BrowserRouter>
    <header>
      <NavBar/>
    </header>
    <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/acercadenosotros" element={<AcercaDeNosotros/>}/>
        <Route path="/administracion" element={<Administracion/>}/>
        <Route path="/crearproducto" element={<CrearProducto/>}/>
      </Routes>
    </main>
    <footer>
      <Foot/>
    </footer>
    </BrowserRouter>
    </>
  )
}

export default App
