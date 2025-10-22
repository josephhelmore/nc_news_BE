const { keys } = require("../db/data/test-data/articles");
const {
  convertTimestampToDate,
  formatData,
  keySwapper,
} = require("../db/seeds/utils");

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe("Testing of the function formatData()", () => {
  test("should return an empty array when passed an empty array.", () => {
    const input = [];
    const output = formatData(input);
    const expected = [];

    expect(output).toEqual(expected);
  });
  test("Should return an array with ONLY the values of a single object when passed an array with a single object.", () => {
    const input = [
      {
        description: "Code is love, code is life",
        slug: "coding",
        img_url: "",
      },
    ];
    const output = formatData(input);
    const expected = [["Code is love, code is life", "coding", ""]];

    expect(output).toEqual(expected);
  });
  test("Should return a nested array of object values when passed multiple objects within an array.", () => {
    const input = [
      {
        description: "Code is love, code is life",
        slug: "coding",
        img_url: "",
      },
      {
        description: "FOOTIE!",
        slug: "football",
        img_url:
          "https://images.pexels.com/photos/209841/pexels-photo-209841.jpeg?w=700&h=700",
      },
    ];
    const output = formatData(input);
    const expected = [
      ["Code is love, code is life", "coding", ""],
      [
        "FOOTIE!",
        "football",
        "https://images.pexels.com/photos/209841/pexels-photo-209841.jpeg?w=700&h=700",
      ],
    ];

    expect(output).toEqual(expected);
  });
  test("Should not mutate the original array", () => {
    const input = [];
    const output = formatData(input);
    const expected = [];

    expect(output).not.toBe(expected);
  });
});

