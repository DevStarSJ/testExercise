const variance = (source) => {
  const n = source.length

  if (n === 0) {
    console.log('데이터가 없습니다')
  } else if (n === 1) {
    console.log('데이터가 부족해 분산을 계산할 수 없습니다. 2개 이상의 데이터를 입려해 주세요.')
  } else {
    const variance = calculateVariance(source)
    console.log(variance)
    }
}

module.exports = variance

function calculateVariance(source) {
  const n = source.length
  const mean = calculateMean(source)
  const sumOfSquares = calculateSumOfSquares(source, mean)

  const variance = sumOfSquares / (n - 1)
  return variance
}

function calculateSumOfSquares(source, mean) {
  let sumOfSquares = 0
  for (const e of source) {
    sumOfSquares += (e - mean) * (e - mean)
  }
  return sumOfSquares
}

const calculateMean = (source) => source.reduce((a, b) => a + b, 0) / source.length

const s = [1,2,3,4,5,6]
// const s = []
// const s = [1]
variance(s)
