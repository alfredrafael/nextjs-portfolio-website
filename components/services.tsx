import { Section, Container, Prose } from "@/components/craft";
import PDFIcon from "@/components/icons/pdfIcon";
import UXIcon from "@/components/icons/uxIcon";
import SEOIcon from "./icons/seoIcon";
import FastTruckIcon from "./icons/fastTruckIcon";

// make div component to use for each service with icon, title, and description
function Service({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ReactElement<{ size: number }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex px-2 md:px-8 py-6 gap-4 items-start">
      <div>{Icon}</div>
      <div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    // <Section className="bg-accent/50">
    <Section className="bg-linear-to-b from-transparent via-accent/50 to-accent/50 mb-3">
      <div className="xl:flex px-6 lg:px-36">
        <div className="flex-1">
          <Service
            icon={<UXIcon />}
            title="User Experience Design"
            description="Develop a modern, professional looking website that converts visitors into customers."
          />
        </div>
        <div className="flex-1 md:border-r md:border-l">
          <Service
            icon={<SEOIcon />}
            title="SEO Performant Sites"
            description="Implement Search Engine Optimization (SEO) so that your site ranks well and users can find you, without ongoing fees."
          />
        </div>
        <div className="flex-1">
          <Service
            icon={<FastTruckIcon />}
            title="Speed Optimization"
            description="Ensure your site loads quickly and efficiently, providing users with a seamless, professional experience."
          />
        </div>
      </div>
    </Section>
  );
}

{
  /* <Section className="px-6 lg:px-28 2xl:px-48 xl:px-36">
      <Prose>
        <h1 className="text-center">Our Services</h1>
      </Prose>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts"
        >
          <Pen size={32} />
          <span>
            Posts{" "}
            <span className="block text-sm text-muted-foreground">
              All posts from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/pages"
        >
          <File size={32} />
          <span>
            Pages{" "}
            <span className="block text-sm text-muted-foreground">
              Custom pages from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/authors"
        >
          <User size={32} />
          <span>
            Authors{" "}
            <span className="block text-sm text-muted-foreground">
              List of the authors from your WordPress
            </span>
          </span>
        </Link>
      </div>
    </Section > 
    */
}
