export function esCorreoValido(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(correo)
}

export function contarTareasPendientes(tareas) {
<<<<<<< HEAD
  return tareas.filter((tarea) => !tarea.completed).length
}
=======
  return tareas.filter((tarea) => !tarea.completada).length
}
>>>>>>> 0037b80842b0d18f7ef8641c888ba1d7154e445d
