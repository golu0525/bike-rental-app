# Developer Migration Guide

## What Changed and Why

### Backend Changes

#### Controllers (Before) ❌
```typescript
// src/controllers/auth.ts - Had both HTTP handling AND business logic
export const signup = async (req: Request, res: Response) => {
  const { name, email, password, location } = req.body;
  
  // Hash password (business logic)
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Insert user (database logic)
  const [result] = await pool.query(...);
  
  // Send response (HTTP logic)
  res.status(201).json(...);
};
```

#### New Pattern (After) ✅
```typescript
// src/modules/auth/auth.controller.ts - Only HTTP handling
export const signup = async (req: Request, res: Response) => {
  try {
    const result = await authService.signup(...);
    res.status(201).json({ message: 'User created', ...result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// src/modules/auth/auth.service.ts - Business logic isolated
export class AuthService {
  async signup(name, email, password, location) {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert user
    const [result] = await pool.query(...);
    return { userId: result.insertId };
  }
}
```

**Benefits:**
- Easy to test business logic independently
- Reusable services across different HTTP controllers
- Clear separation of concerns
- Easier to debug issues

---

### Configuration Management

#### Before ❌
```typescript
// Scattered in multiple files
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const PORT = process.env.PORT || 5000;

// In db/index.ts
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  // ...
});
```

#### After ✅
```typescript
// src/config/env.ts - Single source of truth
export const env = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey',
  DB_HOST: process.env.DB_HOST || 'localhost',
  // ... all config in one place
};

// Used everywhere
import { env } from './config/env.js';
const token = jwt.sign(..., env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
```

**Benefits:**
- Single source of truth for all config
- Type-safe access to env variables
- Easy to override defaults
- Better for different environments (dev, staging, prod)

---

### Error Handling

#### Before ❌
```typescript
export const getBikes = async (req: Request, res: Response) => {
  try {
    // code
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bikes' });
  }
};
```

#### After ✅
```typescript
// src/utils/ApiError.ts - Custom error class
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any
  ) {
    super(message);
  }
}

// Use it like this
export const getBikes = async (req: Request, res: Response) => {
  try {
    const bikes = await bikeService.getBikes();
    res.json(bikes);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Internal Server Error'
    });
  }
};

// Global error middleware catches all errors
app.use(errorHandler);
```

**Benefits:**
- Consistent error responses
- Centralized error handling
- Type-safe error information

---

### Entry Point

#### Before ❌
```bash
# package.json
"scripts": {
  "dev": "tsx watch src/index.ts",
  "start": "node dist/index.js"
}

# src/index.ts - Mixed concerns
import express from "express";
import app setup
import routes
import database init

const app = express();
// ... all setup in one file
app.listen(PORT, ...)
```

#### After ✅
```bash
# package.json
"scripts": {
  "dev": "tsx watch src/server.ts",
  "start": "node dist/server.js"
}

# src/app.ts - App configuration
import express from "express";
import routes from "./modules/...";

const app = express();
app.use(cors());
app.use(routes);
export default app;

# src/server.ts - Server startup
import app from "./app.js";
import { initializeDatabase } from "./db/init.js";

const PORT = env.PORT;
(async () => {
  await initializeDatabase();
  app.listen(PORT, ...);
})();
```

**Benefits:**
- Separation of concerns
- Easy to test app without starting server
- Clear startup sequence

---

## Frontend Changes

### Route Management

#### Before ❌
```typescript
// src/App.tsx - All routes in one place
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/about" element={<AboutUs />} />
  <Route path="/login" element={<Login />} />
  {/* Got messy quickly */}
</Routes>
```

#### After ✅
```typescript
// src/app/routes.tsx - Centralized, organized
export const routes = [
  { path: '/', element: <LandingPage /> },
  { path: '/about', element: <AboutUs /> },
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <UserDashboard /> },
  // Can easily add guards, redirects, etc.
];

// src/app/App.tsx - Clean
<AppRoutes />
```

**Benefits:**
- Easy to see all routes at a glance
- Can add route-level guards
- Easier to refactor routing logic
- Single source of truth

---

### API Abstraction

#### Before ❌
```typescript
// src/pages/Login.tsx - API calls scattered everywhere
const handleSubmit = async (e) => {
  const response = await axios.post(
    'http://localhost:5000/api/auth/login',
    credentials
  );
};

// src/pages/LandingPage.tsx - Different endpoint format
const response = await axios.get(
  'http://localhost:5000/api/bikes',
  { params: search }
);
```

#### After ✅
```typescript
// src/features/auth/api/auth.api.ts - Centralized
export const authApi = {
  login: (data) => axios.post(`${API_URL}/auth/login`, data),
};

// src/features/bikes/api/bike.api.ts
export const bikeApi = {
  getBikes: (params) => axios.get(`${API_URL}/bikes`, { params }),
};

// Usage in components
import { authApi } from '../api/auth.api';
const response = await authApi.login(credentials);
```

**Benefits:**
- Single place to update URLs
- Type-safe API calls
- Easy to mock for testing
- Consistent API usage patterns

---

### Component Organization

#### Before ❌
```
src/
├── pages/
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── LandingPage.tsx
│   └── UserDashboard.tsx
├── components/
│   ├── BikeCard.tsx
│   └── Navbar.tsx
└── services/
```

