import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import envsConfig from "../../src/config/envs.config.js";

const request = supertest("http://localhost:8080");

describe("Test de integración módulo Pets", () => {
    let petTest;

    before(async() =>{
      console.log("Inicio de TESTING PETS");
      await mongoose.connect(envsConfig.MONGO_URL_TESTING);
    });

    it("Creación de mascota", async () => {
      const newPet = {
        name: "Felix",
        specie: "Gato",
        birthDate: "10-12-2020",
        image: "test",
      };

      const { status, body, error } = await request.post("/api/pets").send(newPet);
    
      if(error){
        console.log("Error: ", error);
      }
      
      petTest = body;

      expect(status).to.be.equal(201);
      expect(body).to.have.property("_id");
      expect(body).to.have.property("name");
      expect(body).to.have.property("specie");
      expect(body).to.have.property("image");
      expect(body.name).to.be.equal("Felix");
      expect(body.specie).to.be.equal("Gato");
    });

    it("Actualización de mascota", async () => {
      const data = {
        name: "Felix",
        specie: "Perro",
      };

      const { status, body, error } = await request.put(`/api/pets/${petTest._id}`).send(data);
    
      expect(status).to.be.equal(200);
      expect(body).to.have.property("_id");
      expect(body).to.have.property("name");
      expect(body).to.have.property("specie");
      expect(body).to.have.property("image");
      expect(body.name).to.be.equal("Felix");
      expect(body.specie).to.not.be.equal("Gato");
      expect(body.specie).to.be.equal("Perro");
    });

    it("Obtener mascota", async () => {
      const { status, body, error } = await request.get(`/api/pets/${petTest._id}`);
    
      expect(status).to.be.equal(200);
      expect(body).to.have.property("_id");
      expect(body).to.have.property("name");
      expect(body).to.have.property("specie");
      expect(body).to.have.property("image");
      expect(body.name).to.be.equal("Felix");
      expect(body.specie).to.not.be.equal("Gato");
      expect(body.specie).to.be.equal("Perro");
    });

    after(async () => {
      try {
        await request.delete(`/api/pets/${petTest._id}`);
        await mongoose.disconnect();
      } catch (error) {
        console.log(error);
      }
    });
});
