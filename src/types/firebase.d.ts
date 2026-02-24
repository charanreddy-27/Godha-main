/**
 * Firebase SDK module declarations.
 *
 * Firebase 10.12.0 exports map points to .d.ts files that aren't shipped
 * in this version. These ambient declarations satisfy the TypeScript
 * compiler while the runtime JS modules resolve correctly.
 */
declare module 'firebase/app' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export = content;
  export * from '@firebase/app';
}

declare module 'firebase/auth';
declare module 'firebase/firestore';
declare module 'firebase/storage';
