import Modal from '../UI/Modal';
import Button from '../UI/Button';

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  onDownload: () => void;
}

export default function CardModal({ isOpen, onClose, imageUrl, onDownload }: CardModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        {/* Header with Back button */}
        <div className="flex items-center mb-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-bee-black hover:text-honey-600 transition-colors font-medium"
          >
            <span className="text-xl">←</span>
            <span>Back</span>
          </button>
        </div>

        {/* Card Image */}
        {imageUrl && (
          <div className="w-full mb-6">
            <div className="w-full overflow-hidden rounded-xl bg-honey-100/50 p-4">
              <img
                src={imageUrl}
                alt="COLBee ID Card"
                className="w-full h-auto rounded-lg"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </div>
        )}

        {/* Download Button */}
        <div className="flex justify-center">
          <Button
            onClick={onDownload}
            className="min-w-[200px]"
          >
            Download
          </Button>
        </div>
      </div>
    </Modal>
  );
}
