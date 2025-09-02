import React, { useEffect, useMemo, useState } from 'react';

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
  const translateX = useMemo(() => -(currentIndex * (cardWidth + gapWidth)), [currentIndex]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const t = setTimeout(() => setIsAnimating(false), 450);
    return () => clearTimeout(t);
  }, [currentIndex]);

  return (
    <section style={{ padding: '4rem 0', backgroundColor: '#f9fafb' }} id="doctors">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
          Our Expert Doctors
        </h2>
        <div style={{ position: 'relative' }}>
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
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, opacity 0.2s ease',
              cursor: currentIndex === 0 ? 'default' : 'pointer',
              opacity: currentIndex === 0 ? 0.5 : 1
            }}
            disabled={currentIndex === 0}
            onMouseEnter={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.transform = 'translateY(-50%) scale(1.06)'; e.currentTarget.style.backgroundColor = '#b91c1c'; } }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%)'; e.currentTarget.style.backgroundColor = '#dc2626'; }}
            onMouseDown={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.transform = 'translateY(-50%) scale(0.98)'; e.currentTarget.style.backgroundColor = '#991b1b'; } }}
            onMouseUp={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.transform = 'translateY(-50%) scale(1.02)'; e.currentTarget.style.backgroundColor = '#b91c1c'; } }}
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
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, opacity 0.2s ease',
              cursor: currentIndex >= maxIndex ? 'default' : 'pointer',
              opacity: currentIndex >= maxIndex ? 0.5 : 1
            }}
            disabled={currentIndex >= maxIndex}
            onMouseEnter={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.transform = 'translateY(-50%) scale(1.06)'; e.currentTarget.style.backgroundColor = '#b91c1c'; } }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%)'; e.currentTarget.style.backgroundColor = '#dc2626'; }}
            onMouseDown={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.transform = 'translateY(-50%) scale(0.98)'; e.currentTarget.style.backgroundColor = '#991b1b'; } }}
            onMouseUp={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.transform = 'translateY(-50%) scale(1.02)'; e.currentTarget.style.backgroundColor = '#b91c1c'; } }}
          >
            ›
          </button>
          <div style={{ 
            overflow: 'hidden'
          }}>
            <div style={{ 
              display: 'flex',
              flexWrap: 'nowrap',
              gap: '2rem',
              width: '100%',
              transform: `translateX(${translateX}px)`,
              transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform'
            }}>
          {doctors.map((doctor) => (
            <div key={doctor.id} style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              minWidth: '300px',
              maxWidth: '300px',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.12)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; }}
            >
              <div style={{ height: '16rem', overflow: 'hidden' }}>
                <img 
                  src={doctor.image}
                  alt={`${doctor.name}, ${doctor.specialty}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.35s ease'
                  }}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, doctor.id)}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
