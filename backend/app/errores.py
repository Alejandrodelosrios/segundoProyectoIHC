class ErrorDeNegocio(Exception):
    def __init__(self, mensaje: str,estado: int = 400):
        self.mensaje = mensaje
        self.estado = estado