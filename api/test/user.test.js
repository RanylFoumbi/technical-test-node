const app = require("../../app");
const supertest = require("supertest");
const User = require("../models/user");
const mongoose = require("mongoose");
let faker = require('faker');
// connect to database before each test case
beforeEach((done) => {
  mongoose.connect("mongodb://localhost/node-api",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

// Drop user collection after test
afterEach((done) => {
  mongoose.connection.db.dropCollection('users',() => {
    mongoose.connection.close(() => done())
  });
});

describe("Get all user", () => {
    test("GET /api/users/all", async () => {
      await supertest(app).get("/api/users/all")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.users)).toBeTruthy();
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("all users");
      });
    });
 });

 describe("Add new User",()=>{
  //  Save new user in the db
  test("POST /api/users/new", async () => {
    const user = {
      matricule : faker.datatype.number(),
      lastname : faker.name.firstName(),
      firstname : faker.name.lastName(),
      email : faker.internet.email(),
      phone : faker.phone.phoneNumber(),
      address: {street: faker.address.cityName(),
        postalCode: faker.phone.phoneNumber(),
        city: faker.address.cityName(),
        country: faker.address.country()
      }
    };
  
    await supertest(app).post("/api/users/new")
      .send(user)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.user._id).toBeTruthy();
        expect(response.body.user.firstname).toBe(user.firstname);
        expect(response.body.user.lastname).toBe(user.lastname);
        expect(response.body.user.email).toBe(user.email);
        expect(response.body.user.phone).toBe(user.phone);
        expect(Array.isArray(response.body.user.address)).toBeTruthy();
  
        // Check data in the database
        const data = await User.findOne({ _id: response.body.user._id });
        expect(data).toBeTruthy();
        expect(data.firstname).toBe(user.firstname);
        expect(data.lastname).toBe(user.lastname);
        expect(data.email).toBe(user.email);
        expect(data.phone).toBe(user.phone);
      });
  });
 })
    
describe("Update user infos", () => {

  test("PATCH /api/users/update/:id", async () => {
    const user = new User();
        user.matricule = faker.datatype.number(),
        user.lastname =  "RANOLF",
        user.firstname = "DURAN",
        user.email = "duran@gmail.com",
        user.phone = "258796212",
       await user.address.push({
        street: "ETOA MEKI",
        postalCode: "92300",
        city: "YAOUNDE",
        country: "CAMEROUN",
      }) 
     await user.save();
      
    const data = {
        matricule: faker.datatype.number(),
        lastname: "RANOLF",
        firstname:"DURAN",
        email: "yooo@gmail.com",
        phone: "258796212"
    }

    await supertest(app).patch("/api/users/update/" + user.id)
      .send(data)
      .expect(200)
      .then(async(response) => {
         // Check the response
        expect(response.body.user._id).toBe(user.id);
        expect(response.body.user.firstname).toBe(user.firstname);
        expect(response.body.user.lastname).toBe(user.lastname);
        expect(response.body.user.email).toBe(user.email);
        expect(response.body.user.phone).toBe(user.phone);
        expect(Array.isArray(response.body.user.address)).toBeTruthy();

    
      // Check the data in the database
      const newUser = await User.findOne({ _id: response.body.user._id });
      expect(newUser).toBeTruthy();
      expect(newUser.firstname).toBe(data.firstname);
      expect(newUser.lastname).toBe(data.lastname);
      expect(newUser.email).toBe(data.email);
      expect(newUser.phone).toBe(data.phone);
    });
  })
});

describe("delete user infos", () => {
  test("DELETE /api/users/delete/:id", async () => {
     // Save new user
    const user = new User();
        user.matricule = faker.datatype.number(),
        user.lastname = faker.name.firstName(),
        user.firstname = faker.name.lastName(),
        user.email = faker.internet.email(),
        user.phone = faker.phone.phoneNumber()
       await user.address.push({
        street: faker.address.cityName(),
        postalCode: faker.phone.phoneNumber(),
        city: faker.address.cityName(),
        country: faker.address.country()
      }) 
     await user.save();
  
    await supertest(app)
      .delete("/api/users/delete/" + user.id)
      .expect(200)
      .then(async () => {
        expect(await User.findOne({ _id: user.id })).toBeFalsy();
      });
  });
})