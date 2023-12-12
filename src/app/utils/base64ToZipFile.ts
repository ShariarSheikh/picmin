export default function base64ToZipFile(base64OfZipFile: string) {
  const zipFileData = Uint8Array.from(atob(base64OfZipFile), (c) =>
    c.charCodeAt(0),
  )

  // Create a Blob from the binary data
  const blob = new Blob([zipFileData], { type: 'application/zip' })

  return blob
}
