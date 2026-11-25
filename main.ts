// The Best Meal You Ever Had — entry program.
//
// Writes one sentence, at most 200 characters, about the best meal
// the entrant ever had, to /output/entry.txt for the make.fun judge.
// The gate only accepts UTF-8 text of 1 to 200 characters, so the
// sentence is checked here first and the run fails loudly otherwise.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const SENTENCE =
  "At a plastic table on a Jakarta sidewalk past midnight, my grandmother " +
  "ladled soto ayam over steaming rice, the broth fogging my glasses, " +
  "and twenty years on I still chase that steam.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function fail(message: string): never {
  throw new Error(`entry rejected: ${message}`);
}

function checkSentence(text: string): void {
  const trimmed = text.trim();
  if (trimmed.length === 0) fail("sentence is empty");
  if (trimmed.length > MAX_CHARS) {
    fail(`sentence is ${trimmed.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (trimmed !== text) fail("sentence has surrounding whitespace");
  if (/[\r\n]/.test(text)) fail("sentence spans more than one line");
  const stops = (text.match(/[.!?]/g) ?? []).length;
  if (stops !== 1 || !/[.!?]$/.test(text)) {
    fail("sentence must end with exactly one sentence-ending mark");
  }
}

function main(): void {
  checkSentence(SENTENCE);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, SENTENCE + "\n", "utf8");
  console.log(`wrote ${SENTENCE.length} characters to ${OUTPUT_PATH}`);
}

main();
