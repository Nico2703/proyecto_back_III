import mongoose from "mongoose";
import envsConfig from "../../src/config/envs.config.js";
import { petDao } from "../../src/modules/pets/pet.dao.js";
import { expect } from "chai";

describe("Testing de petDao", () =>{
    let petTest;

    before(async() =>{
        console.log("Inicio de TESTING");
        await mongoose.connect(envsConfig.MONGO_URL_TESTING);
    });

    it("Retorno de array completo de mascotas", async () =>{
        const pets = await petDao.getAll();
        expect(pets).to.be.an("array");
    });

    it("Creación de mascota", async () =>{
        const newPet = {
            name: "Felix",
            specie: "Gato",
            birthDate: "10-12-2020",
            image: "test"
        }
        const pet = await petDao.create(newPet);
        petTest = pet;
        expect(pet).to.be.an("object");
        expect(pet).to.have.property("_id");
        expect(pet).to.have.property("name");
        expect(pet).to.have.property("specie");

        expect(pet).to.not.have.property("age");
    });

    it("Obtener mascota por ID", async () =>{
        const pet = await petDao.getOne({ _id: petTest._id });

        expect(pet).to.be.an("object");
        expect(pet).to.have.property("_id");
        expect(pet).to.have.property("name");
        expect(pet).to.have.property("specie");

        expect(pet.name).to.be.equal("Felix");
    });

    it("Actualizar mascota", async () =>{
        const petUpdateData = {
            name: "Yogi",
            specie: "Oso",
        }

        const petUpdate = await petDao.update(petTest._id, petUpdateData);

        expect(petUpdate).to.be.an("object");
        expect(petUpdate).to.have.property("_id");
        expect(petUpdate).to.have.property("name");
        expect(petUpdate).to.have.property("specie");

        expect(petUpdate.name).to.be.equal("Yogi");
    });

    it("Eliminar una mascota", async() =>{
        await petDao.remove(petTest._id);

        const pet = await petDao.getOne({ _id: petTest._id });
        expect(pet).to.be.null;
    });

    after(async () =>{
        console.log("Fin de TESTING");
        await petDao.removeAll();
        mongoose.disconnect();
    });
})

