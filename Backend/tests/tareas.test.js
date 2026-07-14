import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/app'

describe('API de tareas', () => {

  it('rechaza crear una tarea con solo espacios', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: '   ' })

    expect(res.status).toBe(400)
  })

})