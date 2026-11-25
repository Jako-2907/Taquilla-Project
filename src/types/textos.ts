export type Textos = {
  navbar: {
    logo: { "texto": string; "aria": string };
    enlaces: { "inicio": string; "explorar": string };
    buscador: { "placeholder": string; "aria": string };
    botones: { "ingresar": string; "crearCuenta": string };
    usuario: { "menu": string; "panel": string; "cerrarSesion": string };
    aria: { "idioma": string; "accesibilidad": string };
  };
  menuMovil: {
    abrir: string;
    cerrar: string;
    enlaces: { "inicio": string; "explorar": string };
    botones: { "ingresar": string; "crearCuenta": string; "cerrarSesion": string };
    secciones: { "idioma": string; "accesibilidad": string };
  };
  footer: {
    lema: string;
    columnas: {
      explora: {
        titulo: string;
        enlaces: { "inicio": string; "explorar": string };
      };
      cuenta: {
        titulo: string;
        enlaces: { "ingresar": string; "crearCuenta": string };
      };
      legal: {
        titulo: string;
        enlaces: { "terminos": string; "accesibilidad": string };
      };
    };
    legal: { "derechos": string; "nota": string };
  };
  cookies: {
    banner: {
      titulo: string;
      texto: string;
      botones: { "rechazar": string; "aceptar": string };
    };
    preferencias: {
      titulo: string;
      texto: string;
      categorias: {
        necesarias: { "nombre": string; "descripcion": string; "cookies": string };
        preferencias: { "nombre": string; "descripcion": string; "cookies": string };
        analiticas: { "nombre": string; "descripcion": string; "cookies": string };
        marketing: { "nombre": string; "descripcion": string; "cookies": string };
      };
      etiquetas: { "siempreActivas": string };
      botones: { "guardarSeleccion": string; "rechazarOpcionales": string; "aceptarTodas": string };
      mensajes: { "guardada": string };
    };
  };
  accesibilidad: {
    titulo: string;
    tamanoTexto: string;
    muestraTamano: string;
    altoContraste: { "nombre": string; "descripcion": string };
    reducirMovimiento: { "nombre": string; "descripcion": string };
    subrayarEnlaces: { "nombre": string; "descripcion": string };
    espaciadoLectura: { "nombre": string; "descripcion": string };
    nota: string;
    enlaces: { "declaracion": string };
    botones: { "restablecer": string };
    aria: { "aumentarTexto": string; "disminuirTexto": string };
  };
  idioma: {
    titulo: string;
    tituloMovil: string;
    es: string;
    en: string;
    codigoEs: string;
    codigoEn: string;
    nota: string;
    cambiado: string;
  };
  general: {
    acciones: {
      guardar: string;
      cancelar: string;
      cerrar: string;
      volver: string;
      reintentar: string;
      verMas: string;
      verTodos: string;
      leerMas: string;
      buscar: string;
      siguiente: string;
      anterior: string;
      aceptar: string;
      rechazar: string;
      continuar: string;
      aplicar: string;
      limpiar: string;
      compartir: string;
      descargar: string;
      descargarPdf: string;
      transferir: string;
      comprar: string;
      comprarEntradas: string;
      eliminar: string;
      editar: string;
      reportar: string;
      restablecer: string;
      copiar: string;
    };
    categorias: {
      conciertos: string;
      teatro: string;
      deportes: string;
      festivales: string;
      comedia: string;
      familiares: string;
      todas: string;
      singular: {
        conciertos: string;
        teatro: string;
        deportes: string;
        festivales: string;
        comedia: string;
        familiares: string;
      };
    };
    formatos: {
      fechaYHora: string;
      fechaYLugar: string;
      lugarYCiudad: string;
      deTotal: string;
      deTotalPorcentaje: string;
      haceMinutos: { "uno": string; "otro": string };
      haceHoras: { "uno": string; "otro": string };
      haceDias: { "uno": string; "otro": string };
      entradas: { "uno": string; "otro": string };
      eventos: { "uno": string; "otro": string };
      asientos: { "uno": string; "otro": string };
      minutos: string;
      duracion: string;
    };
    palabras: { "hoy": string; "si": string; "no": string; "o": string };
    aria: { "saltarAlContenido": string; "cerrarDialogo": string; "volver": string; "masAcciones": string };
  };
  estados: {
    cargando: { "titulo": string; "texto": string; "indicador": string };
    vacio: { "titulo": string; "texto": string };
    error: {
      titulo: string;
      texto: string;
      botones: { "reintentar": string };
    };
    sinConexion: { "titulo": string; "texto": string };
    sinSesion: {
      titulo: string;
      texto: string;
      botones: { "ingresar": string };
    };
    sesionVencida: {
      titulo: string;
      texto: string;
      botones: { "ingresar": string };
    };
    guardando: string;
    guardado: string;
    actualizando: string;
  };
  errores: {
    generico: string;
    peticion_invalida: string;
    no_autenticado: string;
    credenciales_invalidas: string;
    sin_permiso: string;
    rol_no_permitido: string;
    evento_ajeno: string;
    clave_docente_requerida: string;
    no_encontrado: string;
    ruta_no_encontrada: string;
    entrada_no_existe: string;
    asiento_no_disponible: string;
    cupo_insuficiente: string;
    evento_no_disponible: string;
    evento_sin_mapa: string;
    sin_asientos_libres: string;
    reserva_ya_pagada: string;
    correo_en_uso: string;
    entrada_ya_usada: string;
    entrada_de_otro_evento: string;
    slug_en_uso: string;
    evento_no_editable: string;
    evento_ya_publicado: string;
    evento_no_es_borrador: string;
    reserva_expirada: string;
    validacion: string;
    demasiadas_peticiones: string;
    pago_rechazado: string;
    pasarela_no_disponible: string;
    error_interno: string;
    falla_simulada: string;
    idioma_no_soportado: string;
    seccion_no_encontrada: string;
    codigo_incorrecto: string;
    codigo_vencido: string;
    correo_ya_verificado: string;
    cuenta_de_prueba: string;
  };
  paginas: {
    inicio: {
      seo: { "titulo": string; "descripcion": string };
      hero: {
        etiquetas: { "temporada": string };
        titulo: string;
        subtitulo: string;
        buscador: {
          etiquetas: { "que": string; "donde": string; "cuando": string };
          placeholders: { "que": string; "cuando": string; "movil": string };
          resumenMovil: string;
          populares: string;
          botones: { "buscar": string };
        };
        destacado: {
          etiqueta: string;
          desde: string;
          botones: { "verEvento": string };
        };
      };
      categorias: {
        eventos: { "uno": string; "otro": string };
      };
      filtrosMovil: { "todos": string; "destacados": string; "finDeSemana": string };
      destacados: {
        titulo: string;
        subtitulo: string;
        enlaces: { "verTodos": string };
      };
      proximos: { "titulo": string; "subtitulo": string };
      tarjeta: {
        desde: string;
        botones: { "verEvento": string };
      };
    };
    explorar: {
      seo: { "titulo": string; "descripcion": string };
      resultados: { "uno": string; "otro": string };
      resultadosCorto: { "uno": string; "otro": string };
      filtros: {
        titulo: string;
        categoria: string;
        fecha: { "titulo": string; "hoy": string; "finDeSemana": string; "mes": string; "elegir": string };
        ciudad: string;
        precio: string;
        botones: { "limpiar": string; "verResultados": string };
      };
      orden: {
        etiqueta: string;
        opciones: { "fecha": string; "precio": string; "popularidad": string };
      };
      paginacion: { "anterior": string; "siguiente": string };
      vacio: {
        titulo: string;
        texto: string;
        botones: { "limpiar": string };
      };
    };
    detalleEvento: {
      seo: { "titulo": string; "descripcion": string };
      etiquetas: { "edadMinima": string; "todoPublico": string };
      info: { "fecha": string; "hora": string; "horaValor": string; "lugar": string; "desde": string };
      pestanas: { "descripcion": string; "comoLlegar": string; "politicas": string };
      descripcion: {
        titulo: string;
        botones: { "leerMas": string };
      };
      mapa: { "titulo": string };
      comoLlegar: {
        titulo: string;
        direccion: string;
        parqueadero: string;
        sinParqueadero: string;
        puertas: string;
        botones: { "abrirMapa": string };
      };
      politicas: {
        titulo: string;
        documento: string;
        edad: string;
        todoPublico: string;
        reembolso: string;
        ingreso: string;
        objetos: string;
      };
      relacionados: { "titulo": string };
      noEncontrado: {
        titulo: string;
        texto: string;
        botones: { "volver": string };
      };
    };
    ingresar: {
      seo: { "titulo": string; "descripcion": string };
      presentacion: {
        lema: string;
        beneficios: { "descubre": string; "filtra": string; "consulta": string };
      };
      formulario: {
        titulo: string;
        subtitulo: string;
        etiquetas: { "correo": string; "clave": string; "mantenerSesion": string };
        placeholders: { "correo": string };
        enlaces: { "olvidasteClave": string; "crearCuenta": string };
        mensajes: { "sinCuenta": string; "ingresando": string };
        botones: { "ingresar": string; "mostrarClave": string; "ocultarClave": string };
      };
      errores: {
        camposObligatorios: { "titulo": string; "texto": string };
        correoObligatorio: string;
        claveObligatoria: string;
        credenciales: { "titulo": string; "texto": string };
        demasiadosIntentos: { "titulo": string; "texto": string };
        conexion: {
          titulo: string;
          texto: string;
          botones: { "reintentar": string };
        };
      };
    };
    noEncontrado: {
      seo: { "titulo": string; "descripcion": string };
      contenido: {
        titulo: string;
        texto: string;
        botones: { "volverInicio": string };
      };
    };
  };
  componentes: {
    paginacion: {
      aria: { "etiqueta": string; "irAPagina": string; "paginaActual": string; "siguiente": string; "anterior": string };
    };
    etiquetas: {
      estadoEvento: {
        publicado: string;
        borrador: string;
        finalizado: string;
        agotado: string;
        ventaLenta: string;
        sinVentas: string;
      };
      estadoAsiento: { "disponible": string; "ocupado": string; "retenido": string; "seleccionado": string };
      estadoEntrada: { "valida": string; "usada": string };
      estadoPedido: { "confirmada": string; "pagoPendiente": string };
      disponibilidad: {
        disponible: string;
        quedan: string;
        ultimas: string;
        ultimasEntradas: string;
        ultimasEntradasEn: string;
        pocasEntradas: string;
        agotada: string;
        porcentajeVendido: string;
      };
      edad: { "todoPublico": string; "mayoresDe": string };
      roles: { "comprador": string; "organizador": string; "ingreso": string };
      destacado: string;
      hoy: string;
    };
    precio: { "desde": string; "desdePrecio": string; "precioDesde": string; "porEntrada": string };
    migas: { "inicio": string; "explorar": string; "eventos": string; "nuevoEvento": string };
  };
  formularios: {
    campos: {
      nombre: { "label": string; "placeholder": string };
      apellido: { "label": string; "placeholder": string };
      nombreCompleto: { "label": string; "placeholder": string };
      correo: { "label": string; "placeholder": string };
      clave: { "label": string; "placeholder": string };
      celular: { "label": string; "placeholder": string };
      numeroTarjeta: { "label": string; "placeholder": string };
      vencimiento: { "label": string; "placeholder": string };
      cvc: { "label": string; "labelCorto": string; "placeholder": string };
      titular: { "label": string; "placeholder": string };
      tipoDocumento: {
        label: string;
        opciones: { "cedula": string; "cedulaExtranjeria": string; "pasaporte": string; "tarjetaIdentidad": string };
      };
      documento: { "label": string; "ayuda": string };
    };
    camposEvento: {
      titulo: { "label": string };
      categoria: { "label": string };
      descripcion: { "label": string };
      afiche: { "label": string };
      color1: { "label": string };
      color2: { "label": string };
      patron: { "label": string };
      duracion: { "label": string };
      edadMinima: { "label": string };
      slug: { "label": string };
      lugar: { "label": string };
      direccion: { "label": string };
      ciudad: { "label": string };
      capacidad: { "label": string };
      funcion: { "label": string };
    };
    camposLocalidad: {
      nombre: { "label": string };
      filas: { "label": string; "rango": string };
      asientosPorFila: { "label": string };
      precio: { "label": string };
      cupo: { "label": string };
    };
    validacion: {
      requerido: string;
      revisaCampo: string;
      revisaDatos: string;
      correoInvalido: string;
      nombreLongitud: string;
      claveCorta: string;
      celularDigitos: string;
      documentoFormato: string;
      tarjetaInvalida: string;
      vencimientoFormato: string;
      tarjetaVencida: string;
      cvcFormato: string;
      terminos: string;
      maximoEntradas: string;
      correoEnUso: string;
      numeroEntero: string;
      fechaFutura: string;
      localidadRepetida: string;
      cupoSuperaCapacidad: string;
    };
    aria: { "mostrarClave": string; "ocultarClave": string };
  };
};
