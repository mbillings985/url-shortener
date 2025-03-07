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

## Getting Started

### Running the Server

```sh
npm start
```

- The server will start at: `http://localhost:3000`
- The API will run on `http://localhost:3000/api`

### Prerequisites

- Node.js (>= 14.x)
- npm (or yarn)

## Future Improvements

## Alternative Solutions
