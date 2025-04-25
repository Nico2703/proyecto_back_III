import mongoose from "mongoose";
import envsConfig from "../../src/config/envs.config.js";
import { userDao } from "../../src/modules/users/user.dao.js";
import { expect } from "chai";

describe("Testing de userDao", () =>{
    let userTest;

    before(async() =>{
        console.log("Inicio de TESTING");
        await mongoose.connect(envsConfig.MONGO_URL_TESTING);
    });

    it("Retorno de array completo de usuarios", async () =>{
        const users = await userDao.getAll();
        expect(users).to.be.an("array");
    });

    it("Creación de usuario", async () =>{
        const newUser = {
            first_name: "Juan",
            last_name: "Carmona",
            email: "juan@gmail.com",
            password: "contraseña1234",
        };
        const user = await userDao.create(newUser);
        userTest = user;
        
        expect(user).to.be.an("object");
        expect(user).to.have.property("_id");
        expect(user).to.have.property("first_name");
        expect(user).to.have.property("last_name");

        expect(user).to.not.have.property("age");
    });

    it("Obtener usuario por ID", async () =>{
        const user = await userDao.getOne({ _id: userTest._id });

        expect(user).to.be.an("object");
        expect(user).to.have.property("_id");
        expect(user).to.have.property("first_name");
        expect(user).to.have.property("last_name");

        expect(user.first_name).to.be.equal("Juan");
    });

    it("Actualizar usuario", async () =>{
        const userUpdateData = {
            first_name: "Juan",
            last_name: "Morales",
        };

        const userUpdate = await userDao.update(userTest._id, userUpdateData);

        expect(userUpdate).to.be.an("object");
        expect(userUpdate).to.have.property("_id");
        expect(userUpdate).to.have.property("first_name");
        expect(userUpdate).to.have.property("last_name");

        expect(userUpdate.last_name).to.be.equal("Morales");
    });

    it("Eliminar un usuario", async() =>{
        await userDao.remove(userTest._id);

        const user = await userDao.getOne({ _id: userTest._id });
        expect(user).to.be.null;
    });

    after(async () =>{
        console.log("Fin de TESTING");
        await userDao.removeAll();
        mongoose.disconnect();
    });
})

