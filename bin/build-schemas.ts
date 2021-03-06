#!/usr/bin/env ts-node-script
import { promises as fs } from "fs";
import * as path from "path";
import * as tsj from "ts-json-schema-generator";
import * as tjs from "typescript-json-schema";

async function main() {
  const config: tsj.Config = {
    tsconfig: "./tsconfig.json",
    encodeRefs: true,
  };

  await fs.rmdir("./schemas", { recursive: true });
  await fs.mkdir("./schemas", { recursive: true });

  const program = tjs.programFromConfig("./tsconfig.json");

  for await (const srcFilePath of walk("./types/")) {
    // const schema = tjs.generateSchema(program, "*", {
    //   excludePrivate: true,
    //   include: [srcFilePath],
    //   topRef: true,
    //   defaultProps: true,
    // });

    // const { name: fileNameWithoutExtension } = path.parse(srcFilePath);
    // const outPath = `schemas/${fileNameWithoutExtension}.json`;
    // await fs.writeFile(outPath, JSON.stringify(schema, null, 2));

    const generator = tsj.createGenerator({ ...config, path: srcFilePath });
    const schema = generator.createSchema();
    const { name: fileNameWithoutExtension } = path.parse(srcFilePath);
    if (!schema.definitions) {
      continue;
    }
    for (const type of Object.keys(schema.definitions)) {
      const typeSchema = generator.createSchema(type);
      const dirPath = `./schemas/${fileNameWithoutExtension}`;
      await fs.mkdir(dirPath, { recursive: true });
      const outPath = `${dirPath}/${type}.json`;
      console.log(`${srcFilePath}::${type} -> ${outPath}`);
      await fs.writeFile(outPath, JSON.stringify(typeSchema, null, 2));
    }
  }
}

async function* walk(dir: string): AsyncGenerator<string, void> {
  for await (const subdir of await fs.opendir(dir)) {
    const entry = path.join(dir, subdir.name);
    if (subdir.isDirectory()) {
      yield* walk(entry);
    } else if (subdir.isFile()) {
      yield entry;
    }
  }
}

main();
