# Quick Start Guide - After Restructuring

## Running the Application

### Backend Setup

1. **Install dependencies** (if not already done):
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables**:
   Create/update `.env` file:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=bike_rental_db
   JWT_SECRET=your_secret_key
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

---

### Frontend Setup

1. **Install dependencies** (if not already done):
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   App will run on `http://localhost:5173`

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## Project Structure at a Glance

### Backend: Module-Based Organization
```
Each module has:
- Controller: Handles HTTP requests
- Service: Contains business logic
- Routes: Defines endpoints
- Types: TypeScript interfaces
- Validation: Input validation

Example (auth module):
src/modules/auth/
├── auth.controller.ts    (HTTP endpoints)
├── auth.service.ts       (login, signup logic)
├── auth.routes.ts        (POST /signup, /login)
├── auth.types.ts         (User interface)
└── auth.validation.ts    (validation rules)
```

### Frontend: Feature-Based Organization
```
Each feature has:
- Pages: Full page components
- Components: Reusable components
- API: API call functions
- Types: TypeScript interfaces

Example (auth feature):
src/features/auth/
├── pages/
│   ├── Login.tsx
│   └── Signup.tsx
├── components/
├── api/
│   └── auth.api.ts       (API calls)
├── auth.types.ts
```

---

## API Endpoints Reference

### Authentication
```
POST /api/auth/signup
Body: { name, email, password, location }
Response: { message, userId }

POST /api/auth/login
Body: { email, password }
Response: { token, user: { id, name, email, role } }
```

### Bikes
```
GET /api/bikes?location=Mumbai&type=Scooter
Response: [{ id, model, type, hourly_rate, location, is_available }]

POST /api/bikes (Admin only)
Body: { model, type, hourly_rate, location, image_url }
Response: { message, bikeId }

PUT /api/bikes/:id (Admin only)
Body: { model, type, hourly_rate, location, is_available }
Response: { message }

DELETE /api/bikes/:id (Admin only)
Response: { message }
```

### Bookings
```
GET /api/bookings (Authenticated)
Response: [{ id, bike_id, model, start_time, end_time, total_amount, status }]

POST /api/bookings (Authenticated)
Body: { bike_id, start_time, end_time }
Response: { message, bookingId, total_amount }

DELETE /api/bookings/:id (Authenticated)
Response: { message }
```

---

## Common Tasks

### Adding a New Feature

#### Backend
1. Create new folder: `src/modules/your_feature/`
2. Add files: controller, service, routes, types, validation
3. Import routes in `src/app.ts`:
   ```typescript
   import yourRoutes from './modules/your_feature/your.routes.js';
   app.use('/api/your_feature', yourRoutes);
   ```

#### Frontend
1. Create new folder: `src/features/your_feature/`
2. Add: pages, components, api files, types
3. Create API file: `src/features/your_feature/api/your.api.ts`
4. Add routes in `src/app/routes.tsx`

---

### Using the Auth Hook

```typescript
import { useAuth } from '@/shared/hooks/useAuth';

const MyComponent = () => {
  const { token, user, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }
  
  return (
    <div>
      Welcome, {user.name}!
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

---

### Making API Calls

```typescript
import { bikeApi } from '@/features/bikes/api/bike.api';

// Get bikes
const response = await bikeApi.getBikes({ location: 'Mumbai' });

// Add bike (requires token)
const token = localStorage.getItem('token')!;
await bikeApi.addBike(bikeData, token);
```

---

## Troubleshooting

### Backend Issues

**Port already in use**
```bash
# On Windows
netstat -ano | findstr :5000
taskkill /PID YOUR_PID /F

# On Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**Database connection error**
- Check `src/config/env.ts`
- Verify MySQL is running
- Verify `.env` file has correct credentials

### Frontend Issues

**Port already in use**
```bash
npm run dev -- --port 3000
```

**Module not found errors**
- Clear `node_modules`: `rm -rf node_modules && npm install`
- Restart dev server

---

## Environment Variables

### Backend `.env`
```
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bike_rental_db

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:5173
```

---

## Important Files to Know

### Backend
- `src/app.ts` - Express app setup & route registration
- `src/server.ts` - Server startup
- `src/config/env.ts` - All configurations in one place
- `src/config/db.ts` - Database connection

### Frontend
- `src/app/App.tsx` - Main app component
- `src/app/routes.tsx` - All routes defined here
- `src/services/axios.ts` - API client with interceptors
- `src/shared/hooks/useAuth.ts` - Authentication hook

---

## Next Cleanup Steps

### Backend
1. Delete old directories:
   ```bash
   rm -rf src/controllers src/routes src/middleware src/types
   rm src/index.ts
   ```

2. Test API endpoints:
   ```bash
   npm run dev
   # Test in Postman or curl
   ```

### Frontend
1. Delete old directories:
   ```bash
   rm -rf src/pages src/components (or move old files)
   ```

2. Test app:
   ```bash
   npm run dev
   # Navigate to localhost:5173
   ```

---

## Performance Tips

### Backend
- Use indexed database queries
- Implement caching for frequently accessed data
- Use connection pooling (already done in `db.ts`)

### Frontend
- Use React.lazy() for code splitting by feature
- Implement error boundaries
- Use React.memo() for expensive components
- Optimize images with proper formats

---

## Need Help?

Check the existing features:
- Auth feature for authentication patterns
- Bikes feature for CRUD operations
- Dashboard feature for user-specific data

All follows the same pattern - use them as templates! 🚀
