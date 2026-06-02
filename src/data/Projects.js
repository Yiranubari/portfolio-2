export const projects = [
  {
    slug: "insighta-backend",
    num: "01",
    name: "Insighta Labs+ Backend",
    oneLiner:
      "The secure core of a profile intelligence platform. One PHP/Slim API serving both a CLI and a web portal, with OAuth, role-based access, Redis caching, and streaming CSV ingestion.",
    stack: [
      "PHP 8.2",
      "Slim 4",
      "SQLite / WAL",
      "Redis",
      "JWT",
      "Docker",
      "Railway",
    ],
    featured: true,
    links: [
      {
        label: "Repo",
        url: "https://github.com/Yiranubari/profile-intelligence",
      },
      {
        label: "Live API",
        url: "https://profile-intelligence-production.up.railway.app",
      },
    ],
    built: [
      "Dual OAuth flows from one set of endpoints: PKCE for the CLI, HTTP-only cookies for the web portal.",
      "Rotating refresh tokens stored only as SHA-256 hashes, with single-use enforcement to detect theft.",
      "Role-based access enforced as middleware at the gate, not scattered through controllers.",
      "Redis cache with query normalization, so two queries that mean the same thing share one entry.",
      "Streaming CSV ingestion up to 500,000 rows in chunks, without blocking live read traffic.",
      "Fixed-window rate limiting, structured logging, and a single central error shape.",
    ],
    problem:
      "Insighta Labs+ needed one backend to securely serve two very different clients, a terminal tool and a browser app, sharing the exact same data and endpoints while authenticating in the way each client can actually keep safe.",
    flow: [
      { t: "CLI", s: "Bearer + PKCE" },
      { t: "Web", s: "cookie session" },
      { t: "API", s: "Slim 4" },
      { t: "Cache", s: "Redis" },
      { t: "DB", s: "SQLite / WAL" },
    ],
    endpoints: [
      {
        verb: "GET",
        path: "/auth/github",
        note: "starts web or CLI OAuth via client_type",
      },
      {
        verb: "POST",
        path: "/auth/cli/exchange",
        note: "PKCE code + verifier for tokens",
      },
      {
        verb: "POST",
        path: "/auth/refresh",
        note: "rotates access + refresh tokens",
      },
      {
        verb: "GET",
        path: "/api/profiles",
        note: "filter, sort, paginate (cached)",
      },
      {
        verb: "GET",
        path: "/api/profiles/search",
        note: "rule-based natural language query",
      },
      {
        verb: "POST",
        path: "/api/profiles/upload",
        note: "streaming CSV ingest, admin only",
      },
    ],
    challenge:
      "Serving two clients meant two auth styles. I put both behind one set of endpoints, switched by a client_type parameter: PKCE protects the CLI auth code where no client secret can be kept, while the web portal uses HTTP-only cookies with double-submit CSRF. Refresh tokens rotate on every use and are stored hashed, so a stolen token is single-use and a leaked database holds no usable tokens.",
  },

  {
    slug: "insighta-cli",
    num: "02",
    name: "Insighta CLI",
    oneLiner:
      "A terminal client for the Insighta platform. Sign in with GitHub from your shell, then list, filter, search, create, and export profiles.",
    stack: ["Node.js", "TypeScript", "Commander", "OAuth PKCE"],
    featured: false,
    links: [
      { label: "Repo", url: "https://github.com/Yiranubari/insighta-cli" },
      {
        label: "npm",
        url: "https://www.npmjs.com/package/@yiranubari/insighta-cli",
      },
    ],
    built: [
      "The full OAuth 2.0 PKCE loopback flow: a temporary localhost server captures the browser callback and exchanges the code for tokens.",
      "An HTTP wrapper that auto-refreshes the access token before expiry and retries once on a 401.",
      "A typed error hierarchy mapped to clean, single-line terminal messages.",
      "Commands for list, get, search, create, and CSV export, with credentials stored at 0600 permissions.",
    ],
    problem:
      "A CLI cannot safely hold a client secret, so it needed an OAuth flow that proves possession of the original request without one, while keeping tokens fresh across short 3-minute access windows.",
    challenge:
      "I implemented the PKCE loopback flow from RFC 8252: the CLI generates a code verifier, derives a challenge, spins up a temporary loopback server for the callback, and checks state to prevent CSRF. Tokens auto-refresh before each request, and if refresh fails the credentials file is cleared so the next command shows a clear 'please log in again' instead of looping.",
  },

  {
    slug: "insighta-web",
    num: "03",
    name: "Insighta Web Portal",
    oneLiner:
      "The browser interface for the Insighta platform. GitHub sign-in, then browse, filter, and search profiles through six clean pages.",
    stack: ["React", "Vite", "Tailwind", "Vercel"],
    featured: false,
    links: [
      { label: "Repo", url: "https://github.com/Yiranubari/insighta-web" },
      { label: "Live", url: "https://insighta-web-seven.vercel.app" },
    ],
    built: [
      "Cookie-based auth with an AuthContext that refreshes once on a 401 before sending the user to login.",
      "Double-submit CSRF: reads the csrf_token cookie and sends it as a header on every state-changing request.",
      "Filterable, paginated profile list with filter state reflected in the URL so links are shareable.",
      "A minimal black-on-white interface across six pages, deployed continuously to Vercel.",
    ],
    problem:
      "Non-technical users needed a simple way to browse and search the same profile data the CLI uses, with auth that is safe in a browser where JavaScript should never touch the access token.",
    challenge:
      "The access token lives in an HTTP-only cookie the browser sends automatically, so portal JavaScript can never read it. For write requests I added double-submit CSRF: a JS-readable csrf_token cookie echoed back as a header and compared server-side with a constant-time check. Cross-site cookies between Vercel and Railway needed Secure and SameSite=None to flow correctly.",
  },

  {
    slug: "event-store",
    num: "04",
    name: "Append-Only Event Store",
    oneLiner:
      "A key-value store on an append-only log with an in-memory byte index. Survives a crash by replaying the log on startup. No database.",
    stack: ["Node.js", "TypeScript", "Express", "Vitest"],
    featured: false,
    links: [
      { label: "Repo", url: "https://github.com/Yiranubari/event-store" },
      {
        label: "Demo video",
        url: "https://www.loom.com/share/c998e563c73d416abf524c174f3f4f3b",
      },
    ],
    built: [
      "The full service: append path, byte-offset reads, and crash recovery.",
      "An in-memory index that rebuilds itself from the log file on startup.",
      "Serialized writes so concurrent requests can't compute the same offset.",
      "A unicode-safe byte counter, plus tests covering recovery and non-ascii text.",
    ],
    problem:
      "Most databases survive crashes by writing to an append-only log first, then rebuilding state from it. I wanted the smallest honest version of that idea, and to prove it actually recovers after a hard kill.",
    flow: [
      { t: "Client", s: "curl / Bruno" },
      { t: "API", s: "Express" },
      { t: "Index", s: "Map id→offset" },
      { t: "Log", s: "events.log" },
    ],
    endpoints: [
      { verb: "POST", path: "/events", note: "append, index, return 201" },
      {
        verb: "GET",
        path: "/events/:id",
        note: "seek by byte offset, no scan",
      },
      { verb: "GET", path: "/stats", note: "total + bytes on disk" },
    ],
    challenge:
      "My first version tracked file offsets by string length. It passed every test until I stored accented and Japanese text, then reads came back broken because those characters take more than one byte on disk. I switched to counting bytes, not characters, and added a unicode test so it can never regress quietly again.",
  },

  {
    slug: "gender-classify-api",
    num: "05",
    name: "Gender Classify API",
    oneLiner:
      "A PHP/Slim REST API that predicts gender from a first name, wrapping Genderize.io with validation, a confidence rule, and structured JSON.",
    stack: ["PHP 8", "Slim 4", "PHP-DI", "Monolog", "PHPUnit"],
    featured: false,
    links: [
      {
        label: "Repo",
        url: "https://github.com/Yiranubari/gender-classify-api",
      },
    ],
    built: [
      "A clean wrapper around Genderize.io following SOLID, with services and controllers wired through PHP-DI.",
      "Strict input validation and a confidence rule: confident only when probability >= 0.70 and sample size >= 100.",
      "Consistent success and error JSON, PSR-7 throughout, with unit and integration tests.",
    ],
    problem:
      "Raw gender prediction from a third-party API is noisy and unvalidated. The goal was a dependable wrapper that validates input, applies a sensible confidence threshold, and always returns a predictable response shape.",
    endpoints: [
      {
        verb: "GET",
        path: "/api/classify",
        note: "?name= , returns prediction + confidence",
      },
    ],
    challenge:
      "A bare passthrough to Genderize.io returns low-signal guesses as if they were certain. I added a confidence rule that only marks a result confident when both probability and sample size clear a threshold, and wrapped everything in a single consistent JSON envelope so clients never have to handle surprise shapes.",
  },
];
