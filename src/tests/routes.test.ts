import request from 'supertest';
import server from '../';
import pool from '../database';
import { Server } from 'http';


declare const global: {
  testServer: Server
};

beforeAll(async () => {
    global.testServer = server
    await request(server).delete('/awesome/applicant/clear');
});

afterAll(async () => {
    await request(server).delete('/awesome/applicant/clear');
    await global.testServer.close()
});

afterAll(async () => {
  await pool.end(); 
});

describe('GET /', () =>{
    it('should return a welcome message', async () =>{
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Hello, world!');
    })
})

describe('GET /awesome/applicant', () =>{
    it('should return an array with applicant if exists', async () =>{
        const res = await request(server).get('/awesome/applicant');
        if(res.body.length > 0){
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        } else {
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toBe('No applicant found.');
        }
    })

})

describe('POST /awesome/applicant', () =>{
    it('should create a new applicant', async () =>{
        const res = await request(server)
        .post('/awesome/applicant')
        .send({
            name: 'Wilson Horrell',
            bio: 'Passionate Full Stack Developer who loves to learn and wants to work with Vivacity 😜',
            favorite_stack: 'MERN Stack',
            aspirations: 'To learn to tie a tie really fast like his future boss #teacherspet 🤦‍',
            employer: 'Gonna be Vivacity'
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('name');
        expect(res.body.name).toBe('Wilson Horrell');
        expect(res.body).toHaveProperty('bio');
        expect(res.body.bio).toBe('Passionate Full Stack Developer who loves to learn and wants to work with Vivacity 😜');
        expect(res.body).toHaveProperty('favorite_stack');
        expect(res.body.favorite_stack).toBe('MERN Stack')
        expect(res.body).toHaveProperty('aspirations');
        expect(res.body.aspirations).toBe('To learn to tie a tie really fast like his future boss #teacherspet 🤦‍');
        expect(res.body).toHaveProperty('employer');
        expect(res.body.employer).toBe('Gonna be Vivacity');
    })
    
    it('should return a 403 status code if an applicant already exists', async () =>{
        const res = await request(server)
        .post('/awesome/applicant')
        .send({
            name: 'John Doe',
            bio: 'Passionate Full Stack Developer who loves to learn and wants to work with Vivacity 😜',
            favorite_stack: 'JavaScript',
            aspirations: 'To become pro-level hockey player',
            employer: 'Google'
        });
        expect(res.status).toBe(403);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('An applicant record already exists. Please update or delete the existing record.')
    })
})

describe('PUT /awesome/applicant', () =>{
    it('should update an applicant', async () =>{
        const res = await request(server)
        .put('/awesome/applicant')
        .send({
            name: 'Wilson A. Horrell',
            bio: 'Super boring guy'
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('name');
        expect(res.body.name).toBe('Wilson A. Horrell');
        expect(res.body).toHaveProperty('bio');
        expect(res.body.bio).toBe('Super boring guy');
        expect(res.body).toHaveProperty('favorite_stack');
        expect(res.body.favorite_stack).toBe('MERN Stack');
        expect(res.body).toHaveProperty('aspirations');
        expect(res.body.aspirations).toBe('To learn to tie a tie really fast like his future boss #teacherspet 🤦‍');
        expect(res.body).toHaveProperty('employer');
        expect(res.body.employer).toBe('Gonna be Vivacity');
    })
})

describe('DELETE /awesome/applicant', () =>{
    it('should delete an applicant', async () =>{
        const res = await request(server).delete('/awesome/applicant');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
    })
})