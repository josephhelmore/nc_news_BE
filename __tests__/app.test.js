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
        expect(body.message).toBe("This article does not exist");
      });
    //if the article ID is invalid (e.g. 99) it should return a 404 not found
  });
  test("400: should respond with a 400 error if a non-numeric article_id is passed", () => {
    return request(app)
      .get("/api/articles/not-an-id")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Please enter a numerical id");
      });
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
        expect(body.message).toBe("This article does not exist");
      });
  });
  test("200: Should respond with a message if an article has no comments.", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
});
describe("POST /api/articles/:article_id/comments", () => {
  test("201: add a comment to an article and respond with the added comment", () => {
    const newComment = {
      username: "butter_bridge",
      body: "This is a test body.",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comments.body).toBe("This is a test body.");
      });
  });
  test("404: should respond with a 404 error if an invalid article_id is passed", () => {
    const newComment = {
      username: "butter_bridge",
      body: "This is a test body.",
    };
    return request(app)
      .post("/api/articles/99/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("This article does not exist");
      });
  });
  test("400: should respond with a 400 error if a non-numeric article_id is passed", () => {
    const newComment = {
      username: "butter_bridge",
      body: "This is a test body.",
    };
    return request(app)
      .post("/api/articles/not-an-id/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Please enter a numerical id");
      });
  });
});
describe("PATCH /api/articles/:article_id", () => {
  test("200: should respond with the updated article with the votes increased by the given amount, without modifying any other properties", () => {
    const newVote = { inc_votes: 100 };
    return request(app)
      .patch("/api/articles/1")
      .send(newVote)
      .expect(200)
      .then(({ body }) => {
        expect(body.article.votes).toBe(200);
        expect(body.article.article_id).toBe(1);
        expect(typeof body.article.author).toBe("string");
        expect(body.article.author).toBe("butter_bridge");
      });
  });
  test("200: should respond with the updated article with the votes decreased by the given amount without modifying other properties", () => {
    const newVote = { inc_votes: -50 };
    return request(app)
      .patch("/api/articles/1")
      .send(newVote)
      .expect(200)
      .then(({ body }) => {
        expect(body.article.votes).toBe(50);
        expect(body.article.article_id).toBe(1);
        expect(typeof body.article.author).toBe("string");
        expect(body.article.author).toBe("butter_bridge");
      });
  });
  test("404: should respond with a 404 error if an invalid article_id is passed", () => {
    const newVote = { inc_votes: 100 };
    return request(app)
      .patch("/api/articles/99")
      .send(newVote)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("This article does not exist");
      });
  });
  test("400: should respond with a 400 error if a non-numeric article_id is passed", () => {
    const newVote = { inc_votes: 100 };
    return request(app)
      .patch("/api/articles/not-an-id")
      .send(newVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Please enter a numerical id");
      });
  });
});
describe("DELETE /api/comments/:comment_id", () => {
  test("204: Should delete the comment by the given comment_id", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(() => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            const commentArray = body.comments.map((comment) => {
              return comment.comment_id;
            });
            expect(commentArray).not.toContain(1);
          });
      });
  });
  test("404: should respond with a 404 error if an invalid comment_id is passed", () => {
    return request(app)
      .delete("/api/comments/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Comment not found");
      });
  });
  test("400: Should respond with a 400 error if a non-numeric comment_id is passed", () => {
    return request(app)
      .delete("/api/comments/not-an-id")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Please enter a numerical id");
      });
  });
});
describe("FEATURE REQUEST: GET /api/articles/:column=:order:  sort_by column in asc or desc when given a valid column and order", () => {
  test("200: should default to sorting by date in descending order if no sort_by or order is given", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        for (let i = 0; i < body.articles.length - 1; i++) {
          const newdate = body.articles[i].created_at;
          const nextDate = body.articles[i + 1].created_at;
          expect(newdate >= nextDate).toBe(true);
        }
      });
  });
  test("200: should sort by the given column by descending order as default when passed a valid column and no order", () => {
    const validColumns = [
      "article_id",
      "title",
      "topic",
      "author",
      "created_at",
      "votes",
      "article_img_url",
      "comment_count",
    ];
    const requests = validColumns.map((column) => {
      return request(app)
        .get(`/api/articles?sort_by=${column}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy(column, { descending: true });
        });
    });
    return Promise.all(requests);
  });
});
