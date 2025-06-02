import { useEffect, useState } from 'react';
import './AnimatedImage.css';

const AnimatedImage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="image-container">
      <img
        src="https://picsum.photos/300/300"
        alt="Animated example"
        className={`animated-image ${isVisible ? 'visible' : ''}`}
      />
    </div>
  );
};

export default AnimatedImage; 