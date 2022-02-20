const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test('is the correct environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[POST] /register', () => {
  test('Error if no username provided', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: '', 
      password: 'abcd',
    })
    expect(res.body).toMatchObject({message: 'username and password required'})
  })
   
  test('Error if no password provided', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'bill', 
      password: '',
    })
    expect(res.body).toMatchObject({message: 'username and password required'})
})
})

describe('[POST] /login', () => {
  test('Username required at login', async () => {
    const res = await request(server).post('/login').send({
      username: '', 
      password: 'abcd'
    })
    expect(res.status).toBe(404)
  })
  test('Password required at login', async () => {
    const res = await request(server).post('/api/auth/login').send({
      username: 'bill', 
      password: '',
    })
    expect(res.body).toMatchObject({message: 'username and password required'})
  })
})