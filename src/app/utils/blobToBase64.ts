export default function blobToBase64(
  blob: Blob,
  callback: (base64String: string) => void,
) {
  const reader = new FileReader()
  reader.onloadend = function () {
    if (typeof reader.result === 'string') {
      callback(reader.result)
    } else {
      throw new Error('Failed to convert Blob to base64.')
    }
  }
  reader.readAsDataURL(blob)
}
