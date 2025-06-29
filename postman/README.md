# 🚀 Financly API Testing with Postman

This directory contains the complete Postman collection for testing the Financly Dashboard API endpoints.

## 📁 Files

- `financly-api-collection.json` - Complete Postman collection with all API tests
- `README.md` - This documentation file

## 🔧 Setup Instructions

### 1. Import Collection
1. Open Postman
2. Click **Import** button
3. Select **Upload Files**
4. Choose `financly-api-collection.json` from this directory
5. Click **Import**

### 2. Environment Setup
The collection includes these environment variables:
- `base_url`: `http://localhost:3000` (change if your server runs on different port)
- `auth_token`: Auto-populated after successful login
- `transaction_id`: Auto-saved after creating transactions
- `expense_transaction_id`: Auto-saved for testing purposes
- `user_id`: Auto-saved after user registration

### 3. Start Your Server
Make sure your Next.js development server is running:
\`\`\`bash
npm run dev
\`\`\`

## 🧪 Testing Workflow

### Step 1: Authentication
1. **Register New User** - Creates a test user account
2. **Login User** - Authenticates and saves JWT token
3. **Login - Invalid Credentials** - Tests error handling

### Step 2: Transaction Operations
1. **Get All Transactions** - Retrieves paginated transaction list
2. **Get Transactions with Filters** - Tests filtering by category/status
3. **Search Transactions** - Tests search functionality
4. **Create New Transaction** - Creates a revenue transaction
5. **Create Transaction - Expense** - Creates an expense transaction
6. **Update Transaction** - Modifies existing transaction
7. **Delete Transaction** - Removes a transaction
8. **Export Transactions CSV** - Downloads CSV export

### Step 3: Error Testing
1. **Unauthorized Request** - Tests authentication requirements
2. **Create Transaction - Missing Fields** - Tests validation
3. **Update Non-existent Transaction** - Tests error handling
4. **Delete Non-existent Transaction** - Tests error handling

## ✅ What Gets Tested

### Authentication
- ✅ User registration with validation
- ✅ JWT token generation and format
- ✅ Login with valid credentials
- ✅ Error handling for invalid credentials
- ✅ Token persistence across requests

### Transactions
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Pagination with page/limit parameters
- ✅ Filtering by category (Revenue/Expense)
- ✅ Filtering by status (Paid/Pending)
- ✅ Search functionality
- ✅ CSV export with custom columns
- ✅ Data structure validation
- ✅ Response time validation

### Error Handling
- ✅ Unauthorized access (401/500)
- ✅ Missing required fields (400/500)
- ✅ Non-existent resources (404/500)
- ✅ Invalid data formats
- ✅ Proper error message structure

### Performance
- ✅ Response time under 5 seconds
- ✅ Proper HTTP headers
- ✅ Correct status codes

## 🔍 Test Examples

### Sample API Requests

#### Register User
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
