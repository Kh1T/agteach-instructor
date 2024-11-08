const trimText = (text) => {
  if (text.length && typeof text === "string") {
    return text.trim();
  }

  return ''
}

export default trimText;