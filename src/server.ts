import express from "express";
import { mercadopago } from "./services/mercadoPago";
import path from "path";

const server = express();

// config template engine
server.set("view engine", "ejs");
server.set("views", path.resolve(__dirname, "resources", "views"));

// middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", async (request, response) => {
  // Cria um objeto de preferência
  let publicKey = process.env.MERCADO_PAGO_PUBLIC_KEY as string;
  let preferenceId;
  let preference = {
    items: [
      {
        title: "Meu produto",
        unit_price: 100,
        quantity: 1,
      },
    ],
  };

  try {
    const preferenceResponse = await mercadopago.preferences.create(preference);

    preferenceId = preferenceResponse.body.id;
  } catch (err) {
    console.log("deu erro no pagamento", err);
  } finally {
    response.render("home", { preferenceId, publicKey });
  }
});

const port = process.env.APP_PORT || 3000;
server.listen(port, () => console.log(`servidor iniciado na porta ${port}`));
