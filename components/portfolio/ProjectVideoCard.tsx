import { type Project } from "@/lib/data/projects";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProjectVideoCardProps {
  project: Project;
  className?: string;
}

export default function ProjectVideoCard({ project, className = "" }: ProjectVideoCardProps) {
  const url = project.video_url?.trim();
  if (!url) return null;

  const embedUrl = getEmbedUrl(url);

  if (isInstagramUrl(url)) {
    return (
      <motion.div variants={fadeIn} className={className}>
        <div className="space-y-3">
          <h2 className="font-medium text-lg tracking-tight">Watch</h2>
          <div className="max-w-md mx-auto rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800">
            <iframe
              src={embedUrl}
              title={project.title}
              className="w-full border-0"
              height="520"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeIn} className={className}>
      <div className="space-y-3">
        <h2 className="font-medium text-lg tracking-tight">Watch</h2>
        <AspectRatio
          ratio={16 / 9}
          className="bg-muted rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800"
        >
          <iframe
            src={embedUrl}
            title={project.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </AspectRatio>
      </div>
    </motion.div>
  );
}

function isInstagramUrl(url: string): boolean {
  return /instagram\.com\/(reel|reels|p)\//.test(url);
}

function getEmbedUrl(url: string): string {
  if (isInstagramUrl(url)) {
    const match = url.match(/instagram\.com\/(?:reel|reels|p)\/([^/?]+)/);
    if (match) return `https://www.instagram.com/reel/${match[1]}/embed/`;
    return url;
  }

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = extractYouTubeId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  if (url.includes("vimeo.com")) {
    const vimeoId = url.split("vimeo.com/")[1]?.split("?")[0];
    return vimeoId ? `https://player.vimeo.com/video/${vimeoId}` : url;
  }

  return url;
}

function extractYouTubeId(url: string): string | null {
  if (url.includes("youtube.com/watch")) {
    try {
      return new URL(url).searchParams.get("v");
    } catch {
      return null;
    }
  }
  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1]?.split(/[?#]/)[0] || null;
  }
  if (url.includes("youtube.com/shorts/")) {
    return url.split("/shorts/")[1]?.split(/[?#]/)[0] || null;
  }
  if (url.includes("youtube.com/embed/")) {
    return url.split("/embed/")[1]?.split(/[?#]/)[0] || null;
  }
  return null;
}
