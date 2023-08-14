const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models");

const URL_MOVIE = "/api/v1/movies";
let movieId;

const movie = {
  name: "American Satan",
  image: "lorem30",
  synopsis: "lorem30",
  releaseYear: "2018-02-06",
};

test("POST -> '/api/v1/movies' should return status code 201 and res.body.name === movie.name", async () => {
  const res = await request(app).post(URL_MOVIE).send(movie);

  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("GET -> '/api/v1/movies' should return status code 200 and res.body.toHaveLength === 1", async () => {
  const res = await request(app).get(URL_MOVIE);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT -> '/api/v1/movies/:id' should return status code 200 and res.body.name === mvieUpdate.name", async () => {
  const movieUpdate = {
    name: "American ",
    image: "lorem30",
    synopsis: "lorem30",
    releaseYear: "2018-02-06",
  };
  const res = await request(app)
    .put(`${URL_MOVIE}/${movieId}`)
    .send(movieUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined;
  expect(res.body.name).toBe(movieUpdate.name);
});

test("POST -> '/api/v1/movies/:id/actors', should return status code 200 and res.body.length === 1", async () => {
  const actor = {
    firstName: "Andy",
    lastName: "Biersack",
    nationality: "USA",
    image: "lorem30",
    birthday: "2000-10-06",
  };

  const createActor = await Actor.create(actor);

  const res = await request(app)
    .post(`${URL_MOVIE}/${movieId}/actors`)
    .send([createActor.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createActor.id);

  await createActor.destroy();
});
test("POST -> '/api/v1/movies/:id/directors', should return status code 200 and res.body.length === 1", async () => {
  const director = {
    firstName: "Andy",
    lastName: "Biersack",
    nationality: "USA",
    image: "lorem30",
    birthday: "2000-10-06",
  };

  const createDirector = await Director.create(director);

  const res = await request(app)
    .post(`${URL_MOVIE}/${movieId}/directors`)
    .send([createDirector.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createDirector.id);

  await createDirector.destroy();
});
test("POST -> '/api/v1/movies/:id/genres', should return status code 200 and res.body.length === 1", async () => {
  const genre = {
    name: "terror",
  };

  const createGenre = await Genre.create(genre);

  const res = await request(app)
    .post(`${URL_MOVIE}/${movieId}/genres`)
    .send([createGenre.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createGenre.id);

  await createGenre.destroy();
});

test("DELETE -> '/api/v1/movies/:id' should return status code 204", async () => {
  const res = await request(app).delete(`${URL_MOVIE}/${movieId}`);

  expect(res.status).toBe(204);
});
