import { z } from 'zod';

type TEnvironmentKey = `APP_${string}` | `NEXT_PUBLIC_${string}`;

const privateEnvSchema = z.object({
  ENV: z.string(),
  STRAPI_ENDPOINT: z.string().url(),
  STRAPI_TOKEN: z.string(),
});

const publicEnvSchema = z.object({
  APP_BASEPATH: z.string(),
  APP_VERSION: z.string(),
  ENVIRONMENT_NAME: z.string(),
  ROOT_DOMAIN: z.string(),
});

type IPrivateEnv = z.infer<typeof privateEnvSchema>;
type IPublicEnv = z.infer<typeof publicEnvSchema>;

class AppEnvironment {
  private environment = process.env;

  get isDevelopment(): boolean {
    return this.environment.APP_ENV === 'development';
  }

  get isProduction(): boolean {
    return this.environment.APP_ENV === 'production';
  }

  private get<T>(key: TEnvironmentKey): T {
    const value = this.environment[key];
    if (!value) {
      throw new Error(`Environment variable ${key} is missing`);
    }
    return value as unknown as T;
  }

  get private() {
    const privateEnv: IPrivateEnv = {
      ENV: this.get('APP_ENV'),
      STRAPI_ENDPOINT: this.get('APP_STRAPI_ENDPOINT'),
      STRAPI_TOKEN: this.get('APP_STRAPI_TOKEN'),
    };
    return privateEnvSchema.parse(privateEnv);
  }

  get public() {
    const publicEnv: IPublicEnv = {
      APP_BASEPATH: String(this.environment.NEXT_PUBLIC_APP_BASEPATH),
      APP_VERSION: String(this.environment.NEXT_PUBLIC_VERSION),
      ENVIRONMENT_NAME: String(this.environment.NEXT_PUBLIC_ENVIRONMENT_NAME),
      ROOT_DOMAIN: String(this.environment.NEXT_PUBLIC_ROOT_DOMAIN),
    };
    return publicEnvSchema.parse(publicEnv);
  }
}

export { AppEnvironment };
export const appEnv = new AppEnvironment();
