export interface IProject {
  date: string;
  title: string;
  description: string;
  type: 'company' | 'oss' | 'personal';
  previewLink: string;
  imageSrc: string;
  tech: string[];
  tools?: string[];
}

export const PROJECTS_DATA: IProject[] = [
  {
    date: 'Feb 2024 - Present',
    title: 'Lumin Static Page',
    description:
      'Developed and optimized the static page for Lumin PDF, driving user traffic through SEO and performance enhancements. Collaborated with the marketing team to support campaigns and maximize user acquisition. Built functional PDF tools for seamless file interactions, ensuring a high-quality UX with multilingual support and server-side rendering.',
    type: 'company',
    previewLink: 'https://www.luminpdf.com/',
    imageSrc: '/images/projects/lumin-static.png',
    tech: [
      'React',
      'Gatsby',
      'Styled Components',
      'SCSS',
      'Prismic CMS',
      'Hubspot',
      'Chili piper',
      'GraphQL',
      'REST API',
      'AWS Pinpoint',
      'GA4',
      'Datadog',
      'Braze',
      'Multilingual',
      'Server Side Rendering',
      'PDF JS',
      'Growbook',
      'Feature Flags',
    ],
    tools: ['Bitbucket', 'Jira', 'Confluence', 'Slack', 'Notion', 'Sonarlint'],
  },
  {
    date: 'Feb 2024 - Present',
    title: 'Lumin Template Library',
    description:
      'Developed and optimized the Lumin Template Library to promote high-quality PDF templates for in-app users. Integrated Strapi CMS for efficient template management and built collection pages to drive organic traffic from key markets like the US and NZ. Focused on SEO, performance, and seamless mobile webview experiences to enhance user engagement.',
    type: 'company',
    previewLink: 'https://www.luminpdf.com/form-templates',
    imageSrc: '/images/projects/lumin-template-library.png',
    tech: [
      'Next.js',
      'SCSS',
      'Strapi CMS',
      'REST API',
      'Meilisearch',
      'GA4',
      'AWS Pinpoint',
      'Datadog',
      'Braze',
      'Server Side Rendering',
      'Mobile Webview',
      'Growbook',
      'Feature Flags',
    ],
    tools: [
      'Bitbucket',
      'Jira',
      'Confluence',
      'Slack',
      'Strapi Cloud',
      'Meilisearch Cloud',
      'Sonarlint',
    ],
  },
  {
    date: 'Jan 2025 - Present',
    title: 'Portfolio',
    description:
      'Designed and developed a modern personal portfolio website to showcase my professional journey and technical expertise. Built with Next.js and enhanced with Radix UI components for a polished user interface. Features a responsive design, smooth animations, and comprehensive project showcases while maintaining optimal performance through server-side rendering.',
    type: 'personal',
    previewLink: 'https://portfolio-5ft5.onrender.com',
    imageSrc: '/images/projects/hoaiphong-portfolio.png',
    tech: [
      'Next.js',
      'ReactJs',
      'Server Side Rendering',
      'Radix UI',
      'Tailwind CSS',
    ],
    tools: ['Render.com'],
  },
  {
    date: 'May 2022 - May 2022',
    title: 'Letcode Clone',
    description:
      'Built a feature-rich coding practice platform inspired by Letcode, offering interactive coding challenges and learning resources. Implemented a modern UI with syntax highlighting, live code execution, and real-time feedback. Created a comprehensive learning environment for developers to enhance their programming skills through hands-on practice and problem-solving exercises.',
    type: 'personal',
    previewLink: 'https://letcode-clone.vercel.app/',
    imageSrc: '/images/projects/letcode-clone.png',
    tech: ['Next.js', 'Tailwind CSS', 'Vercel', 'TypeScript', 'React'],
    tools: ['Github'],
  },
  {
    date: 'Oct 20, 2024 - Oct 20, 2024',
    title: '20/10/2024',
    description:
      'Created a heartfelt web application to celebrate Vietnamese Women\'s Day (20/10) for my girlfriend. This personal project features beautiful animations, interactive elements, and personalized messages to express love and appreciation. A modern and creative way to honor this special occasion with a blend of technology and sentiment.',
    type: 'personal',
    previewLink: 'https://20-10-2024.vercel.app/',
    imageSrc: '/images/projects/20-10-2024.png',
    tech: ['Next.js', 'Tailwind CSS', 'Vercel', 'TypeScript', 'React'],
    tools: ['Github'],
  },
];
