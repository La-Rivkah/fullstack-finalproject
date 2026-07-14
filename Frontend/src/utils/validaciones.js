export function esCorreoValido(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(correo)
}

export function contarTareasPendientes(tareas) {
  return tareas.filter((tarea) => !tarea.completada).length
}
