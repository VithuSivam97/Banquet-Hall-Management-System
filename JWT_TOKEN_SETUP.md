# JWT Token Authentication Setup Complete

## Backend (Node.js + Express)

### Server Status
- **URL**: http://localhost:5000
- **Status**: ✅ Running on port 5000
- **Environment**: Development with nodemon

### Installed Packages
- `express` - Web framework
- `jsonwebtoken` - JWT token generation and verification
- `bcryptjs` - Password hashing
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables

### Backend Structure
```
bakend/
├── server.js                 # Main server file
├── package.json
├── .env                      # Environment variables
├── config/
│   └── config.js            # Configuration file
├── middleware/
│   └── authMiddleware.js    # JWT verification middleware
├── controllers/
│   └── authController.js    # Authentication logic
├── routes/
│   └── authRoutes.js        # Auth endpoints
└── utils/
    └── tokenUtils.js        # JWT token utilities
```

### API Endpoints

#### 1. Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "vithu",
  "email": "vithu@gmail.com",
  "password": "password123"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "vithu",
    "email": "vithu@gmail.com"
  }
}
```

#### 2. Login User
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "vithu@gmail.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "vithu",
    "email": "vithu@gmail.com"
  }
}
```

#### 3. Get Profile (Protected)
```
GET http://localhost:5000/api/auth/profile
Authorization: Bearer <jwt_token>

Response:
{
  "user": {
    "id": "user_id",
    "name": "vithu",
    "email": "vithu@gmail.com"
  }
}
```

#### 4. Logout
```
POST http://localhost:5000/api/auth/logout
Authorization: Bearer <jwt_token>

Response:
{
  "message": "Logout successful"
}
```

---

## Frontend (React)

### Token Storage Utilities
**File**: `src/utils/tokenStorage.js`

Functions available:
- `setToken(token)` - Store token in localStorage
- `getToken()` - Retrieve token from localStorage
- `removeToken()` - Remove token from localStorage
- `isAuthenticated()` - Check if user is logged in
- `getAuthHeader()` - Get Authorization header with token

### Updated Components

#### LoginPage.jsx
- ✅ Imports and uses `setToken()` to save JWT
- ✅ Error handling with error messages
- ✅ Success messages after login
- ✅ Auto-redirect to dashboard after successful login
- ✅ Token sent to backend, received and stored

#### RegisterPage.jsx
- ✅ Imports and uses `setToken()` to save JWT
- ✅ Form validation with real-time error clearing
- ✅ Error messages for validation and server errors
- ✅ Success messages after registration
- ✅ Auto-redirect to dashboard after successful registration
- ✅ Token sent to backend, received and stored

### Frontend Flow
1. User registers → Backend creates user, returns JWT token
2. Frontend stores token in localStorage via `setToken()`
3. User logs in → Backend verifies credentials, returns JWT token
4. Frontend stores token in localStorage via `setToken()`
5. For protected routes → Use `getAuthHeader()` to send token in requests
6. Backend verifies token via authMiddleware
7. Logout → Remove token from localStorage via `removeToken()`

---

## Token Details

### JWT Format
```
Header.Payload.Signature
```

### Token Payload
```json
{
  "userId": "user_id",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### Token Configuration
- **Expiration**: 7 days
- **Secret Key**: `your-super-secret-jwt-key-change-in-production` (change in production)
- **Algorithm**: HS256

---

## Testing the API

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@test.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'

# Get Profile (with token)
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Security Checklist

- [x] Passwords hashed with bcryptjs
- [x] JWT tokens signed with secret key
- [x] Token verification middleware
- [x] CORS configured
- [x] Environment variables for secrets
- [ ] **TODO**: Change JWT_SECRET in production
- [ ] **TODO**: Use HTTPS in production
- [ ] **TODO**: Implement rate limiting
- [ ] **TODO**: Add refresh token mechanism
- [ ] **TODO**: Implement token blacklist for logout

---

## Next Steps

1. **Connect to Real Database**
   - Replace in-memory user array with MongoDB/PostgreSQL
   - Update authController.js to use database queries

2. **Refresh Token Implementation**
   - Generate refresh tokens with longer expiration
   - Implement token refresh endpoint
   - Store refresh tokens in secure HttpOnly cookies

3. **Protected Routes**
   - Create dashboard page
   - Add route protection in React
   - Use `isAuthenticated()` to redirect unauthorized users

4. **Additional Features**
   - Password reset functionality
   - Email verification
   - User profile update endpoint
   - Role-based access control (RBAC)

5. **Production Setup**
   - Change JWT_SECRET in .env
   - Configure HTTPS
   - Add rate limiting
   - Set up proper error handling
   - Add request validation

---

## Running the Application

### Terminal 1: Backend
```bash
cd "C:\Users\vithu\Documents\OneDrive\Desktop\SDP web\bakend"
npm run dev
```

### Terminal 2: Frontend
```bash
cd "C:\Users\vithu\Documents\OneDrive\Desktop\SDP web\frontend"
npm run dev
```

Access:
- **Frontend**: http://localhost:5173/
- **Backend**: http://localhost:5000/
