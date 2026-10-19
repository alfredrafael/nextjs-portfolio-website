// Common types that are reused across multiple entities
interface WPEntity {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: "publish" | "future" | "draft" | "pending" | "private";
  link: string;
  guid: {
    rendered: string;
  };
}

interface RenderedContent {
  rendered: string;
  protected: boolean;
}

interface RenderedTitle {
  rendered: string;
}

// Media types
interface MediaSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

interface MediaDetails {
  width: number;
  height: number;
  file: string;
  sizes: Record<string, MediaSize>;
}

export interface FeaturedMedia extends WPEntity {
  title: RenderedTitle;
  author: number;
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: MediaDetails;
  source_url: string;
}

// Content types
export interface Post extends WPEntity {
  title: RenderedTitle;
  content: RenderedContent;
  excerpt: RenderedContent;
  author: number;
  featured_media: number;
  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  sticky: boolean;
  template: string;
  format:
    | "standard"
    | "aside"
    | "chat"
    | "gallery"
    | "link"
    | "image"
    | "quote"
    | "status"
    | "video"
    | "audio";
  categories: number[];
  tags: number[];
  meta: Record<string, unknown>;
  _embedded?: PostEmbedded;
}

export interface Page extends WPEntity {
  title: RenderedTitle;
  content: RenderedContent;
  excerpt: RenderedContent;
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  template: string;
  meta: Record<string, unknown>;
}

// Taxonomy types
interface Taxonomy {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  meta: Record<string, unknown>;
}

export interface Category extends Taxonomy {
  taxonomy: "category";
  parent: number;
}

export interface Tag extends Taxonomy {
  taxonomy: "post_tag";
}

export interface Author {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: Record<string, string>;
  meta: Record<string, unknown>;
}

// Embedded types (returned when _embed=true)
interface EmbeddedAuthor {
  id: number;
  name: string;
  slug: string;
  avatar_urls: Record<string, string>;
}

interface EmbeddedTerm {
  id: number;
  name: string;
  slug: string;
}

export interface PostEmbedded {
  author?: EmbeddedAuthor[];
  "wp:featuredmedia"?: FeaturedMedia[];
  "wp:term"?: EmbeddedTerm[][];
}

// Block types
interface BlockSupports {
  align?: boolean | string[];
  anchor?: boolean;
  className?: boolean;
  color?: {
    background?: boolean;
    gradients?: boolean;
    text?: boolean;
  };
  spacing?: {
    margin?: boolean;
    padding?: boolean;
  };
  typography?: {
    fontSize?: boolean;
    lineHeight?: boolean;
  };
  [key: string]: unknown;
}

interface BlockStyle {
  name: string;
  label: string;
  isDefault: boolean;
}

export interface BlockType {
  api_version: number;
  title: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  keywords: string[];
  parent: string[];
  supports: BlockSupports;
  styles: BlockStyle[];
  textdomain: string;
  example: Record<string, unknown>;
  attributes: Record<string, unknown>;
  provides_context: Record<string, string>;
  uses_context: string[];
  editor_script: string;
  script: string;
  editor_style: string;
  style: string;
}

export interface EditorBlock {
  id: string;
  name: string;
  attributes: Record<string, unknown>;
  innerBlocks: EditorBlock[];
  innerHTML: string;
  innerContent: string[];
}

export interface TemplatePart {
  id: string;
  slug: string;
  theme: string;
  type: string;
  source: string;
  origin: string;
  content: string | EditorBlock[];
  title: {
    raw: string;
    rendered: string;
  };
  description: string;
  status: "publish" | "future" | "draft" | "pending" | "private";
  wp_id: number;
  has_theme_file: boolean;
  author: number;
  area: string;
}

export interface SearchResult {
  id: number;
  title: string;
  url: string;
  type: string;
  subtype: string;
  _links: {
    self: Array<{
      embeddable: boolean;
      href: string;
    }>;
    about: Array<{
      href: string;
    }>;
  };
}

// Component Props Types
export interface FilterBarProps {
  authors?: Author[];
  tags: Tag[];
  categories: Category[];
  selectedAuthor?: Author["id"];
  selectedTag?: Tag["id"];
  selectedCategory?: Category["id"];
  onAuthorChange?: (authorId: Author["id"] | undefined) => void;
  onTagChange?: (tagId: Tag["id"] | undefined) => void;
  onCategoryChange?: (categoryId: Category["id"] | undefined) => void;
}
export interface PersonalMessage {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected?: boolean;
  };
  password_protected: boolean;
  featured_media?: number;
}

/**
 * Job Track - Application Status
 */

export type JobTrackStatus =
  | "wishlist"
  | "preparing"
  | "applied"
  | "recruiter"
  | "interview"
  | "assessment"
  | "offer"
  | "accepted"
  | "rejected"
  | "withdrawn"
  | "no_response";

export interface JobTrackStatusHistory {
  status: JobTrackStatus;
  date: string;
}

export type JobTrackFields = {
  company: string;
  job_url: string;
  location: string;
  work_type: string;
  employment_type: string;
  salary: string;
  source: string;
  status: JobTrackStatus;
  date_applied: string;
  last_activity: string;
  follow_up: string;
  contact_name: string;
  contact_role: string;
  contact_email: string;
  contact_link: string;
  contact_method: string;
  resume_version: string;
  notes: string;
  activity_log: string;
  opportunity_level: "" | "normal" | "high" | "low" | "unknown";
};

export type JobTrackApplication = {
  id: number;
  title: string;
  updated: string;
  fields: JobTrackFields;
  status_history: JobTrackStatusHistory[];
};

export const jobTrackStatuses: Record<string, string> = {
  wishlist: "Interested / Saved",
  preparing: "Preparing application",
  applied: "Applied",
  recruiter: "Recruiter screen",
  interview: "Interviewing",
  assessment: "Assessment",
  offer: "Offer received",
  accepted: "Accepted",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
  no_response: "No response / Closed",
};

export const jobTrackFields: Array<[keyof JobTrackFields, string]> = [
  ["company", "Company"],
  ["job_url", "Job posting URL"],
  ["location", "Location / remote"],
  ["work_type", "Work arrangement"],
  ["employment_type", "Employment type"],
  ["salary", "Salary / compensation"],
  ["source", "Where you found it"],
  ["status", "Application status"],
  ["date_applied", "Date applied"],
  ["last_activity", "Last contact / activity"],
  ["follow_up", "Next follow-up"],
  ["contact_name", "Contact / recruiter name"],
  ["contact_email", "Contact email"],
  ["contact_link", "Contact LinkedIn/profile URL"],
  ["contact_method", "Outreach method"],
  ["resume_version", "Resume / cover letter version"],
  ["priority", "Priority"],
  ["notes", "Notes"],
  ["activity_log", "Outreach / interview activity log"],
];
