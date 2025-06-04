'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PartnerLogosProps {
  className?: string;
}

export function PartnerLogos({ className }: PartnerLogosProps) {
  const partners = [
    { name: 'Piracanjuba', image: '/partner_logos/Piracanjuba_White.png' },
    { name: 'Globoplay', image: '/partner_logos/Globoplay_White.png' },    
    { name: 'Multishow', image: '/partner_logos/Multishow_White.png' },
    { name: 'MAX', image: '/partner_logos/Max_White.png' },
    { name: 'Paramount', image: '/partner_logos/Paramount_White.png' },
    { name: 'MTV', image: '/partner_logos/MTV_White.png' },
    { name: 'Prime Video', image: '/partner_logos/Prime-Video_White.png' },
    { name: 'GNT', image: '/partner_logos/GNT_White.png' },
    { name: 'Discovery', image: '/partner_logos/Discovery_White.png' },
    { name: 'HBO', image: '/partner_logos/HBO_White.png' },
    { name: 'Plugin', image: '/partner_logos/Plugin_White.png' },
    { name: 'Santa Rita', image: '/partner_logos/Santa-Rita_White.png' },
    { name: 'Natura', image: '/partner_logos/Natura_White.png' },
    { name: 'Mixer', image: '/partner_logos/Mixer_White.png' },
    { name: 'UnoBravo', image: '/partner_logos/UnoBravo_White.png' },
    { name: 'Formata', image: '/partner_logos/Formata_White.png' },
    { name: 'Gnosis', image: '/partner_logos/Gnosis_White.png' },
    { name: 'GOTS', image: '/partner_logos/GOTS_White.png' },
    { name: 'JumoHealth', image: '/partner_logos/JumoHealth_White.png' },
    { name: 'Bimbo', image: '/partner_logos/Bimbo_White.png' },
    { name: 'Gronda', image: '/partner_logos/Gronda_White.png' },
    { name: 'Moonbow', image: '/partner_logos/Moonbow_White.png' },
    { name: 'NattoPharma', image: '/partner_logos/NattoPharma_White.png' },
  ];

  return (
    <div className={cn('w-full py-12 text-white self-stretch', className)}>

      
      <div style={{ 
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        height: '80px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ 
          display: 'flex',
          animation: 'logoscroll 60s linear infinite',
          width: 'fit-content',
          alignItems: 'center'
        }}>
          {[...partners, ...partners].map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`} 
              style={{ 
                padding: '0 20px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div style={{ 
                position: 'relative',
                height: '60px',
                width: '160px'
              }}>
                <Image
                  src={partner.image}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes logoscroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
