# URL Shortener Server

This is a simple URL shortener HTTP server built using **TypeScript** and **Express**.
<br><br>
**It allows clients to:**

1. Send a URL to be shortened.
2. Send a short URL and be redirected to the original long URL.
3. Send a short URL and receive information such as the original long URL & click count

**Notes**

- Every unique long URL should ALWAYS be shortened to the same unique short URL
- Clicks are counted for every redirect to a short URL.

## Implementation 
Unique short URLs are generated using a global counter. This global counter variable is stored in cache and incremented for each short URL that is generated. The Sqids library is used to generate a short URL of atleast 6 characters long based on the unique number (counter variable). 

- Learn More about Sqids: https://www.npmjs.com/package/sqids?activeTab=dependents


## Getting Started
#### Building the Server
```sh
npm run build
```
### Running the Server
```sh
npm start
```
### Other Useful Commands
```sh
npm run lint
npm run test
npm run dev
```

#### Prerequisites
- Node.js (>= 14.x)
- npm (or yarn)

## API Documentation

### Create Short URL
- **Endpoint:** `POST /`
- **Description:** Creates a short URL for the provided long URL.
- **Request Body:**
  ```json
  {
    "url": "http://example.com"
  }
  ```
- **Response:**
  ```json
  {
    "url": "shortUrl"
  }
  ```

### Redirect to Long URL
- **Endpoint:** `GET /:shortUrl`
- **Description:** Redirects to the original long URL associated with the provided short URL.
- **Response:** Redirects to the long URL.

### Get URL Stats
- **Endpoint:** `GET /stats/:shortUrl`
- **Description:** Retrieves statistics for the provided short URL, including the original long URL and the number of clicks.
- **Response:**
  ```json
  {
    "longUrl": "http://example.com",
    "clicks": 5
  }
  ```

## Whats Next? 
- Dockerize & deploy the project to a cloud environment 
- Finish testing and CI/CD deployment
- Move to an external databse instead of using in memory Sqlite
- Move to an external cache (eg Redis) for storing the counter instead of using node-cache
- Add Swagger docs and swagger express UI
- Consider future features such as adding a default expiration or TTL for Urls? 


## Alternative Solutions
- Generating short Urls by using a random number generator or hash function: 
  - This approach could create possible hashing collisions where the same shortUrl is generated for two different long URLs 
  - We could make extra calls to the DB to check for possible hash collisions 
  - Chose to use a global counter that will be stored in cache instead to avoid extra DB calls
