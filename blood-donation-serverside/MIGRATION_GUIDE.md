# Migration Guide: CommonJS to ES Modules

## Overview

This document explains the migration from the old monolithic CommonJS structure to the new modular ES Modules architecture.

## What Changed

### File Structure

**Before:**
```
blood-donation-serverside/
├── index.js (2000+ lines)
├── package.json
└── vercel.json
```

**After:**
```
blood-donation-serverside/
├── server.js              # Entry point
├── app.js                 # Express app setup
├── package.json           # Updated with "type": "module"
├── vercel.json            # Updated entry point
├── index.js.old           # Old file (backup)
│
└── src/
    ├── config/
    │   └── db.js
    ├── modules/
    │   ├── user/
    │   ├── donor/
    │   ├── recipient/
    │   ├── hospital/
    │   └── booking/
    └── utils/
        ├── email.util.js
        ├── catchAsync.js
        ├── sendResponse.js
        └── helpers.js
```

## Code Changes

### 1. Module Imports

**Before (CommonJS):**
```javascript
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
```

**After (ES Modules):**
```javascript
import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
```

### 2. Module Exports

**Before (CommonJS):**
```javascript
module.exports = router;
// or
exports.sendEmail = sendEmail;
```

**After (ES Modules):**
```javascript
export default router;
// or
export { sendEmail };
// or
export const sendEmail = () => {};
```

### 3. Database Connection

**Before:**
```javascript
// Everything in one file
const client = new MongoClient(uri);
async function run() {
    const db = client.db('blood-donation');
    const userCollection = db.collection('users');
    // ... all routes here
}
```

**After:**
```javascript
// src/config/db.js - Centralized
export const connectDB = async () => {
    await client.connect();
    db = client.db('blood-donation');
    collections = { users: db.collection('users'), ... };
    return collections;
};

// Used in server.js
import { connectDB } from './src/config/db.js';
await connectDB();
```

### 4. Route Handlers

**Before:**
```javascript
app.post('/users', async (req, res) => {
    const user = req.body;
    const query = { email: user?.email }
    const existingUser = await userCollection.findOne(query);
    if (existingUser) {
        return res.send({ message: 'user already exists' })
    }
    const result = await userCollection.insertOne(user);
    res.send(result);
});
```

**After:**
```javascript
// user.model.js
async findByEmail(email) {
    return await this.collection.findOne({ email });
}

// user.service.js
async createUser(userData) {
    const existingUser = await UserModel.findByEmail(userData.email);
    if (existingUser) {
        return { success: false, message: 'User already exists' };
    }
    const result = await UserModel.create(userData);
    return { success: true, data: result };
}

// user.controller.js
export const createUser = catchAsync(async (req, res) => {
    const result = await UserService.createUser(req.body);
    if (!result.success) {
        return sendError(res, result.message, 409);
    }
    return sendSuccess(res, result.message, result.data, 201);
});

// user.route.js
router.post('/', createUser);
```

### 5. Email Sending

**Before:**
```javascript
const sendEmail = (emailAddress, emailData) => {
    const transporter = nodemailer.createTransport({...});
    transporter.verify((error, success) => {
        if (error) console.log(error)
    });
    transporter.sendMail(mailBody, (error, info) => {
        if (error) console.log(error)
    });
}
```

**After:**
```javascript
// src/utils/email.util.js
export const sendEmail = async (emailAddress, emailData) => {
    try {
        const transporter = createTransporter();
        const info = await transporter.sendMail(mailBody);
        return { success: true, info };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};
```

## API Endpoint Mapping

The API endpoints remain **backward compatible**. All old endpoints still work.

| Old Endpoint | New Endpoint | Status |
|--------------|--------------|--------|
| `POST /users` | `POST /users` | ✅ Same |
| `GET /all/users` | `GET /users` | ⚠️ Changed path |
| `GET /users/role/:email` | `GET /users/role/:email` | ✅ Same |
| `POST /donors` | `POST /donors` | ✅ Same |
| `GET /donors?email=` | `GET /donors?email=` | ✅ Same |
| `POST /recipients` | `POST /recipients` | ✅ Same |
| `GET /recipient-requests` | `GET /recipients/requests` | ⚠️ Changed path |
| `POST /hospital` | `POST /hospital` | ✅ Same |
| `POST /booked-donors` | `POST /booked-donors` | ✅ Same |

