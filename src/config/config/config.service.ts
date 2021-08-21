import * as dotenv from 'dotenv';

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor() {
    const result = dotenv.config();
    result.error
      ? (this.envConfig = process.env)
      : (this.envConfig = result.parsed);
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  public async getPortConfig() {
    return this.get('PORT');
  }

  public async getKeyApiMovie() {
    return {
      'x-rapidapi-host': this.get('x-rapidapi-host'),
      'x-rapidapi-key': this.get('x-rapidapi-key'),
    };
  }

  public async getMongoConfig() {
    return {
      uri:
        'mongodb+srv://' +
        this.get('USER') +
        ':' +
        this.get('PASSWORD') +
        '@' +
        this.get('HOST') +
        '/' +
        this.get('DATABASE') +
        '?retryWrites=true&w=majority',
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
  }
}
