// write your tests in here!
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const app = require("../app");
const request = require("supertest");
const e = require("express");

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
  test("200: should respond with an article object containing a comment_count property", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toHaveProperty("comment_count");
        expect(typeof body.article.comment_count).toBe("number");
        expect(body.article.comment_count).toBe(11);
      });
  });

  test("404: should respond with a 404 error if an article_id is passed that does not exist", () => {
    return request(app)
      .get("/api/articles/99")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("This data does not exist");
      });
  });
  test("400: should respond with a 400 error if a non-numeric article_id is passed", () => {
    return request(app)
      .get("/api/articles/not-an-id")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Please enter a number");
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
        expect(body.message).toBe("This data does not exist");
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
        expect(body.comment.body).toBe("This is a test body.");
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
        expect(body.message).toBe("This data does not exist");
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
        expect(body.message).toBe("Please enter a number");
      });
  });
  test('400: should respond with a 400 error if the request body is missing "username" or "body" properties', () => {
    const newComment = {
      body: "This is a test body.",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad Request");
      });
  });

  test('404: should respond with a 404 error if the username does not exist', () => {
    const newComment = {
      username: "not-a-user",
      body: "This is a test body.",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Username not found");
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
        expect(body.message).toBe("This data does not exist");
      });
  });
  test("400: should respond with a 400 error if a non-numeric article_id is passed", () => {
    const newVote = { inc_votes: 100 };
    return request(app)
      .patch("/api/articles/not-an-id")
      .send(newVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Please enter a number");
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
        expect(body.message).toBe("This data does not exist");
      });
  });
  test("400: Should respond with a 400 error if a non-numeric comment_id is passed", () => {
    return request(app)
      .delete("/api/comments/not-an-id")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Please enter a number");
      });
  });
});
describe("FEATURE REQUEST: GET /api/articles?sort_by=:column&order=:order", () => {
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
    const columns = [
      "article_id",
      "title",
      "topic",
      "author",
      "created_at",
      "votes",
      "article_img_url",
      "comment_count",
    ];
    const requests = columns.map((column) => {
      return request(app)
        .get(`/api/articles?sort_by=${column}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy(column, { descending: true });
        });
    });
    return Promise.all(requests);
  });
  test("200: should sort by the given column and order when passed valid column and order", () => {
    const columns = [
      "article_id",
      "title",
      "topic",
      "author",
      "created_at",
      "votes",
      "article_img_url",
      "comment_count",
    ];
    const orders = ["ASC", "DESC"];

    const promises = [];

    columns.forEach((column) => {
      orders.forEach((order) => {
        const promise = request(app)
          .get(`/api/articles?sort_by=${column}&order=${order}`)
          .expect(200)
          .then(({ body }) => {
            if (order === "ASC") {
              expect(body.articles).toBeSortedBy(column, { ascending: true });
            } else {
              expect(body.articles).toBeSortedBy(column, { descending: true });
            }
          });
        promises.push(promise);
      });
    });
    return Promise.all(promises);
  });
  test("400: should respond with a 400 error when passed an invalid sort_by column", () => {
    return request(app)
      .get("/api/articles?sort_by=not-an-existing-column")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Please enter a valid column.");
      });
  });
  test("400: should respond with a 400 error when passed an invalid order", () => {
    return request(app)
      .get("/api/articles?order=not-an-order")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe(
          "Please enter a valid order. Either ASC or DESC"
        );
      });
  });
});
describe("FEATURE REQUEST: GET /api/articles?topic=:topic", () => {
  test("200: Should respond with articles of a given topic", () => {
    const topics = ["coding", "cooking", "football", "cats", "mitch"];
    const requests = topics.map((topic) => {
      return request(app)
        .get(`/api/articles?topic=${topic}`)
        .expect(200)
        .then(({ body }) => {
          body.articles.forEach((article) => {
            expect(article.topic).toBe(topic);
          });
        });
    });
    return Promise.all(requests);
  });
  test("200: should respond with a 200 error when passed a topic that does not exist", () => {
    return request(app)
      .get("/api/articles?topic=not-a-topic")
      .expect(200)
      .then(({ body }) => {
       expect(body.articles).toEqual([])
      });
  });
});
describe("Invalid path handling", () => {
  test("404: should respond with a 404 error when given an invalid path", () => {
    return request(app)
      .get("/api/not-a-path")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Path not found");
      });
  });
});