"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { ExperienceCard } from "@/components/experience-card";
import { Spinner } from "@/components/ui/spinner";
import { experienceService } from "@/services/api";
import type { Experience } from "@/types";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await experienceService.getAll();
        
        // Filter experiences based on search query
        if (query.trim()) {
          const filtered = data.filter((exp: Experience) => {
            const searchLower = query.toLowerCase();
            return (
              exp.title.toLowerCase().includes(searchLower) ||
              exp.description.toLowerCase().includes(searchLower) ||
              exp.location.toLowerCase().includes(searchLower)
            );
          });
          setExperiences(filtered);
        } else {
          setExperiences(data);
        }
      } catch (err) {
        setError("Failed to load experiences. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {query && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold" style={{ color: '#161616' }}>
              Search Results for "{query}"
            </h1>
            {!loading && (
              <p className="text-sm mt-1" style={{ color: '#6C6C6C' }}>
                {experiences.length} {experiences.length === 1 ? 'experience' : 'experiences'} found
              </p>
            )}
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <Spinner size="lg" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && experiences.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} {...exp} />
            ))}
          </div>
        )}

        {!loading && !error && experiences.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#161616' }}>
              No experiences found
            </h2>
            <p style={{ color: '#6C6C6C' }}>
              {query ? `No results for "${query}". Try searching with different keywords.` : 'Start searching to find adventures.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
