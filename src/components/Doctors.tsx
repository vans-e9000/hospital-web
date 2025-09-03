import React, { useEffect, useMemo, useState } from 'react';
// framer-motion removed here to reduce runtime overhead in this section

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
    image: `${process.env.PUBLIC_URL}/images/doctors/cheerful-ethnic-doctor-with-arms-crossed.jpg`
  },
  {
    id: 2,
    name: "Dr. Amina Bello",
    specialty: "Pediatrics",
    bio: "Specializing in child healthcare with over 10 years of experience in pediatric care.",
    image: `${process.env.PUBLIC_URL}/images/doctors/woman-african-ethnicity-working-as-doctor-medical-cabinet.jpg`
  },
  {
    id: 3,
    name: "Dr. Chukwuemeka Eze",
    specialty: "Orthopedics",
    bio: "Expert in joint replacement and sports medicine with 12 years of practice.",
    image: `${process.env.PUBLIC_URL}/images/doctors/confident-male-nurse-hospital-hallway.jpg`
  },
  {
    id: 4,
    name: "Dr. Fatoumata Diallo",
    specialty: "Neurology",
    bio: "Specialist in neurological disorders with extensive research experience.",
    image: `${process.env.PUBLIC_URL}/images/doctors/medium-shot-smiley-doctor-with-coat.jpg`
  },
  {
    id: 5,
    name: "Dr. Kofi Mensah",
    specialty: "General Surgery",
    bio: "Minimally invasive procedures with a focus on fast recovery.",
    image: `${process.env.PUBLIC_URL}/images/doctors/black-nurse-man-getting-ready-work.jpg`
  },
  {
    id: 6,
    name: "Dr. Zainab Abubakar",
    specialty: "Obstetrics & Gynecology",
    bio: "Compassionate care for women through all stages of life.",
    image: `${process.env.PUBLIC_URL}/images/doctors/woman-with-dreadlocks-dark-skinned-doctor-woman-hospital-gown.jpg`
  },
  {
    id: 7,
    name: "Dr. Adewale Okon",
    specialty: "Internal Medicine",
    bio: "Comprehensive adult care and chronic disease management.",
    image: `${process.env.PUBLIC_URL}/images/doctors/medium-shot-health-worker-with-equipment.jpg`
  },
  {
    id: 8,
    name: "Dr. Thandi Ndlovu",
    specialty: "Dermatology",
    bio: "Skin health expert with a focus on evidence-based treatments.",
    image: `${process.env.PUBLIC_URL}/images/doctors/male-nurse-working-clinic.jpg`
  }
];

const Doctors: React.FC = () => {
  // Prefer local Freepik assets; remote fallback is disabled to keep consistency with licensing and look
  const remoteFallbacks: Record<number, string> = {};

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, doctorId: number) => {
    const target = e.currentTarget as HTMLImageElement;
    const attempted = (target as any).dataset?.fallbackAttempted;
    if (!attempted) {
      if ((target as any).dataset) {
        (target as any).dataset.fallbackAttempted = 'local';
      }
      target.src = `${process.env.PUBLIC_URL}/images/doctors/placeholder.jpg`;
      return;
    }
    if (attempted === 'local') {
      if ((target as any).dataset) {
        (target as any).dataset.fallbackAttempted = 'final';
      }
      target.src = 'https://placehold.co/640x400?text=Doctor+Image';
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, doctors.length - visibleCount);
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  const cardWidth = 300; // px (matches min/maxWidth below)
  const gapWidth = 32; // 2rem gap
  const translateX = useMemo(() => 0, []);
  const visibleDoctors = useMemo(() => {
    const end = Math.min(doctors.length, currentIndex + visibleCount + 1);
    return doctors.slice(currentIndex, end);
  }, [currentIndex, visibleCount]);

  // Preload upcoming images to reduce perceived delay
  useEffect(() => {
    const preloadCount = visibleCount + 2; // preload a bit ahead
    const start = currentIndex;
    const end = Math.min(doctors.length, start + preloadCount);
    for (let i = start; i < end; i++) {
      const img = new Image();
      img.src = doctors[i].image;
    }

    // Hint browser to prioritize the first visible image
    const first = doctors[currentIndex]?.image;
    if (first) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = first;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
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

          <button
            aria-label="Previous"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '9999px',
              width: '3.75rem',
              height: '3.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 14px rgba(220,38,38,0.25)',
              fontSize: '1.75rem',
              transition: 'opacity 0.2s ease',
              cursor: currentIndex === 0 ? 'default' : 'pointer',
              opacity: currentIndex === 0 ? 0.5 : 1
            }}
            disabled={currentIndex === 0}
            onMouseEnter={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.transform = 'translateY(-50%) scale(1.03)'; e.currentTarget.style.backgroundColor = '#b91c1c'; } }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%)'; e.currentTarget.style.backgroundColor = '#dc2626'; }}
            onMouseDown={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.transform = 'translateY(-50%) scale(0.99)'; } }}
            onMouseUp={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.transform = 'translateY(-50%) scale(1.02)'; } }}
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={() => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))}
            style={{
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '9999px',
              width: '3.75rem',
              height: '3.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 14px rgba(220,38,38,0.25)',
              fontSize: '1.75rem',
              transition: 'opacity 0.2s ease',
              cursor: currentIndex >= maxIndex ? 'default' : 'pointer',
              opacity: currentIndex >= maxIndex ? 0.5 : 1
            }}
            disabled={currentIndex >= maxIndex}
            onMouseEnter={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.transform = 'translateY(-50%) scale(1.03)'; e.currentTarget.style.backgroundColor = '#b91c1c'; } }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%)'; e.currentTarget.style.backgroundColor = '#dc2626'; }}
            onMouseDown={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.transform = 'translateY(-50%) scale(0.99)'; } }}
            onMouseUp={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.transform = 'translateY(-50%) scale(1.02)'; } }}
          >
            ›
          </button>
          <div style={{ 
            overflow: 'hidden'
          }}>
            <div 
              style={{ 
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '2rem',
                width: '100%',
                transform: `translate3d(${translateX}px, 0, 0)`,
                willChange: 'transform'
              }}
            >
          {visibleDoctors.map((doctor, idxVisible) => (
            <div
              key={doctor.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                minWidth: '300px',
                maxWidth: '300px',
                contain: 'layout paint style',
                transition: 'transform 200ms ease-out, box-shadow 200ms ease-out'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 22px rgba(0,0,0,0.12)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; }}
            >
              <div style={{ height: '16rem', overflow: 'hidden' }}>
                <img 
                  src={doctor.image}
                  alt={`${doctor.name}, ${doctor.specialty}`}
                  loading={idxVisible === 0 ? 'eager' : 'lazy'}
                  // @ts-ignore fetchpriority is experimental but supported in Chromium
                  fetchpriority={idxVisible === 0 ? 'high' : 'auto'}
                  decoding="async"
                  width={300}
                  height={256}
                  sizes="(max-width: 640px) 100vw, 300px"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    transition: 'transform 220ms ease-out'
                  }}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, doctor.id)}
                  onMouseOver={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.02)'; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {doctor.name}
                </h3>
                <p style={{ color: '#dc2626', fontWeight: '500', marginBottom: '0.75rem' }}>
                  {doctor.specialty}
                </p>
                <p style={{ color: '#4b5563', lineHeight: '1.5' }}>
                  {doctor.bio}
                </p>
              </div>
            </div>
          ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
