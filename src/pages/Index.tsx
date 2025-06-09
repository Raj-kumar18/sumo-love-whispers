
import { useState, useEffect } from "react";
import { Heart, Sparkles, Star, Gift } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Index = () => {
  const [currentShayari, setCurrentShayari] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [clickedHearts, setClickedHearts] = useState<number[]>([]);
  const [surpriseMessages, setSurpriseMessages] = useState<Array<{id: number, message: string, x: number, y: number, visible: boolean}>>([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  const shayaris = [
    {
      lines: [
        "Sumo naam hai tera, kitna pyara hai",
        "Tere bina mera har din adhura hai",
        "Kehna chahta hun kuch, par keh nahi pata",
        "Bas itna jaanta hun, tu mera khwaja hai"
      ]
    },
    {
      lines: [
        "Tere hone se hi meri subah hoti hai",
        "Tere bina ye duniya suni lagi hai",
        "Sumo, tu jo hai mere paas",
        "Har khushi meri complete lagi hai"
      ]
    },
    {
      lines: [
        "Kya kahu tujhse, words kam pad jaate hain",
        "Tere liye mere feelings overflow ho jaate hain",
        "Sumo, tu special hai, aur ye tu jaanti hai",
        "Mere dil mein teri jagah permanent hai"
      ]
    },
    {
      lines: [
        "Jab tu smile karti hai, world beautiful lagti hai",
        "Tere bina meri life incomplete lagti hai",
        "Sumo, ye feelings true hain, fake nahi",
        "Tu mere liye special hai, ordinary nahi"
      ]
    },
    {
      lines: [
        "Sumo, tu meri favorite person hai",
        "Tere saath time spend karna amazing hai",
        "Kabhi kabhi lagta hai, dream hai ye sab",
        "Par tu real hai, and that's magical hai"
      ]
    }
  ];

  const surpriseMessagesList = [
    "Tu bahut cute hai! 💕",
    "Your smile lights up my day ✨",
    "Sumo = Super Awesome! 🌟",
    "You're absolutely wonderful! 💖",
    "Tu meri favorite hai! 😊",
    "Your laugh is music! 🎵",
    "You make everything better! 🌈",
    "Sumo, you're amazing! 💫",
    "You're pure magic! ✨",
    "Tu bohot special hai! 💝"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentShayari((prev) => (prev + 1) % shayaris.length);
        setIsVisible(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Cleanup old messages periodically to prevent memory leaks
  useEffect(() => {
    const cleanup = setInterval(() => {
      setSurpriseMessages(prev => prev.filter(msg => msg.visible));
    }, 5000);

    return () => clearInterval(cleanup);
  }, []);

  const handleHeartClick = (heartId: number, event: React.MouseEvent) => {
    // Prevent multiple clicks on the same heart
    if (clickedHearts.includes(heartId)) return;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setClickedHearts(prev => [...prev, heartId]);
    
    const newMessage = {
      id: Date.now(),
      message: surpriseMessagesList[messageIndex % surpriseMessagesList.length],
      x: x,
      y: y,
      visible: true
    };

    setSurpriseMessages(prev => [...prev, newMessage]);
    setMessageIndex(prev => prev + 1);

    // Remove message after 3 seconds
    setTimeout(() => {
      setSurpriseMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? {...msg, visible: false} : msg
        )
      );
    }, 3000);

    // Clean up message after animation
    setTimeout(() => {
      setSurpriseMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
    }, 3500);
  };

  const handleGiftClick = () => {
    setIsGiftOpen(true);
  };

  const FloatingHeart = ({ delay = 0, id }: { delay: number, id: number }) => (
    <div 
      className={`absolute animate-float text-romantic-400 opacity-60 cursor-pointer transition-all duration-300 hover:scale-125 ${
        clickedHearts.includes(id) ? 'text-romantic-600 animate-pulse-heart' : ''
      }`}
      style={{ 
        animationDelay: `${delay}s`,
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`
      }}
      onClick={(e) => handleHeartClick(id, e)}
    >
      <Heart className="w-8 h-8 fill-current hover:drop-shadow-lg" />
    </div>
  );

  const SparkleElement = ({ delay = 0 }) => (
    <div 
      className={`absolute animate-sparkle text-yellow-400`}
      style={{ 
        animationDelay: `${delay}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}
    >
      <Sparkles className="w-4 h-4 fill-current" />
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden romantic-gradient">
      {/* Floating Hearts */}
      {Array.from({ length: 15 }, (_, i) => (
        <FloatingHeart key={i} delay={i * 0.5} id={i} />
      ))}
      
      {/* Sparkles */}
      {Array.from({ length: 20 }, (_, i) => (
        <SparkleElement key={i} delay={i * 0.3} />
      ))}

      {/* Surprise Messages */}
      {surpriseMessages.map((msg) => (
        <div
          key={msg.id}
          className={`fixed z-50 pointer-events-none transition-all duration-500 ${
            msg.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{
            left: `${msg.x}px`,
            top: `${msg.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border-2 border-romantic-300 animate-bounce">
            <p className="font-poppins text-romantic-700 font-semibold text-sm whitespace-nowrap">
              {msg.message}
            </p>
          </div>
        </div>
      ))}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-8 h-8 text-yellow-300 animate-sparkle" />
            <h1 className="font-vibes text-6xl md:text-8xl text-white drop-shadow-lg hover:scale-105 transition-transform duration-300">
              For Sumo
            </h1>
            <Star className="w-8 h-8 text-yellow-300 animate-sparkle" />
          </div>
          <p className="font-poppins text-xl md:text-2xl text-white/90 font-light">
            Someone very special deserves something special
          </p>
        </div>

        {/* Interactive Instructions */}
        <div className="text-center mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
            <p className="font-poppins text-white/90 text-sm flex items-center gap-2 justify-center">
              <Heart className="w-4 h-4 fill-current text-romantic-300 animate-pulse-heart" />
              Click on the floating hearts for surprises!
              <Heart className="w-4 h-4 fill-current text-romantic-300 animate-pulse-heart" />
            </p>
          </div>
        </div>

        {/* Shayari Card */}
        <div className="max-w-2xl w-full mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 sparkle hover:bg-white/15 transition-all duration-300">
            <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              {shayaris[currentShayari].lines.map((line, index) => (
                <p 
                  key={index}
                  className="font-dancing text-2xl md:text-3xl text-white leading-relaxed text-center mb-4 last:mb-0 hover:scale-105 transition-transform duration-200"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-3 mb-8">
          {shayaris.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentShayari 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70 hover:scale-110'
              }`}
              onClick={() => setCurrentShayari(index)}
            />
          ))}
        </div>

        {/* Gift Box */}
        <div className="mb-8 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <div 
            className="relative group cursor-pointer"
            onClick={handleGiftClick}
          >
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300 group-hover:scale-105">
              <Gift className="w-12 h-12 text-yellow-300 mx-auto animate-float group-hover:animate-bounce" />
              <p className="font-poppins text-white text-center mt-2 text-sm">
                Special surprise box! 🎁
              </p>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <p className="font-poppins text-lg md:text-xl text-white/90 max-w-xl mx-auto leading-relaxed">
            Kuch feelings words mein express karna mushkil hota hai, 
            <br />
            but I hope ye convey kar sake what's in my heart ❤️
          </p>
        </div>

        {/* Bottom Hearts */}
        <div className="flex gap-4 mt-8 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          {Array.from({ length: 7 }, (_, i) => (
            <Heart 
              key={i + 100} 
              className="w-6 h-6 text-romantic-300 fill-current animate-pulse-heart cursor-pointer hover:scale-125 transition-transform duration-200"
              style={{ animationDelay: `${i * 0.2}s` }}
              onClick={(e) => handleHeartClick(i + 100, e)}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 text-center animate-fadeInUp" style={{ animationDelay: '1s' }}>
          <p className="font-poppins text-white/70 text-sm">
            Hearts clicked: {clickedHearts.length} | Messages revealed: {messageIndex}
          </p>
        </div>
      </div>

      {/* Gift Dialog */}
      <Dialog open={isGiftOpen} onOpenChange={setIsGiftOpen}>
        <DialogContent className="romantic-gradient border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="font-vibes text-3xl text-center text-white mb-4">
              Special Message for Sumo 💕
            </DialogTitle>
            <DialogDescription className="sr-only">
              A special romantic message dialog for Sumo with heartfelt poetry and animations
            </DialogDescription>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="relative">
              <Heart className="w-16 h-16 text-romantic-300 mx-auto animate-pulse-heart fill-current" />
              <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-2 -right-2 animate-sparkle" />
            </div>
            <div className="space-y-3">
              <p className="font-dancing text-xl text-white/90">
                "Sumo, tu kitni special hai, ye words mein express karna mushkil hai"
              </p>
              <p className="font-dancing text-xl text-white/90">
                "Tere smile se meri duniya roshan ho jaati hai"
              </p>
              <p className="font-dancing text-xl text-white/90">
                "Bas itna kehna chahta hun - tu amazing hai! ✨"
              </p>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: 5 }, (_, i) => (
                <Heart 
                  key={i} 
                  className="w-4 h-4 text-romantic-300 fill-current animate-pulse-heart"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
