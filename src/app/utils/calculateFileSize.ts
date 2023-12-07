export default function calculateFileSize(imgBase64: string): string {
  // Remove data URI prefix
  const base64Data = imgBase64.split(';base64,').pop() || ''

  // Decode the base64 string into binary data
  const binaryData = atob(base64Data)

  // Calculate the size of the image data
  const sizeInBytes: number = binaryData.length

  // Format the size and return the result
  if (sizeInBytes >= 1024 * 1024) {
    const sizeInMB: string = (sizeInBytes / (1024 * 1024)).toFixed(2)
    return `${sizeInMB} MB`
  } else if (sizeInBytes >= 1024) {
    const sizeInKB: string = (sizeInBytes / 1024).toFixed(2)
    return `${sizeInKB} KB`
  } else {
    return `${sizeInBytes} bytes`
  }
}
