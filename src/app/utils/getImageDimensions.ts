export default function getImageDimension(
  file: File,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = function () {
      resolve({
        width: img.width,
        height: img.height,
      })

      // if get error then set default size
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      img.onerror = function (error) {
        reject(error)
      }
    }

    img.src = URL.createObjectURL(file)
  })
}
