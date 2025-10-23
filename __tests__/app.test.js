// write your tests in here!
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const app = require("../app");
const request = require("supertest");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});
describe("GET /api/topics", () => {
  test("200: responds with an object, with the key of topics and the value of an array of topic objects.", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.topics)).toBe(true);
        expect(typeof body.topics[0].slug).toBe("string");
        expect(typeof body.topics[0].description).toBe("string");
      });
  });
});
describe("GET /api/articles", () => {
  test("200: responds with an object with the key of articles and the value of an array of article objects.", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.articles)).toBe(true);
        expect(typeof body.articles[0].author).toBe("string");
        expect(typeof body.articles[0].title).toBe("string");
        expect(typeof body.articles[0].article_id).toBe("number");
        expect(typeof body.articles[0].topic).toBe("string");
        expect(typeof body.articles[0].created_at).toBe("string");
        expect(typeof body.articles[0].votes).toBe("number");
        expect(typeof body.articles[0].article_img_url).toBe("string");
        expect(typeof body.articles[0].comment_count).toBe("number");
        expect(body.articles[0].body).toBe(undefined);

        for (let i = 0; i < body.articles.length - 1; i++) {
          const newdate = body.articles[i].created_at;
          const nextDate = body.articles[i + 1].created_at;
          expect(newdate >= nextDate).toBe(true);
        }
      });
  });
});
describe("GET /api/users", () => {
  test("200: Should respond with an object with the key of users and the value of an array of objects ", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.users)).toBe(true);
        expect(typeof body.users[0].username).toBe("string");
        expect(typeof body.users[0].name).toBe("string");
        expect(typeof body.users[0].avatar_url).toBe("string");
      });
  });
});
describe("GET /api/articles/:article_id", () => {
  test("200: should respond with an object with the key of article and the value of an article object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.article.author).toBe("string");
      });
  });
  test("404: should respond with a 404 error if an invalid article_id is passed", () => {
    return request(app)
      .get("/api/articles/99")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Please enter a valid article_id");
      });
    //if the article ID is invalid (e.g. 99) it should return a 404 not found
  });
});
describe("GET /api/articles/:article_id/comments", () => {
  test("200: Should respond with an object with the key of comments and the value of an array of comments for the given article_id.", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.comments[0].comment_id).toBe("number");
        expect(typeof body.comments[0].votes).toBe("number");
        expect(typeof body.comments[0].created_at).toBe("string");
        expect(typeof body.comments[0].author).toBe("string");
        expect(typeof body.comments[0].body).toBe("string");
        expect(typeof body.comments[0].article_id).toBe("number");

        for (let i = 0; i < body.comments.length - 1; i++) {
          const newdate = body.comments[i].created_at;
          const nextDate = body.comments[i + 1].created_at;
          expect(newdate <= nextDate).toBe(true);
        }
      });
  });

  test("404: Should return a 404 if an article does not exist", () => {
    return request(app)
      .get("/api/articles/99/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Please enter a valid article_id");
      });
  });
});
