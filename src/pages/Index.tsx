
import { useState, useEffect } from "react";
import { Heart, Sparkles, Star } from "lucide-react";

const Index = () => {
  const [currentShayari, setCurrentShayari] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

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
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentShayari((prev) => (prev + 1) % shayaris.length);
        setIsVisible(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const FloatingHeart = ({ delay = 0 }) => (
    <div 
      className={`absolute animate-float text-romantic-400 opacity-60`}
      style={{ 
        animationDelay: `${delay}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}
    >
      <Heart className="w-6 h-6 fill-current animate-pulse-heart" />
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
        <FloatingHeart key={i} delay={i * 0.5} />
      ))}
      
      {/* Sparkles */}
      {Array.from({ length: 20 }, (_, i) => (
        <SparkleElement key={i} delay={i * 0.3} />
      ))}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-8 h-8 text-yellow-300 animate-sparkle" />
            <h1 className="font-vibes text-6xl md:text-8xl text-white drop-shadow-lg">
              For Sumo
            </h1>
            <Star className="w-8 h-8 text-yellow-300 animate-sparkle" />
          </div>
          <p className="font-poppins text-xl md:text-2xl text-white/90 font-light">
            Someone very special deserves something special
          </p>
        </div>

        {/* Shayari Card */}
        <div className="max-w-2xl w-full mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 sparkle">
            <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              {shayaris[currentShayari].lines.map((line, index) => (
                <p 
                  key={index}
                  className="font-dancing text-2xl md:text-3xl text-white leading-relaxed text-center mb-4 last:mb-0"
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentShayari 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
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
          {Array.from({ length: 5 }, (_, i) => (
            <Heart 
              key={i} 
              className="w-6 h-6 text-romantic-300 fill-current animate-pulse-heart"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
