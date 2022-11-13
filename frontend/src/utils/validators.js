import Filter from 'bad-words'

const validateFormInput = (input) => {
  const filter = new Filter()
  if (input === "" || filter.isProfane(input)) return "Invalid input!"
  return ""
}

const validateMessage = (input) => {
  if (input === "") return "Invalid input!"
  return ""
}

export { validateFormInput, validateMessage }