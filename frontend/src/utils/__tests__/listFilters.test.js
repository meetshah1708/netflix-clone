import test from "node:test";
import assert from "node:assert/strict";
import { filterListsByQuery } from "../listFilters.js";

const sampleLists = [
    { title: "Trending Now" },
    { title: "Action Thrillers" },
    { title: "Comedies" }
];

test("returns all lists when query is empty", () => {
    assert.deepEqual(filterListsByQuery(sampleLists, ""), sampleLists);
});

test("matches list titles case-insensitively", () => {
    assert.deepEqual(filterListsByQuery(sampleLists, "action"), [
        { title: "Action Thrillers" }
    ]);
});

test("ignores whitespace around query", () => {
    assert.deepEqual(filterListsByQuery(sampleLists, "  now "), [
        { title: "Trending Now" }
    ]);
});
