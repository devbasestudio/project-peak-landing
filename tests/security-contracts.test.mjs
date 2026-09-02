import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("admin bridge uses deploy-time configuration", async () => {
  const source = await read("src/app/admin/page.tsx");
  assert.match(source, /process\.env\.ADMIN_APP_URL/);
});

test("journal renders structured markdown blocks", async () => {
  const source = await read("src/components/journal/markdown-content.tsx");
  assert.match(source, /<ul/);
  assert.match(source, /<ol/);
  assert.match(source, /<blockquote/);
  assert.match(source, /<h2/);
});
