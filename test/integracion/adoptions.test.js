import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import envsConfig from "../../src/config/envs.config.js";

const request = supertest("http://localhost:8080");

describe("Test de integración módulo Adoptions", () => {
    let userTest;
    let petTest;
    let adoptionTest;

    before(async () => {
        console.log("Inicio de TESTING ADOPTIONS");
        await mongoose.connect(envsConfig.MONGO_URL_TESTING);

        const newUser = {
        first_name: "Test",
        last_name: "User",
        email: "test@gmail.com",
        password: "testing1234",
        };
        const userRes = await request.post("/api/users").send(newUser);
        userTest = userRes.body;

        const newPet = {
        name: "Luna",
        specie: "Perro",
        birthDate: "05-08-2021",
        image: "test"
        };
        const petRes = await request.post("/api/pets").send(newPet);
        petTest = petRes.body;
    });

    it("Creación de adopción", async () => {
        const res = await request.post("/api/adoptions").send({
        owner: userTest._id,
        pet: petTest._id
        });

        adoptionTest = res.body;

        expect(res.status).to.equal(201);
        expect(adoptionTest).to.have.property("_id");
        expect(adoptionTest.owner).to.equal(userTest._id);
        expect(adoptionTest.pet).to.equal(petTest._id);
    });

    it("Obtener adopción por ID", async () => {
        const res = await request.get(`/api/adoptions/${adoptionTest._id}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("_id");
        expect(res.body.owner._id).to.equal(userTest._id);
        expect(res.body.pet._id).to.equal(petTest._id);
    });

    it("Listar adopciones", async () => {
        const res = await request.get("/api/adoptions");

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0);
    });

    it("Eliminar adopción", async () => {
        const res = await request.delete(`/api/adoptions/${adoptionTest._id}`);
    
        expect(res.status).to.equal(200);
    });

    after(async () => {
        try {
        await request.delete(`/api/users/${userTest._id}`);
        await request.delete(`/api/pets/${petTest._id}`);
        await mongoose.disconnect();
        } catch (error) {
        console.log(error);
        }
    });
});