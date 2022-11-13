import Filter from 'bad-words'

const validateFormInput = (input) => {
  const filter = new Filter()
  if (filter.isProfane(input)) return "Invalid input!"
  return ""
}

const validateMessage = (input) => {
  if (input === "") return "Invalid input!"
  return ""
}

export { validateFormInput, validateMessage }