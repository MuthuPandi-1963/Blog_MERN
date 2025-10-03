'use client';

import React, { useState, useEffect } from 'react';
import { CountrySlider } from '../../Components/custom/CountrySlider';
import { useCountries } from '../../hooks/useCountries';
import { BlogGrid } from './BlogGrid';
import { useBlogs } from '../../hooks/useBlogs';

export function NewsPage() {
  const { countries, isLoading } = useCountries();
  const { blogs, isLoading: loading } = useBlogs();

  const [selectedCountry, setSelectedCountry] = useState('all');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // 🔹 Handle country selection
  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  // 🔹 Filter blogs whenever data or selection changes
  useEffect(() => {
    if (!loading && blogs.length > 0) {
      if (selectedCountry === 'all') {
        setFilteredBlogs(blogs);
      } else {
        setFilteredBlogs(
          blogs.filter((blog) => blog.country?.code === selectedCountry)
        );
      }
    }
  }, [blogs, selectedCountry, loading]);

  return (
    <div className="min-h-screen bg-background mt-20">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold tracking-tight">Global News</h1>
          <p className="text-muted-foreground mt-2">
            Stay updated with the latest news from around the world
          </p>
        </div>
      </header>

      {/* Country Slider */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <CountrySlider
            countries={countries}
            selectedCountry={selectedCountry}
            onCountrySelect={handleCountrySelect}
          />
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {selectedCountry === 'all'
                ? 'Latest News'
                : `News from ${
                    countries.find((c) => c.code === selectedCountry)?.name
                  }`}
            </h2>
            <p className="text-muted-foreground mt-1">
              {filteredBlogs.length} article
              {filteredBlogs.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {selectedCountry !== 'all' && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filtered by:</span>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm">
                {countries.find((c) => c.code === selectedCountry)?.code}
                <span className="ml-2">
                  {countries.find((c) => c.code === selectedCountry)?.name}
                </span>
                <button
                  onClick={() => handleCountrySelect('all')}
                  className="ml-2 hover:bg-primary-foreground/20 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        <BlogGrid blogs={filteredBlogs} />
      </section>
    </div>
  );
}
