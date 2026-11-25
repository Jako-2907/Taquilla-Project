"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import EstadoVista from "../components/EstadoVista/EstadoVista";
import IconoEvento from "../components/IconoEvento/IconoEvento";
import Marca from "../components/Marca/Marca";
import SaltarContenido from "../components/SaltarContenido/SaltarContenido";
import { useSesion } from "../context/SesionContext";
import type { Usuario } from "../types/api";
import { usePreferencias } from "../context/PreferenciasContext";
import { proyecto } from "../config/proyecto";
import "./Ingreso.css";

type Campos = { correo?: "requerido" | "invalido" | "servidor"; clave?: "requerido" | "servidor" };

function vencimiento(retryAfter: string | null) {
  if (!retryAfter) return 0;
  if (/^\d+$/.test(retryAfter.trim())) return Date.now() + Number(retryAfter) * 1000;
  const fecha = Date.parse(retryAfter);
  return Number.isFinite(fecha) ? fecha : 0;
}

export default function Ingreso() {
  const router = useRouter();
  const { iniciarSesion } = useSesion();
  const { textos, errorTextos, reintentarTextos } = usePreferencias();
  const [visible, setVisible] = useState(false);
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [mantener, setMantener] = useState(true);
  const [campos, setCampos] = useState<Campos>({});
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<"credenciales" | "conexion" | "generico" | "demasiadosIntentos" | null>(null);
  const [hasta, setHasta] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const correoRef = useRef<HTMLInputElement>(null);
  const claveRef = useRef<HTMLInputElement>(null);
  const ocupado = useRef(false);
  const t = textos?.paginas.ingresar;

  useEffect(() => {
    if (t) document.title = t.seo.titulo;
  }, [t]);

  useEffect(() => {
    if (!hasta) return;
    let timer: ReturnType<typeof setTimeout>;
    function actualizar() {
      const restantes = Math.max(0, Math.ceil((hasta - Date.now()) / 1000));
      setSegundos(restantes);
      if (restantes > 0) timer = setTimeout(actualizar, 1000);
      else setError((actual) => actual === "demasiadosIntentos" ? null : actual);
    }
    actualizar();
    return () => clearTimeout(timer);
  }, [hasta]);

  if (!textos || !t) return <EstadoVista estado={errorTextos ? "error" : "cargando"} error={errorTextos} onReintentar={reintentarTextos} />;

  async function ingresar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (ocupado.current || hasta > Date.now()) return;
    const errores: Campos = {};
    if (!correo.trim()) errores.correo = "requerido";
    else if (correoRef.current?.validity.typeMismatch) errores.correo = "invalido";
    if (!clave) errores.clave = "requerido";
    setCampos(errores);
    setError(null);
    if (errores.correo || errores.clave) {
      requestAnimationFrame(() => (errores.correo ? correoRef : claveRef).current?.focus());
      return;
    }

    ocupado.current = true;
    setEnviando(true);
    try {
      const respuesta = await fetch("/api/sesion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: correo.trim(), clave, mantener }),
      });
      if (respuesta.ok) {
        const datos: { usuario: Usuario } = await respuesta.json();
        iniciarSesion(datos.usuario);
        router.push("/");
        return;
      }
      const datos: { error?: { codigo?: string; campos?: Record<string, unknown> } } = await respuesta.json().catch(() => ({}));
      if (respuesta.status === 401 && datos.error?.codigo === "credenciales_invalidas") setError("credenciales");
      else if (respuesta.status === 429 && datos.error?.codigo === "demasiadas_peticiones") {
        const limite = vencimiento(respuesta.headers.get("Retry-After"));
        setHasta(limite);
        setSegundos(Math.max(0, Math.ceil((limite - Date.now()) / 1000)));
        setError(limite > Date.now() ? "demasiadosIntentos" : "generico");
      } else if (respuesta.status === 422 && datos.error?.campos) {
        const rechazados: Campos = {};
        if ("correo" in datos.error.campos) rechazados.correo = "servidor";
        if ("clave" in datos.error.campos) rechazados.clave = "servidor";
        setCampos(rechazados);
        if (rechazados.correo || rechazados.clave) requestAnimationFrame(() => (rechazados.correo ? correoRef : claveRef).current?.focus());
        else setError("generico");
      } else if (datos.error?.codigo === "red_no_disponible") setError("conexion");
      else setError("generico");
    } catch {
      setError("conexion");
    } finally {
      ocupado.current = false;
      setEnviando(false);
    }
  }

  const f = t.formulario;
  const tieneCampos = Boolean(campos.correo || campos.clave);
  const alerta = tieneCampos ? t.errores.camposObligatorios : error === "generico" ? { titulo: textos.estados.error.titulo, texto: textos.errores.generico } : error === "demasiadosIntentos" ? { ...t.errores.demasiadosIntentos, texto: t.errores.demasiadosIntentos.texto.replace("{segundos}", String(segundos)) } : error ? t.errores[error] : null;
  const marca = { nombre: textos.navbar.logo.texto, etiqueta: textos.navbar.logo.aria, tipo: proyecto.id };
  return (
    <div className="ingreso">
      <SaltarContenido texto={textos.general.aria.saltarAlContenido} />
      <aside className="ingreso__panel">
        <Marca {...marca} inverso />
        <div>
          <p className="ingreso__lema">{t.presentacion.lema}</p>
          <ul>{Object.values(t.presentacion.beneficios).map((beneficio) => <li key={beneficio}><span><IconoEvento tipo="confirmar" /></span>{beneficio}</li>)}</ul>
        </div>
      </aside>
      <main id="contenido" className="ingreso__principal" tabIndex={-1}>
        <div className="ingreso__contenido">
          <div className="ingreso__marca-movil"><Marca {...marca} /></div>
          <h1>{f.titulo}</h1>
          <p className="ingreso__subtitulo">{f.subtitulo}</p>
          {alerta && <div className="ingreso__alerta" role="alert"><IconoEvento tipo="alerta" /><div><strong>{alerta.titulo}</strong><p>{alerta.texto}</p></div></div>}
          <form onSubmit={ingresar} noValidate aria-busy={enviando}>
            <div className="ingreso__campo">
              <label htmlFor="correo">{f.etiquetas.correo}</label>
              <input id="correo" ref={correoRef} type="email" name="correo" disabled={enviando || segundos > 0} autoComplete="username" required value={correo} placeholder={f.placeholders.correo} onChange={(e) => { setCorreo(e.target.value); setCampos((actual) => ({ ...actual, correo: undefined })); }} aria-invalid={Boolean(campos.correo)} aria-describedby={campos.correo ? "correo-error" : undefined} />
              {campos.correo && <p id="correo-error">{campos.correo === "invalido" ? textos.formularios.validacion.correoInvalido : campos.correo === "servidor" ? textos.formularios.validacion.revisaCampo : t.errores.correoObligatorio}</p>}
            </div>
            <div className="ingreso__campo">
              <label htmlFor="clave">{f.etiquetas.clave}</label>
              <div className="ingreso__clave">
                <input id="clave" ref={claveRef} name="clave" disabled={enviando || segundos > 0} type={visible ? "text" : "password"} autoComplete="current-password" required value={clave} onChange={(e) => { setClave(e.target.value); setCampos((actual) => ({ ...actual, clave: undefined })); }} aria-invalid={Boolean(campos.clave)} aria-describedby={campos.clave ? "clave-error" : undefined} />
                <button type="button" onClick={() => setVisible(!visible)} aria-label={f.botones.mostrarClave} aria-pressed={visible} title={visible ? f.botones.ocultarClave : f.botones.mostrarClave}><IconoEvento tipo="ojo" /></button>
              </div>
              {campos.clave && <p id="clave-error">{campos.clave === "servidor" ? textos.formularios.validacion.revisaCampo : t.errores.claveObligatoria}</p>}
            </div>
            <div className="ingreso__opciones">
              <label><input type="checkbox" disabled={enviando || segundos > 0} checked={mantener} onChange={(e) => setMantener(e.target.checked)} />{f.etiquetas.mantenerSesion}</label>
              <a href="/recuperar-clave">{f.enlaces.olvidasteClave}</a>
            </div>
            <button className="boton-home primario ingreso__enviar" type="submit" disabled={enviando || segundos > 0}>
              {enviando ? <><span className="indicador-carga" aria-hidden="true" />{f.mensajes.ingresando}</> : error === "conexion" ? t.errores.conexion.botones.reintentar : f.botones.ingresar}
            </button>
          </form>
          <p className="ingreso__registro">{f.mensajes.sinCuenta} <a href="/crear-cuenta">{f.enlaces.crearCuenta}</a></p>
        </div>
      </main>
    </div>
  );
}
