import mercadopago from "mercadopago";

const mercadoPagoAcessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN as string;

// Adicione as credenciais
mercadopago.configure({
  access_token: mercadoPagoAcessToken,
  sandbox: true,
});

export { mercadopago };
