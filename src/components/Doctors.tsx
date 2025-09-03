import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  image: string;
}

// Doctor data with images that match the website's healthcare context
// Prefer local images; robust fallback handles missing assets
const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Kwame Nkrumah",
    specialty: "Cardiology",
    bio: "Board-certified cardiologist with 15 years of experience in treating heart conditions.",
    image: "/images/doctors/african-doctor1.jpg"
  },
  {
    id: 2,
    name: "Dr. Amina Bello",
    specialty: "Pediatrics",
    bio: "Specializing in child healthcare with over 10 years of experience in pediatric care.",
    image: "/images/doctors/african-doctor2.jpg"
  },
  {
    id: 3,
    name: "Dr. Chukwuemeka Eze",
    specialty: "Orthopedics",
    bio: "Expert in joint replacement and sports medicine with 12 years of practice.",
    image: "/images/doctors/african-doctor3.jpg"
  },
  {
    id: 4,
    name: "Dr. Fatoumata Diallo",
    specialty: "Neurology",
    bio: "Specialist in neurological disorders with extensive research experience.",
    image: "/images/doctors/african-doctor4.jpg"
  },
  {
    id: 5,
    name: "Dr. Kofi Mensah",
    specialty: "General Surgery",
    bio: "Minimally invasive procedures with a focus on fast recovery.",
    image: "/images/doctors/african-doctor1.jpg"
  },
  {
    id: 6,
    name: "Dr. Zainab Abubakar",
    specialty: "Obstetrics & Gynecology",
    bio: "Compassionate care for women through all stages of life.",
    image: "/images/doctors/african-doctor2.jpg"
  },
  {
    id: 7,
    name: "Dr. Adewale Okon",
    specialty: "Internal Medicine",
    bio: "Comprehensive adult care and chronic disease management.",
    image: "/images/doctors/african-doctor3.jpg"
  },
  {
    id: 8,
    name: "Dr. Thandi Ndlovu",
    specialty: "Dermatology",
    bio: "Skin health expert with a focus on evidence-based treatments.",
    image: "/images/doctors/african-doctor4.jpg"
  }
];

