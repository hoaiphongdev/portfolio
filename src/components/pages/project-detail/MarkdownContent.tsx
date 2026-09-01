import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import cn from '@/lib/cn';
import { isMobileDevice } from '@/utils/device';

export function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ className, children, ...props }) => (
          <h1
            className={cn(
              'mt-8 mb-4 text-3xl font-bold tracking-tight text-foreground',
              className,
            )}
            {...props}
          >
            {children}
          </h1>
        ),
        h2: ({ className, children, ...props }) => (
          <h2
            className={cn(
              'mt-6 mb-3 text-2xl font-semibold tracking-tight text-foreground',
              className,
            )}
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ className, children, ...props }) => (
          <h3
            className={cn(
              'mt-4 mb-2 text-xl font-medium text-foreground',
              className,
            )}
            {...props}
          >
            {children}
          </h3>
        ),
        p: ({ className, ...props }) => (
          <p
            className={cn('mb-4 leading-7 text-muted-foreground', className)}
            {...props}
          />
        ),
        ul: ({ className, ...props }) => (
          <ul
            className={cn(
              'mb-4 ml-6 list-disc text-muted-foreground marker:text-primary',
              className,
            )}
            {...props}
          />
        ),
        ol: ({ className, ...props }) => (
          <ol
            className={cn(
              'mb-4 ml-6 list-decimal text-muted-foreground',
              className,
            )}
            {...props}
          />
        ),
        li: ({ className, ...props }) => (
          <li className={cn('mt-2', className)} {...props} />
        ),
        a: ({ className, children, ...props }) => (
          <a
            className={cn(
              'text-primary underline-offset-4 hover:underline',
              className,
            )}
            {...props}
          >
            {children}
          </a>
        ),
        code: ({ className, ...props }) => (
          <code
            className={cn(
              'rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground',
              className,
            )}
            {...props}
          />
        ),
        img: ({ className, alt, src }) => {
          const srcString = typeof src === 'string' ? src : '';
          const isMobileImage
            = isMobileDevice()
              || alt?.includes('Mobile')
              || className?.includes('mobile')
              || srcString.includes('mobile');

          const imageClasses = cn(
            'object-contain mx-auto',
            isMobileImage ? 'max-h-[489px] max-w-[275px]' : 'max-w-[600px]',
            className,
          );

          return (
            <div
              className={cn(
                'relative mx-auto my-4',
                isMobileImage ? 'w-auto max-w-[275px]' : 'w-full md:w-4/5',
              )}
            >
              <Image
                className={imageClasses}
                alt={alt ?? ''}
                src={srcString || ''}
                width={isMobileImage ? 275 : 1280}
                height={isMobileImage ? 489 : 720}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                sizes={
                  isMobileImage
                    ? '275px'
                    : '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 75vw'
                }
                priority={false}
              />
            </div>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
