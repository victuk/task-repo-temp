const addition = require("./simpletest");
const request = require("supertest");
const httpServer = require("../app");
const userModel = require("../schema/user");
const otpModel = require("../schema/otp");
const mongoose = require("mongoose");
const todoModel = require("../schema/todo");

// test("Test if 1 + 1 is 2", () => {
//    const result = addition(1, 1);
//    expect(result).toBe();
// toBeTruthy();
// toBeFasly();
// toBeNull();
// toBeUndefined();
// toBeEqual();
// not.toBe();
// toBeGreaterThan(5);
// toBeGreaterThanOrEqualTo(5);
// toBeLessThan();
// toContain();
// });

const fullName = "Victor Peter Ukok";
const email = "ukokjnr+53400@gmail.com";
let otpDetails;
let token = "";

beforeAll(async () => {

    await todoModel.deleteMany({});
  await userModel.findOneAndDelete({ email });
  await otpModel.deleteMany({});
});

afterAll(async () => {
  httpServer.close();
  await mongoose.disconnect();
});

describe("Test for register, verify and login customer", () => {
  test("Register a customer with full name, email, password and role", async () => {
    const response = await request(httpServer)
      .post("/auth/register")
      .set("Content-Type", "application/json")
      .send({
        fullName,
        email,
        password: "wearegreat234",
        role: "customer",
      });

    console.log("response.body", response.body);

    const userDetails = await userModel.findOne({ email });
    console.log("userDetails", userDetails);
    otpDetails = await otpModel.findOne({
      userId: userDetails.id,
      purpose: "verify-email",
      otpToken: response.body.otpToken,
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully!");
    expect(response.body.purpose).toBe("verify-email");
    expect(response.body.otpToken).toBe(otpDetails.otpToken);
  });

  test("Verify customer's email", async () => {
    const response = await request(httpServer)
    .patch("/auth/verify").send({
        otp: otpDetails.otp,
        otpToken: otpDetails.otpToken,
        purpose: otpDetails.purpose
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User email verified successfully");
  });

  test("Customer login with email and password", async () => {
    const response = await request(httpServer)
                            .post("/auth/login")
                            .send({
                                email,
                                password: "wearegreat234"
                            });
            token = response.body.token;
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Login successful");
        expect(response.body.userDetail.fullName).toBe(fullName);
        expect(response.body.userDetail.email).toBe(email);
        expect(response.body.token).toBeTruthy();
  });
});

describe("Test to create a and list todo", () => {
    test("Create a todo",async () => {
        const response = await request(httpServer)
                                .post("/todo/todo")
                                .send({
                                    title: "My first todo",
                                    description: "Here is  my first todo"
                                })
                                .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Todo added successfully");
        expect(response.body.newTodo.title).toBe("My first todo");
        expect(response.body.newTodo.description).toBe("Here is  my first todo");
    });
    test("Fetch todo list", async () => {
        const response = await request(httpServer)
                                .get("/todo/")
                                .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.docs.length).toBe(1);
        expect(response.body.docs[0].title).toBe("My first todo");
    });
});
