const refineText = (s, options) => {
  s = s.replace("    ", " ")
    .replace("\t", " ")
    .replace("  "," ")
    .replace("  "," ")
    .replace("  "," ")

  if (options) {
    for (const bannedWord of options.bannedWords) {
      s = s.replace(bannedWord, '*'.repeat(bannedWord.length))
    }
  }

  return s
}

module.exports = refineText
