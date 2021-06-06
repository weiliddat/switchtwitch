import { readFileSync, writeFileSync } from "fs";
import marked from "marked";
import { resolve } from "path/posix";

const inputFile = resolve("public/about.md");
const outputFile = resolve("public/about.html");

export default function processAbout() {
  return {
    name: "processAbout",

    load() {
      this.addWatchFile(inputFile);
    },

    generateBundle() {
      const md = readFileSync(inputFile, "utf-8");
      const html = marked(md);
      writeFileSync(outputFile, html);
    },
  };
}
