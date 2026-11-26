import { mkdirSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

interface FortuneConfig {
  readonly outputPath: string;
  readonly minChars: number;
  readonly maxChars: number;
}

const DEFAULT_OUTPUT_PATH = "/output/entry.txt";
const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 120;

export const FORTUNE_MESSAGE =
  "Ignore the voice saying \"just one small refactor\"; it works on commission for PagerDuty.";

function resolveOutputPath(argv: readonly string[]): string {
  const outFlagIndex = argv.indexOf("--out");
  if (outFlagIndex !== -1 && argv[outFlagIndex + 1]) {
    return argv[outFlagIndex + 1];
  }
  const envOut = process.env.MAKEFUN_OUTPUT_PATH;
  if (envOut && envOut.trim().length > 0) {
    return envOut.trim();
  }
  return DEFAULT_OUTPUT_PATH;
}

export function validateFortuneEntry(
  text: string,
  minChars: number = MIN_ENTRY_CHARS,
  maxChars: number = MAX_ENTRY_CHARS,
): { readonly ok: boolean; readonly chars: number; readonly bytes: number; readonly reason?: string } {
  const chars = Array.from(text).length;
  const bytes = Buffer.byteLength(text, "utf8");
  if (text.trim().length === 0) {
    return { ok: false, chars, bytes, reason: "entry must not be empty or whitespace-only" };
  }
  if (/[\r\n\t\0]/.test(text)) {
    return { ok: false, chars, bytes, reason: "entry must be a single line without control characters" };
  }
  if (chars < minChars || chars > maxChars) {
    return {
      ok: false,
      chars,
      bytes,
      reason: `entry length ${chars} must be between ${minChars} and ${maxChars}`,
    };
  }
  return { ok: true, chars, bytes };
}

export function writeFortune(config: FortuneConfig, message: string): void {
  const check = validateFortuneEntry(message, config.minChars, config.maxChars);
  if (!check.ok) {
    throw new Error(`Invalid fortune entry: ${check.reason}`);
  }
  mkdirSync(dirname(config.outputPath), { recursive: true });
  writeFileSync(config.outputPath, message, { encoding: "utf8" });
}

export function main(argv: readonly string[] = process.argv.slice(2)): void {
  const outputPath = resolveOutputPath(argv);
  writeFortune(
    {
      outputPath,
      minChars: MIN_ENTRY_CHARS,
      maxChars: MAX_ENTRY_CHARS,
    },
    FORTUNE_MESSAGE,
  );
}

function isDirectEntrypoint(): boolean {
  if (typeof process.argv[1] !== "string") {
    return false;
  }
  const currentPath = fileURLToPath(import.meta.url);
  try {
    return realpathSync(process.argv[1]) === realpathSync(currentPath);
  } catch {
    return resolve(process.argv[1]) === resolve(currentPath);
  }
}

if (isDirectEntrypoint()) {
  main();
}
