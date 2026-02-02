
# ---------------------------------------------------------
# EXPRESS APPLICATION
# ---------------------------------------------------------
# An Express app represents the HTTP server.
# It listens for incoming requests and sends responses.
# All middleware and routes are attached to this app.

# ---------------------------------------------------------
# JSON PARSING
# ---------------------------------------------------------
# JSON parsing middleware converts incoming JSON request bodies
# into JavaScript objects.
# After parsing, the data is available in req.body.
# Without JSON parsing, req.body will be undefined.

# JSON parsing is required for:
# - POST requests
# - PUT requests
# - PATCH requests
# where the client sends data in JSON format.

# ---------------------------------------------------------
# MIDDLEWARE CONCEPT
# ---------------------------------------------------------
# Middleware is a function that runs between the request and response.
# It can read, modify, or block requests.
# Middleware executes in the order it is registered.

# Middleware is used for:
# - Parsing JSON
# - Reading cookies
# - Authentication
# - Logging
# - Error handling

# ---------------------------------------------------------
# COOKIE PARSER
# ---------------------------------------------------------
# Cookie parser middleware reads cookies sent by the browser.
# It parses the Cookie header and converts it into an object.
# Parsed cookies are available in req.cookies.

# Cookies are commonly used for:
# - JWT tokens
# - Session identifiers
# - User preferences

# Without cookie parsing:
# - Authentication using cookies will not work.

# ---------------------------------------------------------
# MONGODB CONNECTION STRING
# ---------------------------------------------------------
# The MongoDB connection string tells the application:
# - Which database system to use
# - Where the database server is running
# - Which port to connect to
# - Which database to use

# Local MongoDB setup:
# - Runs on the local machine
# - Uses default MongoDB port
# - Automatically creates the database when data is inserted

# ---------------------------------------------------------
# DATABASE CONNECTION
# ---------------------------------------------------------
# The application connects to MongoDB before starting the server.
# If the database connection fails, the server should not start.
# This ensures data operations are reliable.
# ---------------------------------------------------------
# ROLE OF server.js
# ---------------------------------------------------------
# server.js is the entry point of the backend application.
# It is responsible only for setting up the server environment.
# It should NOT contain business logic or database queries.

# Responsibilities of server.js:
# - Create the Express application
# - Register global middleware
# - Connect to the database
# - Mount API routers
# - Register error-handling middleware

# ---------------------------------------------------------
# API ROUTING
# ---------------------------------------------------------
# API routing forwards requests to specific route handlers.
# server.js does not know how users or products work.
# It only forwards requests to the correct API module.

# Example idea:
# Requests starting with a user path go to user API logic.
# Requests starting with a product path go to product API logic.

# ---------------------------------------------------------
# WHY IMPORT APIs AND NOT MODELS
# ---------------------------------------------------------
# API files already import their required models internally.
# server.js should stay clean and lightweight.
# This separation improves readability and maintainability.

# server.js = traffic controller
# API files = request handling and logic
# Models = database schema and structure

# ---------------------------------------------------------
# req.params
# ---------------------------------------------------------
# req.params is used to read dynamic values from the URL path.
# It is commonly used to identify a specific resource.

# Example use cases:
# - Fetch a user by ID
# - Fetch a product by ID
# - Delete or update a specific record

# Values in req.params are always strings.

# ---------------------------------------------------------
# JWT (JSON Web Token)
# ---------------------------------------------------------
# JWT is used for authentication.
# It allows the server to verify a user without storing sessions.

# JWT contains:
# - Header: algorithm and token type
# - Payload: user data and metadata
# - Signature: verifies token integrity

# JWT is signed, not encrypted.
# Sensitive data should never be stored inside it.

# ---------------------------------------------------------
# JWT AUTHENTICATION FLOW
# ---------------------------------------------------------
# User logs in with credentials.
# Server verifies credentials.
# Server creates a JWT.
# JWT is sent to the client using cookies.
# Browser sends JWT automatically with each request.
# Server verifies JWT before allowing access to protected routes.

# ---------------------------------------------------------
# AUTHENTICATION MIDDLEWARE
# ---------------------------------------------------------
# Authentication middleware checks:
# - Whether a token exists
# - Whether the token is valid
# - Whether the token is expired

# If valid:
# - User data is attached to the request
# - Request proceeds to the route handler

# If invalid:
# - Request is rejected with an error response

# ---------------------------------------------------------
# ERROR HANDLING MIDDLEWARE
# ---------------------------------------------------------
# Error-handling middleware catches errors from any route.
# It sends a consistent error response to the client.
# It must be registered at the very end.

# This avoids repetitive error-handling code.

# ---------------------------------------------------------
# WHY JWT + COOKIES
# ---------------------------------------------------------
# Cookies are automatically sent by the browser.
# httpOnly cookies protect against XSS attacks.
# JWT avoids server-side session storage.
# This combination is secure and scalable.
