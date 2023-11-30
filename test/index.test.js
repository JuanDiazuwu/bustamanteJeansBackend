const supertest = require('supertest');

const app = require('../app');

describe("Probar el sistema de autenticación", () => {
    it ("Deberia de obtener un login con un user y un pass ok", (done) => {
        supertest(app).post('/login')
        .send({"email":"juandiazfdez1992@gmail.com", "password":"muy_secreto"})
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                done();
            };
        });
    });

    it ("Deberia de regresar un 403 si el usuario no existe", (done) => {
        supertest(app).post('/login')
        .send({"email":"hola@gmail.com", "password":"1234"})
        .expect(403)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                done();
            };
        });
    });
})