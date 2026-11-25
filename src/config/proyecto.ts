const porDefecto = "https://yanethm-taquilla-api.fly.dev/api/v1";

export const apiServidor = () => (process.env.TAQUILLA_API_BASE_URL || proyecto.api).replace(/\/+$/, "");

export const proyecto = {
  id: "taquilla",
  nombre: "taquilla",
  api:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    porDefecto,
};
