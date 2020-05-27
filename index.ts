import express from "express"
import bofyParser from "body-parser"
import fs from "fs"
import path from "path"
import { Trie } from "./trie"

const dictionaryPath = path.join(process.cwd(), "assets/dictionary.json")

const fileName = fs.readFileSync(dictionaryPath, "utf-8")
console.log("file loaded!")
const allWords: string[] = JSON.parse(fileName)
const trie = new Trie()
console.log("trie instanced")
allWords.forEach((word) => {
  trie.insert(word)
})
console.log("trie ready!")

const app = express()
app.use(bofyParser.text())

app.post("/", (req, res) => {
  const word: string = req.body
  const ok = trie.contain(word)
  res.send(ok ? "true" : "false")
})

app.listen(8080, () => {
  console.log("localhost:8080")
})
