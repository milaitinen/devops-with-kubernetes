const randomHash = Math.random().toString(36).substring(2, 24)

const printTimeAndHash = () => {
  const currentTime = new Date()
  console.log(currentTime.toISOString() + ": " + randomHash)
  setTimeout(printTimeAndHash, 5000)
}

printTimeAndHash(randomHash)