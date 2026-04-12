import { type Project } from "@/lib/data/projects";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import ProjectDetailsCard from "./ProjectDetailsCard";
import ProjectAboutCard from "./ProjectAboutCard";
import ProjectVideoCard from "./ProjectVideoCard";
import ProjectNavigation from "./ProjectNavigation";

type Variant = "primary" | "secondary" | "tertiary";

interface PortfolioDetailProps {
  project: Project;
  allProjects?: Project[];
  variant?: Variant;
}

export default function PortfolioDetail({
  project,
  allProjects = [],
  variant = "primary",
}: PortfolioDetailProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden">
      <motion.div
        initial="initial"
        animate="animate"
        className="max-w-screen-xl mx-auto p-4 sm:p-5 md:p-6"
      >
        <div className="space-y-6">
          {variant === "primary" && <PrimaryLayout project={project} />}
          {variant === "secondary" && <SecondaryLayout project={project} />}
          {variant === "tertiary" && <TertiaryLayout project={project} />}

          {allProjects.length > 1 && (
            <>
              <Separator className="my-4" />
              <ProjectNavigation currentProject={project} allProjects={allProjects} />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function PrimaryLayout({ project }: { project: Project }) {
  const releaseYear = project.release_date || null;

  return (
    <>
      <div className="lg:grid lg:grid-cols-5 lg:gap-8 space-y-6 lg:space-y-0">
        <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                {project.title}
              </h1>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-3">
                <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  {project.category}
                </Badge>
                {releaseYear && (
                  <>
                    <span>•</span>
                    <span>{releaseYear}</span>
                  </>
                )}
              </div>
            </div>

            <motion.div variants={fadeIn} className="block lg:hidden">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <AspectRatio ratio={2 / 3}>
                  <Image
                    src={project.hero_url || project.thumbnail_url}
                    alt={`${project.title} — ${project.roles[0]} by Lorenzo Pardell`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                </AspectRatio>
              </div>
            </motion.div>

            <ProjectDetailsCard project={project} />
          </div>

          <ProjectAboutCard project={project} />
        </div>

        <motion.div variants={fadeIn} className="hidden lg:block lg:col-span-2 h-full">
          <div className="rounded-xl overflow-hidden shadow-lg w-full h-full flex">
            <div className="w-full relative">
              <Image
                src={project.hero_url || project.thumbnail_url}
                alt={`${project.title} — audio production by Lorenzo Pardell`}
                fill
                sizes="(max-width: 1024px) 0px, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      <Separator className="my-4" />

      <ProjectVideoCard project={project} className="w-full" />
    </>
  );
}

function SecondaryLayout({ project }: { project: Project }) {
  return (
    <>
      <motion.div
        variants={fadeIn}
        className="relative w-full h-[38vh] sm:h-[42vh] md:h-[50vh] rounded-xl overflow-hidden shadow-xl"
      >
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800">
          <Image
            src={project.hero_url || project.thumbnail_url}
            alt={`${project.title} — ${project.roles[0]} by Lorenzo Pardell`}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 p-5 md:p-6 w-full">
          <div className="space-y-2">
            <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white mb-1">
              {project.category}
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white line-clamp-2">
              {project.title}
            </h1>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
        <ProjectDetailsCard project={project} className="lg:col-span-1" />
        <ProjectAboutCard project={project} className="lg:col-span-2" />
      </div>

      <ProjectVideoCard project={project} className="w-full" />
    </>
  );
}

function TertiaryLayout({ project }: { project: Project }) {
  const releaseYear = project.release_date || null;

  return (
    <>
      <div className="text-center mb-4">
        <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white mb-2">
          {project.category}
        </Badge>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
          {project.title}
        </h1>
        {releaseYear && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{releaseYear}</div>
        )}
      </div>

      <motion.div variants={fadeIn} className="w-full">
        <ProjectVideoCard project={project} />
      </motion.div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProjectDetailsCard project={project} className="lg:col-span-1" />
        <ProjectAboutCard project={project} className="lg:col-span-2" />
      </div>
    </>
  );
}
