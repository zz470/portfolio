import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  category: string;
  roles: string[];
  imdb_url?: string;
  production_company?: string;
  media_platform?: string;
  release_date?: number;
  hero_url?: string;
  design_version?: string;
}

export function useProjects() {
    const [projects, setProjects] = useState<Project[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      async function fetchProjects() {
        try {
          const { data, error } = await supabase
            .from("portfolio_projects")
            .select("*")
            .order("created_at", { ascending: false });
  
          if (error) throw error;
          
          // Process the data to ensure thumbnail URLs are valid
          const processedData = data.map(project => {
            // Log for debugging
            console.log(`Raw project data for ${project.title}:`, project);
            
            // Ensure thumbnail_url is valid
            if (!project.thumbnail_url) {
              console.warn(`Project ${project.id} (${project.title}) is missing a thumbnail URL`);
              // Set a placeholder
              project.thumbnail_url = `https://placehold.co/600x300/gray/white?text=${encodeURIComponent(project.title)}`;
            }
            
            // If the URL is from placeholder.pics, convert it to a more reliable format
            if (project.thumbnail_url.includes('placeholder.pics')) {
              console.log(`Converting placeholder URL for ${project.title}`);
              // Extract size if possible, or default to 600x300
              const sizeMatch = project.thumbnail_url.match(/\/svg\/(\d+)/);
              const size = sizeMatch ? sizeMatch[1] : 300;
              project.thumbnail_url = `https://placehold.co/${size}x${Math.floor(size/2)}/gray/white?text=${encodeURIComponent(project.title)}`;
            }
            
            // If hero_url is not provided, default to thumbnail_url
            if (!project.hero_url) {
              project.hero_url = project.thumbnail_url;
            }
            
            return project;
          });
  
          setProjects(processedData);
        } catch (err) {
          console.error("Error fetching projects:", err);
          setError("Failed to fetch projects.");
        } finally {
          setLoading(false);
        }
      }
  
      fetchProjects();
    }, []);
  
    return { projects, loading, error };
  }
  