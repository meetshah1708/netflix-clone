import test from "node:test";
import assert from "node:assert/strict";
import { buildListQuery } from "./homeQuery.js";

test("returns an empty string when no filters are provided", () => {
    assert.equal(buildListQuery(undefined, undefined), "");
});

test("creates a query string with only type", () => {
    assert.equal(buildListQuery("movies", undefined), "?type=movies");
});

test("creates a query string with only genre", () => {
    assert.equal(buildListQuery(undefined, "comedy"), "?genre=comedy");
});

test("creates a query string with type and genre", () => {
    assert.equal(buildListQuery("series", "horror"), "?type=series&genre=horror");
});
