import BaseAnimation from '@/components/animations/BaseAnimation';
import { LinkPreview } from '@/components/animations/LinkPreview';
import Typography from '@/components/common/Typography';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from '@/components/ui/timeline';

import type { ExperienceItem } from './WorkExperienceComponent';

interface Props {
  title: string;
  items: ExperienceItem[];
}

export default function WorkExperienceComponentItem({ items, title }: Props) {
  return (
    <div className="flex flex-col gap-y-4 sm:gap-y-6">
      <Typography text={title} className="uppercase" />
      <Timeline className="mt-6 px-0 lg:mt-8 lg:pl-20">
        {items?.map((item, index) => (
          <BaseAnimation key={item.time + index}>
            <TimelineItem>
              <TimelineConnector />
              <TimelineHeader>
                <TimelineTime className="hidden w-24 break-words pl-4 lg:block lg:pl-4">
                  {item.time}
                </TimelineTime>
                <TimelineIcon />
                <TimelineTitle>
                  <div className="flex flex-col gap-2 md:gap-4">
                    <p className="flex items-center gap-x-2 text-base md:text-lg">
                      <LinkPreview
                        url={item.previewLink}
                        className="text-primary h-fit"
                      >
                        <span className="text-primary">{item.title}</span>
                      </LinkPreview>
                      <span> | </span>
                      <span className="text-xs text-secondary md:text-sm">
                        {item.subTitle}
                      </span>
                    </p>

                    <span className="whitespace-normal text-nowrap text-xs font-semibold leading-none text-secondary md:text-sm lg:hidden">
                      {item.time}
                    </span>
                  </div>
                </TimelineTitle>
              </TimelineHeader>
              <TimelineContent>
                <TimelineDescription className="text-sm md:text-base flex flex-col gap-2">
                  {item.description.split('\n').map((desc, idx) => (
                    <span key={idx}>{desc}</span>
                  ))}
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          </BaseAnimation>
        ))}
      </Timeline>
    </div>
  );
}
