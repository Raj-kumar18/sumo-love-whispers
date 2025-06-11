import { useState, useEffect, useCallback } from "react";
import { Heart, Sparkles, Star, Camera } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Index = () => {
  const [currentShayari, setCurrentShayari] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [clickedHearts, setClickedHearts] = useState<number[]>([]);
  const [surpriseMessages, setSurpriseMessages] = useState<Array<{id: number, message: string, x: number, y: number, visible: boolean}>>([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isMemoryOpen, setIsMemoryOpen] = useState(false);
  const [currentMemory, setCurrentMemory] = useState(0);

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

  const memories = [
    {
      title: "First Chat",
      description: "When we first started talking and I knew you were special",
      emoji: "💬",
      message: "Remember our first conversation? Tu itni cute thi! 😊"
    },
    {
      title: "Your Smile",
      description: "The moment I realized your smile could light up my world",
      emoji: "😊",
      message: "Tera smile dekh kar my day automatically better ho jaata hai! ✨"
    },
    {
      title: "Late Night Talks",
      description: "Those endless conversations that made time stop",
      emoji: "🌙",
      message: "Late night conversations with you = pure magic! 🌟"
    },
    {
      title: "Your Laugh",
      description: "The sound that became my favorite melody",
      emoji: "😂",
      message: "Teri laughter sun kar lagta hai jaise music chal raha ho! 🎵"
    },
    {
      title: "Special Moments",
      description: "Every little thing that makes you uniquely you",
      emoji: "💖",
      message: "Tu bohot special hai Sumo, aur ye tu jaanti hai! 💝"
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

  // Shayari auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentShayari((prev) => (prev + 1) % shayaris.length);
        setIsVisible(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, [shayaris.length]);

  // Cleanup old messages to prevent memory leaks
  useEffect(() => {
    const cleanup = setInterval(() => {
      setSurpriseMessages(prev => prev.filter(msg => msg.visible));
    }, 10000);

    return () => clearInterval(cleanup);
  }, []);

  const handleHeartClick = useCallback((heartId: number, event: React.MouseEvent) => {
    // Prevent multiple clicks on the same heart
    if (clickedHearts.includes(heartId)) return;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setClickedHearts(prev => [...prev, heartId]);
    
    const newMessage = {
      id: Date.now() + Math.random(),
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
  }, [clickedHearts, messageIndex, surpriseMessagesList]);

  const handleMemoryClick = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * memories.length);
    setCurrentMemory(randomIndex);
    setIsMemoryOpen(true);
  }, [memories.length]);

  const handleNextMemory = useCallback(() => {
    setCurrentMemory((prev) => (prev + 1) % memories.length);
  }, [memories.length]);

  const handleCloseMemory = useCallback(() => {
    setIsMemoryOpen(false);
  }, []);

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

  const FloatingMemoryFrame = () => (
    <div 
      className="fixed bottom-20 right-8 cursor-pointer group animate-float z-30"
      onClick={handleMemoryClick}
      style={{ animationDelay: '1s' }}
    >
      <div className="relative bg-gradient-to-br from-pink-400 to-purple-500 p-1 rounded-2xl shadow-2xl group-hover:scale-110 transition-all duration-300">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 w-16 h-16 flex items-center justify-center">
          <Camera className="w-8 h-8 text-purple-600 group-hover:animate-bounce" />
        </div>
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          {memories.length}
        </div>
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Special Memories 📸
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden romantic-gradient">
      {/* Floating Hearts - Reduced count */}
      {Array.from({ length: 8 }, (_, i) => (
        <FloatingHeart key={i} delay={i * 0.8} id={i} />
      ))}
      
      {/* Sparkles - Reduced count */}
      {Array.from({ length: 12 }, (_, i) => (
        <SparkleElement key={i} delay={i * 0.5} />
      ))}

      {/* Floating Memory Frame */}
      <FloatingMemoryFrame />

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
              Click on hearts for surprises & check the memory frame!
              <Camera className="w-4 h-4 text-purple-300 animate-bounce" />
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
            Hearts clicked: {clickedHearts.length} | Messages revealed: {messageIndex} | Memories: {memories.length}
          </p>
        </div>
      </div>

      {/* Memory Dialog */}
      <Dialog open={isMemoryOpen} onOpenChange={handleCloseMemory}>
        <DialogContent className="romantic-gradient border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="font-vibes text-3xl text-center text-white mb-4">
              {memories[currentMemory]?.title} {memories[currentMemory]?.emoji}
            </DialogTitle>
            <DialogDescription className="sr-only">
              A special memory dialog showing precious moments and thoughts
            </DialogDescription>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto flex items-center justify-center text-4xl animate-pulse-heart">
                {memories[currentMemory]?.emoji}
              </div>
              <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-2 -right-6 animate-sparkle" />
            </div>
            <div className="space-y-3">
              <p className="font-poppins text-white/80 text-sm italic">
                {memories[currentMemory]?.description}
              </p>
              <p className="font-dancing text-xl text-white/90">
                {memories[currentMemory]?.message}
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
            <button
              onClick={handleNextMemory}
              className="mt-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-200 font-poppins text-sm"
            >
              Next Memory ➡️
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
