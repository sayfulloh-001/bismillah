import React, { useRef } from 'react';
import { Search, MapPin, Briefcase, Clock, SlidersHorizontal, ChevronRight, ChevronLeft } from 'lucide-react';
import { CATEGORIES, REGIONS, EXPERIENCES, AVAILABILITIES } from '../data/mockData';

export default function SearchFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedRegion,
  setSelectedRegion,
  selectedExperience,
  setSelectedExperience,
  selectedAvailability,
  setSelectedAvailability,
  sortBy,
  setSortBy
}) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.6;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{
      padding: '2rem',
      borderRadius: '24px',
      margin: '2rem auto',
      width: '100%',
      maxWidth: '1200px',
      background: 'rgba(8, 8, 12, 0.85)',
      border: '1px solid rgba(255, 255, 255, 0.06)'
    }}>
      {/* Search Input and Basic Filters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '1rem',
        marginBottom: '1.5rem'
      }} className="filters-grid">
        
        {/* Real-time Search */}
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)'
          }} />
          <input
            type="text"
            placeholder="Ism, texnologiya yoki kalit so'z bo'yicha qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-dark"
            style={{
              paddingLeft: '2.75rem',
              borderRadius: '12px',
              fontSize: '0.95rem'
            }}
          />
        </div>

        {/* Region Filter */}
        <div style={{ position: 'relative' }}>
          <MapPin size={18} style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)',
            zIndex: 2
          }} />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="input-dark"
            style={{ paddingLeft: '2.5rem', borderRadius: '12px', appearance: 'none', cursor: 'pointer' }}
          >
            <option value="Barchasi">Hudud: Barchasi</option>
            {REGIONS.filter(r => r !== "Barchasi").map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* Experience Filter */}
        <div style={{ position: 'relative' }}>
          <Briefcase size={18} style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)',
            zIndex: 2
          }} />
          <select
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            className="input-dark"
            style={{ paddingLeft: '2.5rem', borderRadius: '12px', appearance: 'none', cursor: 'pointer' }}
          >
            <option value="Barchasi">Tajriba: Barchasi</option>
            <option value="1 yilgacha">1 yilgacha</option>
            <option value="1-3 yil">1 - 3 yil</option>
            <option value="3-5 yil">3 - 5 yil</option>
            <option value="5 yildan ortiq">5 yildan ortiq</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div style={{ position: 'relative' }}>
          <Clock size={18} style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)',
            zIndex: 2
          }} />
          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className="input-dark"
            style={{ paddingLeft: '2.5rem', borderRadius: '12px', appearance: 'none', cursor: 'pointer' }}
          >
            <option value="Barchasi">Bandlik: Barchasi</option>
            <option value="Band emas">Band emas (Bo'sh)</option>
            <option value="Band">Band</option>
          </select>
        </div>
      </div>

      {/* Sorting & Categories Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '1.25rem',
        flexWrap: 'wrap'
      }}>
        
        {/* Categories Carousel */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          flex: 1, 
          maxWidth: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <button 
            onClick={() => scroll('left')}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 5
            }}
          >
            <ChevronLeft size={16} />
          </button>
          
          <div 
            ref={scrollContainerRef}
            style={{
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              padding: '0.25rem 0',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            className="no-scrollbar"
          >
            <button
              onClick={() => setSelectedCategory('Barchasi')}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: selectedCategory === 'Barchasi' ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.08)',
                background: selectedCategory === 'Barchasi' ? 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-blue) 100%)' : 'rgba(255, 255, 255, 0.02)',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition-smooth)'
              }}
            >
              Barchasi
            </button>
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  border: '1px solid',
                  borderColor: selectedCategory === category ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.08)',
                  background: selectedCategory === category ? 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-blue) 100%)' : 'rgba(255, 255, 255, 0.02)',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 5
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Sort Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'auto' }}>
          <SlidersHorizontal size={16} style={{ color: 'var(--text-secondary)' }} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-dark"
            style={{
              padding: '0.4rem 1.75rem 0.4rem 0.75rem',
              borderRadius: '10px',
              fontSize: '0.85rem',
              width: '180px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              cursor: 'pointer'
            }}
          >
            <option value="default">Saralash: Standart</option>
            <option value="experience">Tajriba bo'yicha</option>
            <option value="success-rate">Muvaffaqiyat bo'yicha</option>
          </select>
        </div>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 900px) {
          .filters-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .filters-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
