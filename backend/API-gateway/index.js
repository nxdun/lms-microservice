const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

// Create an instance of Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(helmet()); // Add security headers
app.use(morgan("combined")); // Log HTTP requests
app.disable("x-powered-by"); // Hide Express server information

// Define routes and corresponding microservices
const services = [
  {
    route: "/create",
    target: `${process.env.SERVICE_NAME_AUTH}/api/v1/users`,
    headers: {
      "x-api-key": "apikey",
    },
  },
  {
    route: "/login",
    target: `${process.env.SERVICE_NAME_AUTH}/api/v1/auth`,
    headers: {
      "x-api-key": "apikey",
    },
  },
  {
    route: "/register",
    target: `${process.env.SERVICE_NAME_AUTH}/api/v1/users`,
    headers: {
      "x-api-key": "apikey",
    },
  },
  {
    //for testing
    route: "/hi",
    target: `${process.env.SERVICE_NAME_AUTH}/yo`,
    headers: {
      "x-api-key": "apikey",
    },
  },
  {
    //get lecturers
    route: "/lecget",
    target: `${process.env.SERVICE_NAME_LEC}/api/v1/lecturer`,
    headers: {
      "x-api-key": "apikey",
    },
  },
  {
    route: "/create-checkout-session",
    target: `${process.env.SERVICE_NAME_AUTH}/create-checkout-session`,
  },
  {
    route: "/courses",
    target: `${process.env.SERVICE_NAME_COURSE}/api/v1/courses`,
  },
  {
    route: "/notify",
    target: `${process.env.SERVICE_NAME_NOTIFICATION}/notifications`,
  }
];

// Middleware function for setting headers
function setHeaders(req, res, next) {
  const route = req.originalUrl.split("/")[1]; // Get route from URL
  const service = services.find((s) => s.route === `/${route}`);

  if (service && service.headers) {
    // Set headers if defined for the route
    Object.entries(service.headers).forEach(([key, value]) => {
      req.headers[key] = value;
    });
  }

  next();
}

// Apply the setHeaders middleware to all routes
app.use(setHeaders);

// Set up proxy middleware for each microservice
try {
  services.forEach(({ route, target }) => {
    // Proxy options
    const proxyOptions = {
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^${route}`]: "",
      },
    };

    // Apply proxy middleware
    app.use(route, createProxyMiddleware(proxyOptions));
  });
} catch (err) {
  console.log(err);
}

// Handler for route-not-found
app.use((_req, res) => {
  res.status(404).json({
    code: 404,
    status: "Error",
    message: "Route not found.",
    data: null,
  });
});

// Define port for Express server
const PORT = process.env.PORT || 5000;

// Start Express server
app.listen(PORT, () => {
  console.log(`Gateway is running on port ${PORT}`);
});
