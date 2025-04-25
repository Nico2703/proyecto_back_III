import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import envsConfig from "../../src/config/envs.config.js";

const request = supertest("http://localhost:8080");

describe("Test de integración módulo Users", () => {
    let userTest;

    before(async() =>{
        console.log("Inicio de TESTING USERS");
        await mongoose.connect(envsConfig.MONGO_URL_TESTING);
    });

    it("Creación de usuario", async () => {
        const newUser = {
        first_name: "Juan",
        last_name: "Carmona",
        email: "juan@gmail.com",
        password: "contraseña1234",
        };

        const { status, body, error } = await request.post("/api/users").send(newUser);
        
        if(error){
            console.log("Error: ", error);
        }
        userTest = body;

        expect(status).to.be.equal(201);
        expect(body).to.have.property("_id");
        expect(body).to.have.property("first_name");
        expect(body).to.have.property("last_name");
        expect(body).to.have.property("email");
        expect(body.first_name).to.be.equal("Juan");
        expect(body.last_name).to.be.equal("Carmona");
    });

    it("Actualización de usuario", async () => {
        const data = {
            first_name: "Juan",
            last_name: "Morales",
            email: "juan@gmail.com",
            password: "contraseña1234",
        };

        const { status, body, error } = await request.put(`/api/users/${userTest._id}`).send(data);
        
        expect(status).to.be.equal(200);
        expect(body).to.have.property("_id");
        expect(body).to.have.property("first_name");
        expect(body).to.have.property("last_name");
        expect(body).to.have.property("email");
        expect(body.first_name).to.be.equal("Juan");
        expect(body.last_name).to.not.be.equal("Carmona");
        expect(body.last_name).to.be.equal("Morales");
    });

    it("Obtener usuario", async () => {
        const { status, body, error } = await request.get(`/api/users/${userTest._id}`);
        
        expect(status).to.be.equal(200);
        expect(body).to.have.property("_id");
        expect(body).to.have.property("first_name");
        expect(body).to.have.property("last_name");
        expect(body).to.have.property("email");
        expect(body.first_name).to.be.equal("Juan");
        expect(body.last_name).to.not.be.equal("Carmona");
        expect(body.last_name).to.be.equal("Morales");
    });

    after(async () => {
        try {
        await request.delete(`/api/users/${userTest._id}`);
        await mongoose.disconnect();
        } catch (error) {
        console.log(error);
        }
    });

});