**Problems:**
- Hard to find related files
- Components mixed with pages
- Difficult with 50+ components

#### After ✅
```
src/
├── features/auth/
│   ├── pages/ (Login, Signup)
│   ├── components/
│   ├── api/ (auth.api.ts)
│   └── auth.types.ts
├── features/bikes/
│   ├── pages/ (LandingPage, AboutUs)
│   ├── components/ (BikeCard)
│   ├── api/ (bike.api.ts)
│   └── bike.types.ts
├── shared/
│   ├── components/ (Navbar)
│   ├── hooks/ (useAuth.ts)
│   └── constants/
```

**Benefits:**
- All related code in one place
- Easy to find what you need
- Can move entire feature if needed
- Clear dependencies between features

---

## Migration Steps Checklist

### Backend

1. **Verify new structure exists:**
   - [ ] `src/config/` exists
   - [ ] `src/modules/` exists with auth, bikes, bookings
   - [ ] `src/middlewares/` exists
   - [ ] `src/utils/` exists
   - [ ] `src/app.ts` exists
   - [ ] `src/server.ts` exists

2. **Update imports in your code:**
   - [ ] Change `controllers/` imports to `modules/*/controller`
   - [ ] Change `routes/` imports to `modules/*/routes`
   - [ ] Use centralized `env` from `config/env`

3. **Test backend:**
   - [ ] Run `npm run dev`
   - [ ] Test all API endpoints
   - [ ] Verify database connection
   - [ ] Check JWT authentication

4. **Clean up old files (when ready):**
   - [ ] Delete `src/controllers/`
   - [ ] Delete `src/routes/`
   - [ ] Delete `src/middleware/`
   - [ ] Delete `src/types/`
   - [ ] Delete `src/index.ts`

### Frontend

1. **Verify new structure exists:**
   - [ ] `src/app/` exists with App.tsx and routes.tsx
   - [ ] `src/features/` exists with auth, bikes, dashboard
   - [ ] `src/shared/` exists with components, hooks, etc.
   - [ ] `src/services/` has axios.ts
   - [ ] `src/main.tsx` updated to import from `app/App`

2. **Update imports in your code:**
   - [ ] Import pages from `features/*/pages/`
   - [ ] Import API files from `features/*/api/`
   - [ ] Import shared components from `shared/components/`
   - [ ] Use routes from `app/routes.tsx`

3. **Test frontend:**
   - [ ] Run `npm run dev`
   - [ ] Navigate all pages
   - [ ] Test authentication flow
   - [ ] Verify API calls work

4. **Clean up old files (when ready):**
   - [ ] Delete `src/pages/`
   - [ ] Delete old `src/components/`
   - [ ] Delete `src/App.tsx` (now in `app/`)

---

## Common Patterns to Follow

### Adding a New API Endpoint

#### Backend
```typescript
// 1. Create service function
// src/modules/users/user.service.ts
export class UserService {
  async getUser(id: number) {
    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return users[0];
  }
}

// 2. Create controller
// src/modules/users/user.controller.ts
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// 3. Add route
// src/modules/users/user.routes.ts
router.get('/:id', getUser);

// 4. Register in app.ts
// src/app.ts
import userRoutes from './modules/users/user.routes';
app.use('/api/users', userRoutes);
```

#### Frontend
```typescript
// 1. Create API file
// src/features/users/api/user.api.ts
export const userApi = {
  getUser: (id) => axios.get(`/users/${id}`),
  updateUser: (id, data) => axios.put(`/users/${id}`, data),
};

// 2. Create page/component that uses it
// src/features/users/pages/UserProfile.tsx
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    userApi.getUser(userId).then(res => setUser(res.data));
  }, [userId]);
  
  return <div>{user?.name}</div>;
};

// 3. Add route in app/routes.tsx
{ path: '/users/:id', element: <UserProfile /> }
```

---

## IDE Tips

### VS Code - Command Palette Commands
- `Ctrl+P` - Quick file open (search for files)
- `Ctrl+F` - Find in file
- `Ctrl+Shift+F` - Find across project
- `Ctrl+H` - Replace in file

### TypeScript - Better autocompletion
With new structure:
```typescript
import { bikeApi } from '@/features/bikes/api/bike.api';
// ↑ Full autocomplete of all methods
```

### Path Aliases (Optional)
In `tsconfig.json`, you can add:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
Then use: `import { authApi } from '@/features/auth/api/auth.api';`

---

## Troubleshooting Common Issues

### "Cannot find module" errors
- Check file exists in new structure
- Verify import path is correct
- Check `.js` extension in imports (important for ES modules)

### Routes not working
- Verify routes added to `app/routes.tsx`
- Check page components are imported
- Verify router setup in `app/App.tsx`

### API calls failing
- Check `services/axios.ts` configuration
- Verify backend routes registered
- Check network tab in DevTools

### Backend module not found
- Verify file exists in `src/modules/`
- Check import statement (use `.js` extension)
- Restart dev server

---

## Performance Considerations

### Backend
- Service layer enables caching strategies
- Middleware order matters for performance
- Use connection pooling (already configured)

### Frontend
- Features can be code-split with React.lazy()
- API layer centralizes caching logic
- Shared components reduce bundle size

---

Great! Your project is now ready for professional development! 🚀
