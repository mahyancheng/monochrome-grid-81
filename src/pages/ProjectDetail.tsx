import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Project not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Title bar */}
        <div className="border-b border-border py-10 px-6">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-sm tracking-[0.4em] uppercase font-light text-foreground">
                {project.title}
              </h1>
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-2">
                {project.category}
              </p>
            </div>
            <Link
              to="/"
              className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              ← All Projects
            </Link>
          </div>
        </div>

        {/* Project info */}
        {(project.description || project.client) && (
          <div className="border-b border-border py-10 px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
              {project.description && (
                <p className="text-xs leading-6 text-muted-foreground font-light">
                  {project.description}
                </p>
              )}
              <div className="space-y-3">
                {project.client && (
                  <div className="flex gap-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-foreground w-24 shrink-0">Client</span>
                    <span className="text-[10px] tracking-[0.15em] text-muted-foreground">{project.client}</span>
                  </div>
                )}
                {project.location && (
                  <div className="flex gap-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-foreground w-24 shrink-0">Location</span>
                    <span className="text-[10px] tracking-[0.15em] text-muted-foreground">{project.location}</span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex gap-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-foreground w-24 shrink-0">Duration</span>
                    <span className="text-[10px] tracking-[0.15em] text-muted-foreground">{project.duration}</span>
                  </div>
                )}
                {project.leadArchitect && (
                  <div className="flex gap-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-foreground w-24 shrink-0">Architect</span>
                    <span className="text-[10px] tracking-[0.15em] text-muted-foreground">{project.leadArchitect}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Image grid — tight Instagram-style squares */}
        <div className="grid grid-cols-3 w-full">
          {project.images.map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden">
              <img
                src={img}
                alt={`${project.title} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
