"use client";

import { useRouter } from "next/navigation";
import EstadoVista from "../components/EstadoVista/EstadoVista";
import { useState } from "react";
import AficheEvento from "../components/AficheEvento/AficheEvento";
import IconoEvento from "../components/IconoEvento/IconoEvento";
import LayoutPublico from "../components/LayoutPublico/LayoutPublico";
import TarjetaEvento from "../components/TarjetaEvento/TarjetaEvento";
import { usePreferencias } from "../context/PreferenciasContext";
import type { Categoria, DetalleEvento, Evento } from "../types/api";
import "./VistaDetalle.css";

import Link from "next/link";

export default function VistaDetalle({ evento, relacionados, categorias }: {
  evento: DetalleEvento; relacionados: Evento[] | null; categorias: Categoria[];
}) {
  const router = useRouter();
  const { idioma, textos, errorTextos, reintentarTextos } = usePreferencias();
  const [politicas, setPoliticas] = useState(false);
  const [expandido, setExpandido] = useState(false);
  if (!textos) return <EstadoVista estado={errorTextos ? "error" : "cargando"} error={errorTextos} onReintentar={reintentarTextos} />;
  const t = textos.paginas.detalleEvento;
  const acciones = textos.general.acciones;
  const zona = { timeZone: "America/Bogota" };
  const region = idioma === "en" ? "en" : "es-CO";
  const fecha = new Intl.DateTimeFormat(region, { ...zona, day: "numeric", month: "short", year: "numeric", weekday: "short" });
  const hora = new Intl.DateTimeFormat(region, { ...zona, hour: "numeric", minute: "2-digit" });
  const precio = new Intl.NumberFormat(region, { style: "currency", currency: "COP", maximumFractionDigits: 0 });
  const formatoHora = (valor: string, puertas?: string | null) => {
    const salida = hora.format(new Date(valor));
    return puertas ? t.info.horaValor.replace("{hora}", salida).replace("{puertas}", hora.format(new Date(puertas))) : salida;
  };
  const lugar = evento.recinto;
  const direccion = [lugar.direccion, lugar.ciudad].filter(Boolean).join(", ");
  const punto = lugar.ubicacion ? `${lugar.ubicacion.lat},${lugar.ubicacion.lng}` : `${lugar.nombre} ${direccion}`;
  const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(punto)}`;
  const edad = String(evento.edadMinima);
  const nombreCategoria = (item: Evento) => categorias.find(({ id }) => id === item.categoria)?.nombre ?? item.categoria;
  const disponibilidad = (cantidad: number, agotada: boolean) => agotada
    ? textos.componentes.etiquetas.disponibilidad.agotada
    : textos.componentes.etiquetas.disponibilidad.quedan.replace("{cantidad}", String(cantidad));

  async function compartir() {
    const url = location.href;
    try {
      if (navigator.share) await navigator.share({ title: evento.titulo, url });
      else await navigator.clipboard.writeText(url);
    } catch {
      // Cancelar el diálogo permite continuar en el detalle.
    }
  }

  return (
    <LayoutPublico>
      <article className="ancho-home detalle-evento">
        <nav className="detalle-migas">
          <Link href="/">{textos.componentes.migas.inicio}</Link>
          <IconoEvento tipo="chevron" />
          <Link href="/explorar">{textos.componentes.migas.explorar}</Link>
          <IconoEvento tipo="chevron" />
          <span aria-current="page">{evento.titulo}</span>
        </nav>
        <div className="detalle-portada">
          <AficheEvento afiche={evento.afiche} className="detalle-afiche" />
          <div className="detalle-portada__acciones">
            <Link href="/explorar" aria-label={acciones.volver}><IconoEvento tipo="chevronAtras" /></Link>
            <button type="button" aria-label={acciones.compartir} onClick={compartir}><IconoEvento tipo="compartir" /></button>
          </div>
        </div>
        <div className="detalle-cuerpo">
          <div className="detalle-etiquetas">
            <span className="etiqueta-evento">{nombreCategoria(evento)}</span>
            <span className="etiqueta-evento">{evento.edadMinima > 0 ? t.etiquetas.edadMinima.replace("{edad}", edad) : t.etiquetas.todoPublico}</span>
          </div>
          <h1>{evento.titulo}</h1>
          {evento.artistas?.length ? <p className="detalle-artistas">{evento.artistas.join(" · ")}</p> : null}
          <dl className="detalle-datos">
            <div><IconoEvento tipo="fecha" /><div><dt>{t.info.fecha}</dt><dd>{fecha.format(new Date(evento.fecha))}</dd><dd className="detalle-dato-movil">{formatoHora(evento.fecha, evento.puertas)}</dd></div></div>
            <div className="detalle-dato-hora"><IconoEvento tipo="hora" /><div><dt>{t.info.hora}</dt><dd>{formatoHora(evento.fecha, evento.puertas)}</dd></div></div>
            <div><IconoEvento tipo="lugar" /><div><dt>{t.info.lugar}</dt><dd>{lugar.nombre}<span className="detalle-ciudad">, {lugar.ciudad}</span></dd><dd className="detalle-dato-movil">{direccion}</dd></div></div>
          </dl>
          <nav className="detalle-pestanas">
            <a href="#descripcion" aria-current={!politicas ? "location" : undefined} onClick={() => setPoliticas(false)}>{t.pestanas.descripcion}</a>
            <a href="#ubicacion" onClick={() => setPoliticas(false)}>{t.pestanas.comoLlegar}</a>
            <button type="button" aria-expanded={politicas} aria-controls="politicas" onClick={() => setPoliticas(!politicas)}>{t.pestanas.politicas}</button>
          </nav>
          <section id="descripcion">
            <h2>{t.descripcion.titulo}</h2>
            <p className={expandido ? undefined : "detalle-descripcion-breve"}>{evento.descripcion}</p>
            <button className="detalle-leer" type="button" aria-expanded={expandido} aria-controls="detalle-adicional" onClick={() => setExpandido(!expandido)}>
              {expandido ? acciones.cerrar : t.descripcion.botones.leerMas}
            </button>
          </section>
          <div id="detalle-adicional" className={expandido ? "" : "detalle-adicional-colapsado"}>
            <section id="ubicacion">
              <h2>{t.comoLlegar.titulo}</h2>
              <a className="detalle-mapa" href={mapa} aria-label={t.comoLlegar.botones.abrirMapa}><IconoEvento tipo="lugar" />{t.mapa.titulo}</a>
              <p>{[lugar.nombre, direccion, lugar.parqueadero ?? t.comoLlegar.sinParqueadero].filter(Boolean).join(" · ")}</p>
            </section>
            <section id="politicas" hidden={!politicas}>
              <h2>{t.politicas.titulo}</h2>
              <ul>{[t.politicas.documento, evento.edadMinima ? t.politicas.edad.replace("{edad}", edad) : t.politicas.todoPublico, t.politicas.reembolso, t.politicas.ingreso, t.politicas.objetos].map((texto) => <li key={texto}>{texto}</li>)}</ul>
            </section>
            <div className="detalle-funciones">
              {evento.funciones?.map((funcion) => (
                <section key={funcion.id}>
                  <h2>{fecha.format(new Date(funcion.fecha))} · {formatoHora(funcion.fecha, funcion.puertas)}</h2>
                  <p>{disponibilidad(funcion.disponibles, funcion.agotada)}</p>
                  <ul>
                    {evento.localidades?.map((localidad) => {
                      const cantidad = funcion.localidades?.find(({ localidadId }) => localidadId === localidad.id)?.disponibles;
                      return <li key={localidad.id}>{localidad.nombre} · {precio.format(localidad.precio)} · {disponibilidad(cantidad ?? localidad.disponibles, cantidad === undefined ? localidad.agotada : cantidad === 0)}</li>;
                    })}
                  </ul>
                </section>
              ))}
              {!evento.funciones?.length && evento.localidades?.length > 0 && (
                <ul>{evento.localidades.map((localidad) => <li key={localidad.id}>{localidad.nombre} · {precio.format(localidad.precio)} · {disponibilidad(localidad.disponibles, localidad.agotada)}</li>)}</ul>
              )}
            </div>
            {relacionados === null && <EstadoVista estado="error" onReintentar={() => router.refresh()} />}
            {relacionados && relacionados.length > 0 && (
              <section>
                <h2>{t.relacionados.titulo}</h2>
                <div className="eventos-grid">
                  {relacionados.map((item) => <TarjetaEvento key={item.id} evento={item} categoria={nombreCategoria(item)} textos={textos.paginas.inicio.tarjeta} idioma={idioma} />)}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </LayoutPublico>
  );
}
