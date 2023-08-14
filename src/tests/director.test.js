const request = require("supertest");
const app = require("../app");
require("../models");

const URL_DIRECTOR = "/api/v1/directors";
let directorId;

const director = {
  firstName: "Andy",
  lastName: "Biersack",
  nationality: "USA",
  image: "lorem30",
  birthday: "2000-10-06",
};

test("POST -> '/api/v1/directors' should return status code 201 and res.body.firstName === director.firstName", async () => {
  const res = await request(app).post(URL_DIRECTOR).send(director);

  directorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

test("GET -> '/api/v1/directors' should return status code 200 and res.body.toHaveLength === 1", async () => {
  const res = await request(app).get(URL_DIRECTOR);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT -> '/api/v1/directors/:id' should return status code 200 and res.body.firstName === directorUpdate.firstName", async () => {
  const directorUpdate = {
    firstName: "Andy",
    lastName: "Black",
    nationality: "USA",
    image: "lorem30",
    birthday: "2000-10-06",
  };
  const res = await request(app)
    .put(`${URL_DIRECTOR}/${directorId}`)
    .send(directorUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined;
  expect(res.body.firstName).toBe(directorUpdate.firstName);
});

test("DELETE -> '/api/v1/directors/:id' should return status code 204", async () => {
  const res = await request(app).delete(`${URL_DIRECTOR}/${directorId}`);

  expect(res.status).toBe(204);
});
