# Alfredo Rafael - Portfolio Website

A modern portfolio website built with Next.js 16, React 19, and TypeScript, featuring a headless WordPress CMS integration.

## Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)
- [WordPress Revalidation Plugin](#wordpress-revalidation-plugin)
- [Deployment](#deployment)
- [License](#license)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/alfredrafael/nextjs-portfolio-website.git
cd nextjs-portfolio-website

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your WordPress URL and credentials

# Start development server
pnpm dev
```

Your site will be running at `http://localhost:3000`.

## Features

- **Modern Portfolio Design** - Clean, professional layout with hero video and parallax effects
- **Headless WordPress CMS** - Dynamic content management with WordPress REST API
- **Resume Section** - Comprehensive resume with experience, education, and skills
- **Blog Integration** - WordPress-powered blog with categories, tags, and search
- **Contact Form** - Built-in contact form for inquiries
- **Dark Mode** - System-aware theme switching with manual toggle
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type-safe** - Full TypeScript support throughout
- **SEO Optimized** - Dynamic metadata, sitemap, and OG image generation
- **Parallax Effects** - Smooth scroll animations on headers and ribbons
- **shadcn/ui Components** - Beautiful, accessible UI components

## Project Structure

```
nextjs-portfolio-website/
├── app/                      # Next.js App Router
│   ├── api/
│   │   ├── og/              # OG image generation
│   │   └── revalidate/      # Cache revalidation webhook
│   ├── data/                # Static data (navigation, projects, resume)
│   ├── pages/[slug]/        # Dynamic WordPress pages
│   ├── personal-messages/   # Personal messages section ([slug] detail pages)
│   ├── posts/               # Blog section with WordPress integration
│   │   ├── [slug]/          # Individual blog posts
│   │   ├── authors/         # Author archives
│   │   ├── categories/      # Category archives
│   │   └── tags/            # Tag archives
│   ├── resume/              # Resume components and page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles
│   └── sitemap.ts           # Dynamic sitemap
├── components/
│   ├── about.tsx            # About section
│   ├── contactForm.tsx      # Contact form
│   ├── heroVideo.tsx        # Hero section with video/image
│   ├── ribbon.tsx           # Call-to-action ribbon
│   ├── services.tsx         # Services showcase
│   ├── icons/               # Custom SVG icons
│   ├── layout/              # Layout components (nav, footer)
│   ├── posts/               # Blog-related components
│   ├── theme/               # Theme provider and toggle
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── wordpress.ts         # WordPress API functions
│   ├── wordpress.d.ts       # TypeScript definitions
│   ├── metadata.ts          # Metadata utilities
│   └── utils.ts             # Utility functions
├── plugin/                  # WordPress revalidation plugin (installable zip + source)
├── wordpress/               # Dockerized WordPress setup (theme, Dockerfile, entrypoint)
├── public/                  # Static assets
├── site.config.ts           # Site configuration
├── Dockerfile               # Next.js production image
├── railway.json              # Railway deployment config
├── railway.toml              # Railway deployment config
└── next.config.ts           # Next.js configuration
```

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
WORDPRESS_URL="https://your-wordpress-site.com"    # Full WordPress URL
WORDPRESS_HOSTNAME="your-wordpress-site.com"       # Domain for image optimization
WORDPRESS_WEBHOOK_SECRET="your-secret-key-here"    # Secret for cache revalidation
```

## Scripts

```bash
pnpm dev       # Start development server (localhost:3000)
pnpm build     # Build for production
pnpm start     # Start production server
pnpm lint      # Run ESLint
```

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **CMS:** [WordPress](https://wordpress.org/) (Headless)
- **Animations:** CSS transforms with parallax effects
- **Icons:** [Lucide React](https://lucide.dev/)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics)
- **Package Manager:** [pnpm](https://pnpm.io/)

## WordPress Revalidation Plugin

The [plugin/](plugin/) directory contains a WordPress plugin (`next-revalidate.zip`) that triggers on-demand cache revalidation on this site whenever content changes in WordPress:

1. Install the plugin in WordPress (upload the zip or extract to `/wp-content/plugins/`) and activate it
2. Configure your Next.js site URL and a webhook secret under Settings > Next.js Revalidation
3. Set the same secret as `WORDPRESS_WEBHOOK_SECRET` in this project's environment variables

See [plugin/README.md](plugin/README.md) for full setup details.

## Deployment

The app is containerized for deployment on platforms like Railway:

- `Dockerfile` builds a standalone Next.js production image (multi-stage, pnpm-based)
- `railway.json` / `railway.toml` configure the Railway build (Dockerfile-based) and deploy/restart policy
- The `wordpress/` directory contains a separate Dockerized WordPress setup (custom theme, entrypoint, and the revalidation plugin) for self-hosting the CMS alongside the site

## License

MIT License - see [LICENSE](LICENSE) for details.