const Doctors: React.FC = () => {
  // Prefer local Freepik assets; remote fallback is disabled to keep consistency with licensing and look
  const remoteFallbacks: Record<number, string> = {};
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(3);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, doctorId: number) => {
    const target = e.currentTarget as HTMLImageElement;
    const attempted = target.dataset.fallbackAttempted;
    if (!attempted) {
      target.dataset.fallbackAttempted = 'local';
      target.src = '/images/doctors/placeholder.jpg';
      return;
    }
    if (attempted === 'local') {
      target.dataset.fallbackAttempted = 'final';
      target.src = '/images/doctors/placeholder.jpg';
    }
  };
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  
  // Add this new effect to preload ALL doctor images at component mount
  useEffect(() => {
    // Preload all doctor images at once
    const preloadAllImages = async () => {
      const imagePromises = doctors.map((doctor) => {
        return new Promise<number>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, doctor.id]));
            resolve(doctor.id);
          };
          img.onerror = () => {
            // Still resolve on error, but use placeholder
            setLoadedImages(prev => new Set([...prev, doctor.id]));
            resolve(doctor.id);
          };
          img.src = doctor.image;
        });
      });
      
      // Wait for all images to load
      await Promise.all(imagePromises);
      setAllImagesLoaded(true);
    };
    
    preloadAllImages();
  }, []);
  
  // Remove the old preloading effect that loads images incrementally
  // useEffect(() => {
  //   const start = currentIndex;
  //   const end = Math.min(doctors.length, start + visibleCount + 2);
  //   for (let i = start; i < end; i++) {
  //     if (doctors[i]) {
  //       const img = new Image();
  //       img.src = doctors[i].image;
  //     }
  //   }
  // }, [currentIndex, visibleCount]);
  
  const maxIndex = Math.max(0, doctors.length - visibleCount);
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  const cardWidth = 300; // px (matches min/maxWidth below)
  const gapWidth = 32; // 2rem gap
  const translateX = -currentIndex * (cardWidth + gapWidth);

  // Preload upcoming images to reduce perceived delay
  useEffect(() => {
    const start = currentIndex;
    const end = Math.min(doctors.length, start + visibleCount + 2); // Preload visible + 2 more
    for (let i = start; i < end; i++) {
      // Check if doctor exists to prevent errors
      if (doctors[i]) {
        const img = new Image();
        img.src = doctors[i].image;
      }
    }
  }, [currentIndex, visibleCount]);
  // Animations handled by framer-motion below

  return (
    <section style={{ padding: '4rem 0', backgroundColor: '#f9fafb' }} id="doctors">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Our Expert Doctors</h2>
          <div
            style={{
              height: '4px',
              width: '120px',
              margin: '0.5rem auto 0',
              background: 'linear-gradient(to right, #ef4444, #60a5fa)'
            }}
          />
        </div>
        <div 
          style={{ position: 'relative' }}
        >
          {/* Removed heavy background orbs to reduce jank */}

          <motion.button
            aria-label="Previous"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: '#1f2937',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(4px)',
              transition: 'opacity 0.2s ease',
              cursor: currentIndex === 0 ? 'default' : 'pointer',
              opacity: currentIndex === 0 ? 0.5 : 1,
            }}
            disabled={currentIndex === 0}
            whileHover={{
              scale: 1.1,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <ChevronLeft style={{ width: '1.25rem', height: '1.25rem' }} />
          </motion.button>
          <motion.button
            aria-label="Next"
            onClick={() => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: '#1f2937',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(4px)',
              transition: 'opacity 0.2s ease',
              cursor: currentIndex >= maxIndex ? 'default' : 'pointer',
              opacity: currentIndex >= maxIndex ? 0.5 : 1,
            }}
            disabled={currentIndex >= maxIndex}
            whileHover={{
              scale: 1.1,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
          </motion.button>
          <div style={{ 
            overflowX: 'hidden', // Only hide horizontal overflow
            overflowY: 'visible', // Allow vertical overflow for the image
            paddingTop: '90px', 
            paddingBottom: '24px' // Space for the hover shadow
          }}>
            <motion.div 
              style={{ 
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '2rem',
                willChange: 'transform',
                // Add opacity control for the entire carousel
                opacity: allImagesLoaded ? 1 : 0
              }}
              animate={{ 
                x: translateX,
                opacity: allImagesLoaded ? 1 : 0 
              }}
              transition={{ 
                type: 'tween', 
                duration: 0.5, 
                ease: 'easeInOut',
                opacity: { duration: 0.3 } 
              }}
            >
            {doctors.map((doctor, idx) => (
              <motion.div // Redesigned Card
                key={doctor.id}
                style={{
                  position: 'relative',
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                  width: '300px',
                  minWidth: '300px',
                  textAlign: 'center',
                  padding: '1.5rem',
                  paddingTop: '90px',
                }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' 
                }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <motion.img 
                  initial={{ opacity: 0 }}
                  src={doctor.image}
                  alt={`${doctor.name}, ${doctor.specialty}`}
                  loading="eager"
                  // @ts-ignore - fetchpriority is supported in modern browsers
                  fetchPriority={idx === currentIndex ? 'high' : 'auto'}
                  decoding="async"
                  width={150}
                  height={150}
                  style={{
                    position: 'absolute',
                    top: '-75px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '150px',
                    height: '150px',
                    borderRadius: '9999px',
                    objectFit: 'cover',
                    border: '5px solid white',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                    willChange: 'opacity, transform',
                  }}
                  referrerPolicy="no-referrer"
                  animate={{ opacity: loadedImages.has(doctor.id) ? 1 : 0 }}
                  onLoad={() => setLoadedImages(prev => new Set(prev).add(doctor.id))}
                  onError={(e) => {
                    handleImageError(e, doctor.id);
                    setLoadedImages(prev => new Set(prev).add(doctor.id));
                  }}
                  whileHover={{ scale: 1.05, rotate: 1.5 }}
                  transition={{ opacity: { duration: 0.3, ease: 'easeIn' }, default: { type: 'tween', duration: 0.3 } }}
                />
                <div style={{ paddingTop: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
                    {doctor.name}
                  </h3>
                  <p style={{ color: '#dc2626', fontWeight: '600', marginBottom: '1rem' }}>
                    {doctor.specialty}
                  </p>
                  <p style={{ color: '#4b5563', lineHeight: '1.5', fontSize: '0.9rem' }}>
                    {doctor.bio}
                  </p>
                </div>
              </motion.div>
            ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
