import { describe, it, expect } from 'vitest'
import {
  esCorreoValido,
  contarTareasPendientes,
} from './validaciones'

describe('esCorreoValido', () => {
  it('acepta un correo con formato válido', () => {
    const resultado = esCorreoValido('ana@ejemplo.com')

    expect(resultado).toBe(true)
  })

  it('rechaza un correo sin arroba', () => {
    const resultado = esCorreoValido('ana-ejemplo.com')

    expect(resultado).toBe(false)
  })
})

describe('contarTareasPendientes', () => {
  it('cuenta solo las tareas no completadas', () => {
    const tareas = [
      { completed: true },
      { completed: false },
      { completed: false },
    ]

    expect(contarTareasPendientes(tareas)).toBe(2)
  })

  it('devuelve 0 cuando la lista está vacía', () => {
    expect(contarTareasPendientes([])).toBe(0)
  })
})