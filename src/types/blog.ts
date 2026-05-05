export interface BlogPost {
    id: string;
    createdAt: string;
    updatedAt?: string;
    author?: string;
    content?: string;
    excerpt?: string;
    image?: string;
    publishedAt?: string;
    tags?: string;
    title?: string;
    featured?: boolean;
    slug?: string;
  }
  
  export type BlogCategory = "All" | "设计知识" | "项目故事";