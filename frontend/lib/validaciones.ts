export function esCorreoValido(correo:string): boolean{
    return  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
}

export function validarNombre(nombre:string): string | undefined{
    if(nombre.trim().length < 3) return "Escribe tu nombre completo (mínimo 2 letras)";    
}

export function validarCorreo(correo:string): string | undefined{
    if(!esCorreoValido(correo)) return "Escribe un correo válido, por ejemplo ana@correo.com";   
}  

export function validarContrasena(contrasena: string): string | undefined {
  if (contrasena.length < 8) return "La contraseña debe tener al menos 8 caracteres";
}

export function validarConfirmacion(contrasena: string,confirmacion:string): string | undefined{
    if(contrasena !== confirmacion) return "Las contraseñas no coinciden";
} 