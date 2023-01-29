declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type GetArrayItemType<T extends unknown[]> = T extends Array<infer S>
  ? S
  : never;

declare type TargetContext = "_self" | "_blank";

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  type Nullable<T> = T | null;
  type Recordable<T = any> = Record<string, T>;

  interface ViteEnv {
    VITE_PORT: number;
    VITE_USE_MOCK: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
    VITE_DROP_CONSOLE: boolean;
  }

  interface ChangeEvent extends Event {
    target: HTMLInputElement;
  }
}

export {};
