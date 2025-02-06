import ArrowHeader from './icon-bundles/arrow-header';
import Docs from './icon-bundles/docs';
import Facebook from './icon-bundles/facebook';
import Github from './icon-bundles/github';
import Linkedin from './icon-bundles/linkedin';
import Mui from './icon-bundles/mui';
import NextAuth from './icon-bundles/next-auth';
import NextJS from './icon-bundles/nextjs';
import Prisma from './icon-bundles/prisma';
import ReactHookForm from './icon-bundles/react-hook-form';
import ReactJS from './icon-bundles/react-js';
import ReactQuery from './icon-bundles/react-query';
import Redux from './icon-bundles/redux';
import Scss from './icon-bundles/scss';
import Tailwinds from './icon-bundles/tailwinds';
import Typescript from './icon-bundles/typescript';
import Vite from './icon-bundles/vite';

export const IconRegistry = {
  'arrow-header': ArrowHeader,
  'docs': Docs,
  'facebook': Facebook,
  'github': Github,
  'linkedin': Linkedin,
  'mui': Mui,
  'next-auth': NextAuth,
  'next-js': NextJS,
  'prisma': Prisma,
  'react-hook-form': ReactHookForm,
  'react-js': ReactJS,
  'react-query': ReactQuery,
  'redux': Redux,
  'scss': Scss,
  'tailwinds': Tailwinds,
  'typescript': Typescript,
  'vite': Vite,
} as const;

export type IconName = keyof typeof IconRegistry;
