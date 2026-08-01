const express = require("express");
const cors = require("cors");
require("dotenv").config();

const libroRoutes = require("./routes/libroRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const authRoutes = require("./routes/authRoutes");
const carritoRoutes = require("./routes/carritoRoutes");
const ventasRoutes = require("./routes/ventasRoutes");
const registroRoutes = require("./routes/registroRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

const conexion = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/libros", libroRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api", authRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api", registroRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.get("/", (req, res) => {

    res.json({
        mensaje: "API Librería funcionando"
    });

});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Servidor ejecutándose en el puerto ${PORT}`);

});

const path = require("path");

app.use(express.static(
    path.join(__dirname, "../venta")
));