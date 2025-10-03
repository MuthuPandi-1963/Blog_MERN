'use client';

import {useRef} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// interface CountrySliderProps {
//   countries: Country[];
//   selectedCountry: string;
//   onCountrySelect: (countryCode: string) => void;
// }

export function CountrySlider({ countries, selectedCountry, onCountrySelect }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Scroll Buttons */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-background/80 backdrop-blur"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-background/80 backdrop-blur"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Country List */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-2 overflow-x-auto scrollbar-hide px-8 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Country Items */}
        {countries.map((country) => (
          <button
            key={country.code}
            onClick={() => onCountrySelect(country.code)}
            className={cn(
              "flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap",
              selectedCountry === country.code
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary"
            )}
          >
            <img className="w-10 rounded-2xl" src={country.flag}/>
            <span className="text-sm font-medium">{country.name}</span>
          </button>
        ))}
      </div>

      {/* Custom scrollbar hide */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}