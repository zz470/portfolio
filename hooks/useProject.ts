import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Project } from "@/hooks/useProjects";

export function useProject(slug: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      console.log("Fetching project with slug:", slug);
      try {
        const { data, error } = await supabase
          .from("portfolio_projects")
          .select("*")
          .eq("slug", slug)
          .single();

        console.log("Supabase response:", { data, error });

        if (error) throw error;
        
        if (data) {
          data.id = typeof data.id === 'string' ? parseInt(data.id, 10) : data.id;
          data.design_version = data.design_version || 'primary';
          
          console.log("Processed project data:", data);
          console.log("Design version:", data.design_version);
          
          // If hero_url is not provided, default to thumbnail_url
          if (!data.hero_url && data.thumbnail_url) {
            data.hero_url = data.thumbnail_url;
          }
        }

        setProject(data as Project);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to fetch project.");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  return { project, loading, error };
}
