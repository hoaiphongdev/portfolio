import ArrowHeader from './icon-bundles/arrow-header';
import Facebook from './icon-bundles/facebook';
import Github from './icon-bundles/github';
import Linkedin from './icon-bundles/linkedin';

export const IconRegistry = {
  'arrow-header': ArrowHeader,
  'facebook': Facebook,
  'github': Github,
  'linkedin': Linkedin,
} as const;

export type IconName = keyof typeof IconRegistry;
