import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import envsConfig from "../../src/config/envs.config.js";
import { petDao } from "../../src/modules/pets/pet.dao.js";
import { userDao } from "../../src/modules/users/user.dao.js";

const request = supertest("http://localhost:8080");

describe("Test de integración módulo Adoptions", () => {
    let adoptionTest, userTest, petTest;

    before(async() =>{
        console.log("Inicio de TESTING ADOPTIONS");
        await mongoose.connect(envsConfig.MONGO_URL_TESTING);

        userTest = await userDao.create({
            first_name: "Marcos",
            last_name: "Castro",
            email: "marcos@gmail.com",
            password: "contraseña1234", 
        });
        
        petTest = await petDao.create({
            name: "Dumbo",
            specie: "Perro",
            birthDate: "11-18-2014",
            image: "test",
        });
    });

    it("Creación de adopción", async () => {
        const newAdoption = {
            owner: userTest._id, 
            pet: petTest._id, 
        };

        const { status, body, error } = await request.post("/api/adoptions").send(newAdoption);
    
        if(error){
            console.log("Error: ", error);
        }

        adoptionTest = body;

        expect(status).to.be.equal(201);
        expect(body).to.have.property("_id");
        expect(body).to.have.property("owner");
        expect(body).to.have.property("pet");
    });

    it("Obtener adopción", async () => {
        const { status, body, error } = await request.get(`/api/adoptions/${adoptionTest._id}`);
        
        expect(status).to.be.equal(200);
        expect(body).to.have.property("_id");
        expect(body).to.have.property("owner");
        expect(body).to.have.property("pet");
    });

    after(async () => {
        try {
            await request.delete(`/api/adoptions/${adoptionTest._id}`);
            await userDao.removeAll();
            await petDao.removeAll();
            await mongoose.disconnect();
        } catch (error) {
            console.log(error);
        }
    });
});
