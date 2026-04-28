import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/lib/supabase";
import { BlogPost } from "@/types/blog";

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAll = async () => {
      const { data, error } = await supabase
        .from("HidiLauTable")
        .select("*")
        .order("publishedAt", { ascending: false });

      if (!error && data) {
        setPosts(data);

        const tagSet = new Set<string>();
        data.forEach((post: BlogPost) => {
          if (post.tags) {
            post.tags.split(",").forEach((t) => {
              const trimmed = t.trim();
              if (trimmed) tagSet.add(trimmed);
            });
          }
        });
        setAllTags(Array.from(tagSet));
      }
      setLoading(false);
    };

    fetchAll();
  }, []);

  // 切换 tag 时重置到第一页
  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setCurrentPage(1);
  };

  // 筛选文章
  const filteredPosts =
    activeTag === "All"
      ? posts
      : posts.filter((post) =>
          post.tags
            ?.split(",")
            .map((t) => t.trim())
            .includes(activeTag)
        );

  // 分页
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Journal | HIDI Lau Architect"
        description="Insights on architecture, interior design and the stories behind our projects. Written by HIDI Lau Architect, Johor Bahru."
        path="/blog"
      />
      <Header />
      <main className="flex-1">
        {/* Page title */}
        <div className="border-b border-border py-10 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px bg-foreground" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Journal
              </span>
            </div>
            <h1 className="text-xl md:text-2xl tracking-[0.15em] uppercase font-light text-foreground">
              Thoughts & Stories
            </h1>
          </div>
        </div>

        {/* Category filter */}
        {allTags.length > 0 && (
          <div className="border-b border-border px-6">
            <div className="max-w-5xl mx-auto flex gap-8">
              {["All", ...allTags].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  className={`py-4 text-[10px] tracking-[0.25em] uppercase transition-colors whitespace-nowrap border-b-[1.5px] -mb-px ${
                    activeTag === tag
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Posts grid */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[16/9] bg-muted mb-5" />
                  <div className="h-3 bg-muted w-1/4 mb-3" />
                  <div className="h-4 bg-muted w-3/4 mb-2" />
                  <div className="h-3 bg-muted w-full" />
                </div>
              ))}
            </div>
          ) : paginatedPosts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                No articles yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
              {paginatedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug || post.id}`}
                  className="group block"
                >
                  {/* Cover image */}
                  <div className="aspect-[16/9] overflow-hidden bg-muted mb-5">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title || ""}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                          HIDI Lau Architect
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-3">
                    {post.tags && (
                      <span className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground border border-border px-2 py-1">
                        {post.tags.split(",")[0].trim()}
                      </span>
                    )}
                    {post.publishedAt && (
                      <span className="text-[9px] tracking-[0.2em] text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-sm tracking-[0.1em] uppercase font-light text-foreground mb-3 group-hover:text-muted-foreground transition-colors leading-relaxed">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-xs leading-6 text-muted-foreground font-light line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Read more */}
                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-4 h-px bg-muted-foreground group-hover:w-8 transition-all duration-300" />
                    <span className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground">
                      Read More
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-6 mt-16 border-t border-border pt-10">
              {/* Prev */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={12} />
                Prev
              </button>

              {/* Page numbers */}
              <div className="flex items-center gap-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-7 h-7 flex items-center justify-center text-[10px] tracking-[0.2em] transition-colors border ${
                      currentPage === page
                        ? "border-foreground text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={12} />
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;