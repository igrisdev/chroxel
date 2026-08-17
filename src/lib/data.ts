export interface IProject {
  id: string;
  slug: string;
  category: string;
  title: string;
  img: string;
  zIndex?: string;
  client: string;
  url_web: string;
  year: string;
  stat: string;
  tech: string[];
}

export interface IProjectDetail extends IProject {
  longDescription: string;
  features: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  github_url?: string;
  logo_url?: string;
  framework_icon?: string;
  framework_url?: string;
  status?: string;
  end_date?: string;
}
