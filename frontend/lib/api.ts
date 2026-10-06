export type Usuario = {
  id: number;
  nombreCompleto: string;
  correo: string;
};

type UsuarioRespuesta = {
  id: number;
  nombre_completo: string;
  correo: string;
};

export class ErrorApi extends Error {
  estado: number;

  constructor(mensaje: string, estado: number) {
    super(mensaje);
    this.estado = estado;
  }
}

type Opciones = { metodo?: "GET" | "POST" | "PUT"|"DELETE"; cuerpo?: unknown };

async function pedir<T>(ruta: string, opciones: Opciones = {}): Promise<T> {
  let respuesta: Response;
  try {
    respuesta = await fetch(`/api${ruta}`, {
      method: opciones.metodo ?? "GET",
      headers: opciones.cuerpo ? { "Content-Type": "application/json" } : undefined,
      body: opciones.cuerpo ? JSON.stringify(opciones.cuerpo) : undefined,
    });
  } catch {
    throw new ErrorApi("No se pudo conectar con el servidor. Intenta de nuevo.", 0);
  }

  const datos = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    const mensaje =
      typeof datos?.detail === "string"
        ? datos.detail
        : "Revisa los datos ingresados e intenta de nuevo.";
    throw new ErrorApi(mensaje, respuesta.status);
  }

  return datos as T;
}

function convertirUsuario(datos: UsuarioRespuesta): Usuario {
  return { id: datos.id, nombreCompleto: datos.nombre_completo, correo: datos.correo };
}

export async function registrar(nombreCompleto: string, correo: string, contrasena: string) {
  const datos = await pedir<UsuarioRespuesta>("/auth/registro", {
    metodo: "POST",
    cuerpo: { nombre_completo: nombreCompleto, correo, contrasena },
  });
  return convertirUsuario(datos);
}

export async function ingresar(correo: string, contrasena: string) {
  const datos = await pedir<UsuarioRespuesta>("/auth/ingresar", {
    metodo: "POST",
    cuerpo: { correo, contrasena },
  });
  return convertirUsuario(datos);
}

export async function salir() {
  await pedir<{ mensaje: string }>("/auth/salir", { metodo: "POST" });
}

export async function solicitarRecuperacion(correo: string) {
  return pedir<{ mensaje: string; codigo: string | null }>("/auth/recuperar", {
    metodo: "POST",
    cuerpo: { correo },
  });
}

export async function cambiarContrasena(correo: string, codigo: string, contrasenaNueva: string) {
  return pedir<{ mensaje: string }>("/auth/cambiar-contrasena", {
    metodo: "POST",
    cuerpo: { correo, codigo, contrasena_nueva: contrasenaNueva },
  });
}

export type Mascota ={
  id: number;
  nombre: string;
  sexo: string;
  especie: string;
  cuidado: string;
  fechaCuidado: string;
};

export type DatosMascota = Omit<Mascota, "id">;

type MascotaRespuesta ={
  id:number;
  nombre: string;
  sexo: string;
  especie: string;
  cuidado: string;
  fecha_cuidado: string;
  usuario_id: number;
};

function convertirMascota(datos: MascotaRespuesta): Mascota {
 return {id:datos.id, nombre: datos.nombre, sexo: datos.sexo, especie: datos.especie,cuidado: datos.cuidado, fechaCuidado: datos.fecha_cuidado};  
}

function cuerpoMascota(datos: DatosMascota) {
  return {
    nombre: datos.nombre,
    sexo: datos.sexo,
    especie: datos.especie,
    cuidado: datos.cuidado,
    fecha_cuidado: datos.fechaCuidado,
  };
}

export async function listarMascotas() {
  const datos = await pedir<MascotaRespuesta[]>("/mascotas");
  return datos.map(convertirMascota);
}

export async function crearMascota(datos: DatosMascota) {
  return pedir<MascotaRespuesta>("/mascotas",{
    metodo: "POST",
    cuerpo: cuerpoMascota(datos)
  });   
}

export async function actualizarMascota(id: number, datos: DatosMascota) {
 return pedir<MascotaRespuesta>(`/mascotas/${id}`,{
  metodo: "PUT",
  cuerpo: cuerpoMascota(datos)
 });
}

export async function eliminarMascota(id: number) {
  return pedir<null>(`/mascotas/${id}`,{
   metodo: "DELETE"
  });
}