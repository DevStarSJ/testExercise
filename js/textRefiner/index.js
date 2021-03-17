const refineText = (source, options) =>
  [normalizeWhiteSpaces, compactWhiteSpaces, maskBannedWords]
    .reduce((value, filter) => filter(value, options),
    source)

const maskBannedWords = (source, options) => options ? options.bannedWords.reduce(maskBannedWord, source) : source
const maskBannedWord = (source, bannedWord) => source.replace(bannedWord, '*'.repeat(bannedWord.length))
const normalizeWhiteSpaces = (source) => source.replace("\t", " ")
const compactWhiteSpaces = (source) => source.indexOf("  ") < 0 ? source : compactWhiteSpaces(source.replace("  ", " "))

module.exports = refineText
