const request = require("supertest");
const app = require("../app");
require("../models");

const URL_ACTOR = "/api/v1/actors";
let actorId;

const actor = {
  firstName: "Andy",
  lastName: "Biersack",
  nationality: "USA",
  image: "lorem30",
  birthday: "2000-10-06",
};

test("POST -> '/api/v1/actors' should return status code 201 and res.body.firstName === actor.firstName", async () => {
  const res = await request(app).post(URL_ACTOR).send(actor);

  actorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test("GET -> '/api/v1/actors' should return status code 200 and res.body.toHaveLength === 1", async () => {
  const res = await request(app).get(URL_ACTOR);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT -> '/api/v1/actors/:id' should return status code 200 and res.body.firstName === actorUpdate.firstName", async () => {
  const actorUpdate = {
    firstName: "Andy",
    lastName: "Black",
    nationality: "USA",
    image: "lorem30",
    birthday: "2000-10-06",
  };
  const res = await request(app)
    .put(`${URL_ACTOR}/${actorId}`)
    .send(actorUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined;
  expect(res.body.firstName).toBe(actorUpdate.firstName);
});

test("DELETE -> '/api/v1/actors/:id' should return status code 204", async () => {
  const res = await request(app).delete(`${URL_ACTOR}/${actorId}`);

  expect(res.status).toBe(204);
});
