export default function base64ToImageFile(base64Data: string): File {
  const base64Image = base64Data.split(';base64,').pop() || ''
  const arrayBuffer = Uint8Array.from(atob(base64Image), (c) =>
    c.charCodeAt(0),
  ).buffer

  // Create a unique filename based on the current timestamp
  const timestamp = new Date().getTime()
  const fileName = `image_${timestamp}.png`

  const file = new File([arrayBuffer], fileName, { type: 'image/png' })

  return file
}