> **Note:** Backward compatibility paths are maintained in `app.js` for smooth transition.

## Benefits of New Architecture

### 1. **Separation of Concerns**
- Model: Database operations only
- Service: Business logic only
- Controller: HTTP handling only
- Route: URL mapping only

### 2. **Reusability**
```javascript
// Services can be reused
import UserService from '../user/user.service.js';
const user = await UserService.getUserRole(email);
```

### 3. **Testability**
```javascript
// Easy to test individual functions
import UserService from './user.service.js';
const result = await UserService.createUser(mockData);
assert(result.success);
```

### 4. **Maintainability**
- Small, focused files (50-200 lines)
- Clear naming conventions
- Easy to find code
- Easy to modify specific features

### 5. **Scalability**
Adding a new feature:
```
src/modules/new-feature/
├── new-feature.model.js
├── new-feature.service.js
├── new-feature.controller.js
└── new-feature.route.js
```

## Environment Setup

### Required Environment Variables

```env
# Database Configuration
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (Gmail)
NODEMAILER_USER=your_email@gmail.com
NODEMAILER_PASS=your_app_specific_password
```

### Gmail App Password Setup

1. Go to Google Account settings
2. Security → 2-Step Verification
3. App passwords → Generate password
4. Use generated password in `NODEMAILER_PASS`

## Running the Application

### Development
```bash
npm run dev
# Server runs on http://localhost:5000
# Auto-restarts on file changes
```

### Production
```bash
npm start
# Server runs on configured PORT
```

### Testing Endpoints
```bash
# Health check
curl http://localhost:5000/

# Get all users
curl http://localhost:5000/users

# Create a user
curl -X POST http://localhost:5000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

## Troubleshooting

### Issue: "ERR_MODULE_NOT_FOUND"
**Solution:** Make sure all import statements include `.js` extension
```javascript
// ✅ Correct
import UserModel from './user.model.js';

// ❌ Wrong
import UserModel from './user.model';
```

### Issue: "Cannot use import statement outside a module"
**Solution:** Ensure `"type": "module"` is in `package.json`

### Issue: "Database not initialized"
**Solution:** `connectDB()` must be called before any database operations
```javascript
// server.js
await connectDB();  // This must happen first
app.listen(PORT);   // Then start server
```

### Issue: Old routes not working
**Solution:** Check backward compatibility paths in `app.js`

## Rollback Plan

If you need to rollback to the old version:

1. Stop the server
2. Restore old file:
   ```bash
   mv index.js.old index.js
   ```
3. Restore old `package.json`:
   ```bash
   git checkout package.json
   ```
4. Restore old `vercel.json`:
   ```bash
   git checkout vercel.json
   ```
5. Restart server

## Next Steps

### Recommended Improvements

1. **Add Validation Middleware**
   ```javascript
   // src/middlewares/validate.js
   export const validateUser = (req, res, next) => {
       // Validation logic
   };
   ```

2. **Add Authentication Middleware**
   ```javascript
   // src/middlewares/auth.js
   export const authenticate = async (req, res, next) => {
       // JWT verification
   };
   ```

3. **Add Request Logging**
   ```javascript
   // src/middlewares/logger.js
   export const logRequest = (req, res, next) => {
       console.log(`${req.method} ${req.path}`);
       next();
   };
   ```

4. **Add Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```

5. **Add API Documentation**
   ```bash
   npm install swagger-ui-express swagger-jsdoc
   ```

## Support

For questions or issues with the migration:
- Review this guide
- Check `README.md` for setup instructions
- Review code comments in source files
- Compare with `index.js.old` if needed

---

**Migration Completed:** ✅  
**Architecture:** Clean, Modular ES Modules  
**Status:** Production Ready
