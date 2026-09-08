type NavProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
};

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  rating?: number;
}
