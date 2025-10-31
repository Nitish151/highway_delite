"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { ExperienceCard } from "@/components/experience-card";
import { Spinner } from "@/components/ui/spinner";
import { experienceService } from "@/services/api";
import type { Experience } from "@/types";

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await experienceService.getAll();
        setExperiences(data);
      } catch (err) {
        setError("Failed to load experiences. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
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

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} {...exp} />
            ))}
          </div>
        )}

        {!loading && !error && experiences.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No experiences available at the moment.</p>
          </div>
        )}
      </main>
    </div>
  );
}
