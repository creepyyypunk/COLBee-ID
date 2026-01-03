import { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import UserInfoForm from './components/Form/UserInfoForm';
import AvatarUpload from './components/Form/AvatarUpload';
import RoleSelector from './components/Form/RoleSelector';
import AchievementSelector from './components/Form/AchievementSelector';
import CardPreview from './components/Card/CardPreview';
import Button from './components/UI/Button';
import { BGPattern } from './components/UI/BGPattern';
import CardModal from './components/Card/CardModal';
import { CardData } from './types/card.types';
import { generateCardImageAsBase64, generateCardFilename } from './utils/imageGenerator';
import { preloadAllImages, preloadCardImages } from './utils/imagePreloader';

function App() {
  const [cardData, setCardData] = useState<CardData>({
    username: '',
    avatar: null,
    twitter: '',
    discord: '',
    role: 'newbee',
    achievements: []
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isPreloading, setIsPreloading] = useState(true);

  // Preload all images on app mount for better performance
  useEffect(() => {
    setIsPreloading(true);
    preloadAllImages()
      .catch(err => {
        console.error('Failed to preload images:', err);
      })
      .finally(() => {
        setIsPreloading(false);
      });
  }, []);

  // Preload card-specific images when card data changes
  useEffect(() => {
    if (cardData.role) {
      preloadCardImages(cardData.role, cardData.achievements, cardData.avatar || undefined).catch(err => {
        console.error('Failed to preload card images:', err);
      });
    }
  }, [cardData.role, cardData.achievements, cardData.avatar]);

  const updateUserInfo = (info: { username?: string; twitter?: string; discord?: string }) => {
    setCardData(prev => ({ ...prev, ...info }));
  };

  const updateAvatar = (avatar: string | null) => {
    setCardData(prev => ({ ...prev, avatar }));
  };

  const updateRole = (role: string) => {
    setCardData(prev => ({ ...prev, role }));
  };

  const updateAchievements = (achievements: string[]) => {
    setCardData(prev => ({ ...prev, achievements }));
  };

  const handleOpenModal = async () => {
    if (!cardData.username) {
      alert('Please enter a username before viewing your card');
      return;
    }

    // Show generating state
    setIsGenerating(true);

    try {
      // Preload card images one more time to ensure they're ready
      await preloadCardImages(cardData.role, cardData.achievements, cardData.avatar || undefined);

      // Small delay to ensure DOM is ready
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate image as base64
      const imageDataUrl = await generateCardImageAsBase64('card-export');
      setGeneratedImage(imageDataUrl);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to generate card:', error);
      alert('Failed to generate card. Please check your internet connection and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Clear image to free memory
    setGeneratedImage(null);
  };

  const handleDownloadFromModal = () => {
    if (!generatedImage || !cardData.username) return;

    // Use the already generated image from state
    const link = document.createElement('a');
    link.download = generateCardFilename(cardData.username);
    link.href = generatedImage;
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <BGPattern variant="dots" mask="fade-edges" size={20} fill="#D4D4D4" />

      <Header />

      <main className="flex-1 container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Row 1, Col 1: Your Information */}
          <section className="glass-card p-8">
            <h2 className="section-title">Your Information</h2>
            <UserInfoForm
              username={cardData.username}
              twitter={cardData.twitter}
              discord={cardData.discord}
              onChange={updateUserInfo}
            />
          </section>

          {/* Row 1, Col 2: Role */}
          <section className="glass-card p-8">
            <h2 className="section-title">Select Your Role *</h2>
            <RoleSelector
              selectedRole={cardData.role}
              onChange={updateRole}
            />
          </section>

          {/* Row 2, Col 1: Profile Picture */}
          <section className="glass-card p-8">
            <h2 className="section-title">Add your PFP here</h2>
            <AvatarUpload
              currentAvatar={cardData.avatar}
              onChange={updateAvatar}
            />
          </section>

          {/* Row 2, Col 2: Additional Roles */}
          <section className="glass-card p-8">
            <h2 className="section-title">Additional Roles</h2>
            <AchievementSelector
              selected={cardData.achievements}
              onChange={updateAchievements}
            />
          </section>
        </div>

        {/* Get your ID Card button */}
        <div className="max-w-5xl mx-auto mt-8">
          <Button
            onClick={handleOpenModal}
            disabled={!cardData.username || isGenerating || isPreloading}
            className="w-full md:w-auto md:min-w-[300px] md:mx-auto md:block text-base"
          >
            {isPreloading ? 'Loading images...' : isGenerating ? 'Generating...' : 'Get your ID Card'}
          </Button>
          {!cardData.username && !isPreloading && (
            <p className="text-sm text-honey-600 text-center font-light mt-2">
              Please enter your username to view your card
            </p>
          )}
        </div>
      </main>

      <Footer />

      <CardModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageUrl={generatedImage}
        onDownload={handleDownloadFromModal}
      />

      <div className="fixed -left-[99999px] top-0">
        <CardPreview cardData={cardData} id="card-export" scale={1} />
      </div>
    </div>
  );
}

export default App;
