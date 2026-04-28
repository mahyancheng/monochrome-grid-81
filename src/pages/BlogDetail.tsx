import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/lib/supabase";
import { BlogPost } from "@/types/blog";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      // 先用 slug 查
      let { data, error } = await supabase
        .from("HidiLauTable")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      // slug 找不到，再用 id 查
      if (!data) {
        const result = await supabase
          .from("HidiLauTable")
          .select("*")
          .eq("id", slug)
          .maybeSingle();
        data = result.data;
      }

      if (data) setPost(data);
      setLoading(false);
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="space-y-2 w-full max-w-2xl px-6">
            <div className="animate-pulse h-3 bg-muted w-1/4 mb-6" />
            <div className="animate-pulse h-6 bg-muted w-3/4 mb-4" />
            <div className="animate-pulse aspect-[16/9] bg-muted mb-8" />
            <div className="animate-pulse h-3 bg-muted w-full mb-2" />
            <div className="animate-pulse h-3 bg-muted w-full mb-2" />
            <div className="animate-pulse h-3 bg-muted w-2/3" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Article not found
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={`${post.title} | HIDI Lau Architect`}
        description={post.excerpt || `${post.title} — HIDI Lau Architect Journal`}
        path={`/blog/${post.slug || post.id}`}
        image={post.image}
        type="article"
      />
      <Header />
      <main className="flex-1">
        {/* Title bar */}
        <div className="border-b border-border py-10 px-6">
          <div className="max-w-3xl mx-auto flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                {post.tags && (
                  <span className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground border border-border px-2 py-1">
                    {post.tags.split(",")[0].trim()}
                  </span>
                )}
                {post.publishedAt && (
                  <span className="text-[9px] tracking-[0.2em] text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
              <h1 className="text-xl md:text-2xl tracking-[0.12em] uppercase font-light text-foreground leading-relaxed">
                {post.title}
              </h1>
              {post.author && (
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground mt-3 uppercase">
                  By {post.author}
                </p>
              )}
            </div>
            <Link to="/blog" className="group flex items-center gap-2 shrink-0">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                All Articles
              </span>
              <div className="w-6 h-6 border border-border flex items-center justify-center transition-colors duration-300 group-hover:border-foreground">
                <ArrowUpRight
                  size={10}
                  className="text-muted-foreground group-hover:text-foreground transition-colors rotate-180"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Cover image */}
        {post.image && (
          <div className="w-full aspect-[16/7] overflow-hidden">
            <img
              src={post.image}
              alt={post.title || ""}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          {post.excerpt && (
            <p className="text-sm leading-8 text-muted-foreground font-light border-l-2 border-foreground pl-6 mb-10 italic">
              {post.excerpt}
            </p>
          )}
          {post.content && (
            <div
              className="prose prose-sm max-w-none
                prose-headings:font-light prose-headings:tracking-[0.15em] prose-headings:uppercase prose-headings:text-foreground
                prose-h2:text-base prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-sm prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-8 prose-p:font-light prose-p:text-xs
                prose-strong:text-foreground prose-strong:font-medium
                prose-ul:text-muted-foreground prose-ul:text-xs prose-ul:leading-8
                prose-ol:text-muted-foreground prose-ol:text-xs prose-ol:leading-8
                prose-li:marker:text-muted-foreground
                prose-img:w-full prose-img:my-8
                prose-a:text-foreground prose-a:underline-offset-4
                prose-blockquote:border-l-foreground prose-blockquote:text-muted-foreground prose-blockquote:font-light prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}
        </div>

        {/* Back to blog */}
        <div className="border-t border-border px-6 py-10">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-3"
            >
              <div className="w-8 h-px bg-muted-foreground group-hover:w-12 transition-all duration-300" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                Back to Journal
              </span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;