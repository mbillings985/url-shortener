import NodeCache from "node-cache";
import Sqids from "sqids";

class UrlService {
  private cache: NodeCache;
  private sqids: Sqids;

  constructor() {
    this.cache = new NodeCache();
    this.sqids = new Sqids({
      minLength: 6,
    });

    if (!this.cache.has("counter")) {
      this.cache.set("counter", 0);
    }
  }

  public generateShortUrl(): string {
    let counter = this.cache.get<number>("counter")!;
    counter += 1;
    this.cache.set("counter", counter);
    return this.sqids.encode([counter]);
  }
}

export default new UrlService();
