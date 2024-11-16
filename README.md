# Template Preview API

## Endpoints

### **1. GET `/fields`**

#### **Description:**

Retrieve the available fields to display to the user for input to generate the template.

#### **Request:**

- **Method:** `GET`
- **URL:** `/api/preview/fields`
- **Headers:** None
- **Body:** None

#### **Response:**

- **Status 200:** Returns the schema object.

  ```json
  {
    username: {
      type: String,
      required: true,
      label: "Username",
      placeholder: "Enter Username",
    },
    orderId: {
      type: String,
      required: true,
      label: "Order ID",
      placeholder: "Enter Order ID",
    },
    amount: {
      type: Number,
      required: true,
      label: "Amount (INR)",
      placeholder: "Enter Amount in INR",
    },
    address: {
      type: String,
      required: true,
      label: "Address",
      placeholder: "Enter Address",
    },
    trackLink: {
      type: String,
      required: true,
      label: "Tracking Link",
      placeholder: "Enter URL for Tracking Link",
    },
  },
  ```

### **2. POST `/template-preview`**

#### **Description:**

Generate a preview of a template message.

#### **Request:**

- **Method:** `POST`
- **URL:** `/api/preview/template-preview`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "username": "something",
    "orderId": "12345",
    "amount": 1233,
    "address": "123 Street, Bengaluru, India",
    "trackLink": "https://something.com/track"
  }
  ```

#### **Validation Rules:**

The `validateTemplatePreview` middleware enforces the following rules:

- `username` (string) - Required
- `orderId` (string) - Required
- `amount` (number) - Required
- `address` (string) - Required
- `trackLink` (string, valid URL) - Required

#### **Response:**

- **Status 200:** Returns a generated template message.

  ```json
  {
    "template": "Hello something, your order 12345 is confirmed for 1233. We'll deliver it to 123 Street, Bengaluru, India. Track your order here: https://something.com/track"
  }
  ```

- **Status 400:** Returns validation errors or general errors.
  ```json
  {
    "errors": [
      {
        "msg": "Username is required",
        "param": "username",
        "location": "body"
      },
      {
        "msg": "Amount must be a number",
        "param": "amount",
        "location": "body"
      }
    ]
  }
  ```

---

## Setup

1. Clone the repository:

   ```bash
   git clone https://www.github.com/falakthkr/tmps-backend
   cd <repository-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. The API will be available at `http://localhost:8080/api/preview`.

---

## Usage

### Example Request to `/fields`:

```bash
curl -X GET http://localhost:3000/api/preview/fields
```

### Example Request to `/template-preview`:

```bash
curl -X POST http://localhost:3000/api/preview/template-preview -H "Content-Type: application/json" -d '{
  "username": "something",
  "orderId": "12345",
  "amount": 1233,
  "address": "123 Street, Bengaluru, India",
  "trackLink": "https://something.com/track"
}'
```
