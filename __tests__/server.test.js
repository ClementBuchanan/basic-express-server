'use strict';

const supertest = require('supertest');
const server = require('../src/server.js');
const request = supertest(server.app);

describe('General Server Test', () => {
    it('404 on a bad route', async () => {
        await request.get('/DoesNotExist')
            .then(data => {
                expect(data.status).toEqual(404);
            })
    })

    it('404 on a bad method', async () => {
        await request.post('/person')
            .then(data => {
                expect(data.status).toEqual(404);
            })
    })

    it('500 if no name in the string query', async () => {
        await request.get('/person')
            .then(data => {
                expect(data.status).toEqual(500);
            })
    })

    it('200 if the name is in query string', async () => {
        await request.get('/person?name=Clement')
            .then(data => {
                expect(data.status).toEqual(200);
            })
    })

    it('given a name in the query string', async () => {
        await request.get('/person?name=Clement')
            .then(data => {
                expect(data.body.name).toEqual('Clement');
            })
    })
})


