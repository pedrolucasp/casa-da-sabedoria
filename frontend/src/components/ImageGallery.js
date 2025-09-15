import { Button } from './Button'

const ImageGallery = ({ images, onRemove }) => {
  console.log(images)
  return (
    <div className="grid grid-cols-3 gap-2 mt-2">
      {images.map((img, idx) => (
        <div key={`img-${img.name}-${img.lastModified}`} className="relative">
          <img src={URL.createObjectURL(img)}
               alt={`img-${idx}-${img.name}`}
               className="w-full h-32 object-cover rounded" />

          <Button
            type="button"
            variant="danger"
            size="xs"
            onClick={() => onRemove(idx)}
            className="absolute bottom-1 left-1"
          >
            Remover
          </Button>
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
