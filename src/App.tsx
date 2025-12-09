import { useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import UserInfoForm from './components/Form/UserInfoForm';
import AvatarUpload from './components/Form/AvatarUpload';
import RoleSelector from './components/Form/RoleSelector';
import AchievementSelector from './components/Form/AchievementSelector';
import CardPreview from './components/Card/CardPreview';
import Button from './components/UI/Button';
import { BGPattern } from './components/UI/BGPattern';
import { CardData } from './types/card.types';
import { generateCardImage, generateCardFilename } from './utils/imageGenerator';

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

  const handleDownload = async () => {
    if (!cardData.username) {
      alert('Please enter a username before downloading your card');
      return;
    }

    setIsGenerating(true);
    try {
      const filename = generateCardFilename(cardData.username);
      await generateCardImage('card-export', filename);
    } catch (error) {
      console.error('Failed to generate card:', error);
      alert('Failed to generate card. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <BGPattern variant="dots" mask="fade-edges" size={20} fill="#D4D4D4" />

      <Header />

      <main className="flex-1 container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="space-y-6">
            <section className="glass-card p-8">
              <h2 className="section-title">Your Information</h2>
              <UserInfoForm
                username={cardData.username}
                twitter={cardData.twitter}
                discord={cardData.discord}
                onChange={updateUserInfo}
              />
            </section>

            <section className="glass-card p-8">
              <h2 className="section-title">Profile Picture</h2>
              <AvatarUpload
                currentAvatar={cardData.avatar}
                onChange={updateAvatar}
              />
            </section>

            <section className="glass-card p-8">
              <h2 className="section-title">Role</h2>
              <RoleSelector
                selectedRole={cardData.role}
                onChange={updateRole}
              />
            </section>

            <section className="glass-card p-8">
              <h2 className="section-title">Additional Roles</h2>
              <AchievementSelector
                selected={cardData.achievements}
                onChange={updateAchievements}
              />
            </section>
          </div>

          <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            <section className="glass-card p-8">
              <h2 className="section-title">Preview</h2>
              <div className="w-full overflow-hidden rounded-xl bg-honey-100/50 p-4">
                <div className="w-full" style={{ aspectRatio: '1200/630' }}>
                  <CardPreview cardData={cardData} id="card-preview" scale={0.5} />
                </div>
              </div>
            </section>

            <Button
              onClick={handleDownload}
              disabled={isGenerating || !cardData.username}
              className="w-full text-base"
            >
              {isGenerating ? 'Generating...' : 'Download Card'}
            </Button>

            {!cardData.username && (
              <p className="text-sm text-honey-600 text-center font-light">
                Please enter your username to download
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <div className="fixed -left-[99999px] top-0">
        <CardPreview cardData={cardData} id="card-export" scale={1} />
      </div>
    </div>
  );
}

export default App;
