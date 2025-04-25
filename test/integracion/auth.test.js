import { expect } from "chai";
import { isValidPassword } from "../../src/common/utils/hashPassword.js";
import mongoose from "mongoose";
import supertest from "supertest";
import envsConfig from "../../src/config/envs.config.js";


const request = supertest("http://localhost:8080");

describe("Test de integración módulo Auth", () => {
  let userTest;

  before(async() =>{
      console.log("Inicio de TESTING AUTH");
      await mongoose.connect(envsConfig.MONGO_URL_TESTING);
  });

  it("Registro de usuario", async () => {
    const newUser = {
      first_name: "Juan",
      last_name: "Perez",
      email: "jp@gmail.com",
      password: "123456",
    };

    const { status, body, error } = await request.post("/api/auth/register").send(newUser);
  
    const checkPassword = isValidPassword(body, newUser.password);
    userTest = body;

    expect(status).to.be.equal(201);
    expect(body.first_name).to.be.equal("Juan");
    expect(body.last_name).to.be.equal("Perez");
    expect(body.email).to.be.equal("jp@gmail.com");
    expect(body.password).to.not.be.equal("123456"); 
    expect(checkPassword).to.be.equal(true);
    expect(body).to.be.an("object");
  });

  it("Loggin de usuario", async () => {
    const data = {
      email: "jp@gmail.com",
      password: "123456",
    };

    const { status, body, error } = await request.post("/api/auth/login").send(data);
  
    const { user } = body;
    expect(status).to.be.equal(200);
    expect(user.first_name).to.be.equal("Juan");
    expect(user.last_name).to.be.equal("Perez");
    expect(user.email).to.be.equal("jp@gmail.com");
    expect(user.password).to.not.be.equal("123456");
    expect(body.token).to.be.an("string");
  });

  after(async () => {
    try {
      await request.delete(`/api/users/${userTest._id}`);
    } catch (error) {
      console.log(error);
    }
  });
  
});
