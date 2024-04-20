import request from 'supertest';
import app from '../src';

describe('GET /awesome/applicant', () =>{
    it('should return an array of applicants', async () =>{
        const res = await request(app).get('/awesome/applicant');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    })

})

describe('POST /awesome/applicant', () =>{
    it('should create a new applicant', async () =>{
        const res = await request(app)
        .post('/awesome/applicant')
        .send({
            name: 'John Doe',
            bio: 'I am a software developer'
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('bio');
    })
})

describe('PUT /awesome/applicant/:id', () =>{
    it('should update an applicant', async () =>{
        const res = await request(app)
        .put('/awesome/applicant/1')
        .send({
            name: 'John Doe',
            bio: 'I am a software developer'
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('bio');
    })
})

describe('DELETE /awesome/applicant/:id', () =>{
    it('should delete an applicant', async () =>{
        const res = await request(app).delete('/awesome/applicant/1');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
    })
})