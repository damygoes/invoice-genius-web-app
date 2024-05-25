export const convertBase64StringToUrl = (
  base64String: string,
  type: string
) => {
  let mimeType = ''
  switch (type.toLowerCase()) {
    case 'png':
      mimeType = 'image/png'
      break
    case 'jpg':
    case 'jpeg':
      mimeType = 'image/jpeg'
      break
    default:
      throw new Error('Unsupported image type')
  }
  return `data:${mimeType};base64,${base64String}`
}
