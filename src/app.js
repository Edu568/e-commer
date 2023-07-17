const express = require("express");
const path = require("path");
const app = express();
const PORT = 3003;
const methodOverride = require("method-override"); // Para poder usar los métodos PUT y DELETE
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cookieCheck = require("./middlewares/cookieCheck");
const cors = require('cors');


app.use(cors({
      origin: 'http://localhost:3000',
       // Define o domínio permitido para usar React
       
      
    }));

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Para poder usar el metodo POST
app.use(express.static("public")); //
app.use(methodOverride("_method")); // Para poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(
      session({
            secret: "ecommer",
            resave: false,

            saveUninitialized: true,
      })
);
app.use(cookieParser());
app.use(cookieCheck);

/*  Template Engine */
/* Necesario para usar los templates antes instalar npm i  ejs */
app.set("view engine", "ejs");
app.set("views", "./src/views");

/* ROUTERS */
const homeRouter = require("./routes/home");
const productosRouter = require("./routes/productos");
const usuariosRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const categoriesRoutesApi = require("./routes/api/categoriesRoutes");
const subCategoriesRoutesApi = require("./routes/api/subCategoriesRoutes");
const orderApi = require("./routes/api/orderRutes");


const [ 
      userRouter, 
      productRouter, 
      orderRouter, 
      categoryRouter
    ] = require("./routes/api");


    app.use(`/api/users`, userRouter);
app.use(`/api/products`, productRouter);
app.use(`/api/orders`, orderRouter);
app.use(`/api/categories`, categoryRouter);


/* MIDDLEWARES ROUTES */
app.use("/", homeRouter);
app.use("/productos", productosRouter);
app.use("/users", usuariosRouter);
app.use("/admin", adminRouter);

/* Rutas api alternativas*/ 
app.use("/api/v1", categoriesRoutesApi);
app.use("/api/v1", subCategoriesRoutesApi);
app.use("/api/v1", orderApi);

app.listen(PORT, () =>
      console.log(`Servidor funcionando en puerto ${PORT} 
http://localhost:${PORT}`)
);
