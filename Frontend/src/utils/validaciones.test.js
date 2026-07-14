import { test, expect } from '@playwright/test'
import {
  esCorreoValido,
  contarTareasPendientes,
} from './validaciones'

test.describe('esCorreoValido', () => {
  test('acepta un correo con formato válido', () => {
    const resultado = esCorreoValido('ana@ejemplo.com')

    expect(resultado).toBe(true)
  })

  test('rechaza un correo sin arroba', () => {
    const resultado = esCorreoValido('ana-ejemplo.com')

    expect(resultado).toBe(false)
  })
})

test.describe('contarTareasPendientes', () => {
  test('cuenta solo las tareas no completadas', () => {
    const tareas = [
      { completed: true },
      { completed: false },
      { completed: false },
    ]

    expect(contarTareasPendientes(tareas)).toBe(2)
  })

  test('devuelve 0 cuando la lista está vacía', () => {
    expect(contarTareasPendientes([])).toBe(0)
  })
})