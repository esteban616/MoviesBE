const request = require("supertest");
const app = require("../app");
require("../models");

const URL_GENRE = "/api/v1/genres";
let genreId;

const genre = {
  name: "action",
};

test("POST -> '/api/v1/genres' should return status code 201 and res.body.name === genre.name", async () => {
  const res = await request(app).post(URL_GENRE).send(genre);

  genreId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genre.name);
});

test("GET -> '/api/v1/genres' should return status code 200 and res.body.toHaveLength === 1", async () => {
  const res = await request(app).get(URL_GENRE);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT -> '/api/v1/genres/:id' should return status code 200 and res.body.name === genreUpdate.name", async () => {
  const genreUpdate = {
    name: "terror",
  };
  const res = await request(app)
    .put(`${URL_GENRE}/${genreId}`)
    .send(genreUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined;
  expect(res.body.name).toBe(genreUpdate.name);
});

test("DELETE -> '/api/v1/genres/:id' should return status code 204", async () => {
  const res = await request(app).delete(`${URL_GENRE}/${genreId}`);

  expect(res.status).toBe(204);
});
