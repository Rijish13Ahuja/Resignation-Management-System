# Resignation Management System

A web application for managing employee resignations and exit interviews with role-based access control.

![image](https://github.com/user-attachments/assets/40ed8573-177d-477b-9d20-4bfb17afc4c6)
![image](https://github.com/user-attachments/assets/60502e03-fc48-45d7-8495-07ad1e3269df)
![image](https://github.com/user-attachments/assets/aeca775e-34c2-4711-824a-7c716b958f4c)



## Features

- **Role-Based Access Control**
  - HR: Manage all resignations, approve/reject requests, set exit dates
  - Employees: Submit resignation requests, complete exit interviews
- **Resignation Workflow**
  - Date validation (weekends/holidays using Calendarific API)
  - Email notifications (Nodemailer)
  - Status tracking (Pending/Approved/Rejected)
- **Exit Interviews**
  - Digital questionnaire submission
  - HR review system
- **Modern UI**
  - Responsive design
  - Interactive data grids
  - Animated transitions

## Installation

### Prerequisites
- Node.js v16+
- MongoDB
- Calendarific API Key
- SMTP Email Credentials

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Configuration

### `.env` File (Backend):
```ini
PORT=8080
MONGODB_URI=mongodb://localhost:27017/resignation_db
JWT_SECRET=your_secret_key
CALENDARIFIC_API_KEY=your_api_key
EMAIL_USER=your@email.com
EMAIL_PASS=your_email_password
```

## Usage

### HR Access
- **URL:** `http://localhost:3000/hr`
- **Credentials:**
  - **Username:** admin
  - **Password:** admin

### Employee Flow
1. Sign up at `http://localhost:3000/login`
2. Submit resignation request
3. Receive approval/rejection email
4. Complete exit interview post-approval

## API Examples

### Employee Login
```bash
curl -X POST http://localhost:8080/api/auth/login \  
  -H "Content-Type: application/json" \  
  -d '{"username":"john","password":"john123"}'
```

### Submit Resignation
```bash
curl -X POST http://localhost:8080/api/resignations \  
  -H "Authorization: Bearer <TOKEN>" \  
  -H "Content-Type: application/json" \  
  -d '{"intendedLastDay":"2024-03-15","reason":"Career change"}'
```

## API Documentation

### Authentication
| Endpoint        | Method | Description           |
|---------------|--------|-----------------------|
| `/auth/login`  | POST   | HR/Employee login     |
| `/auth/signup` | POST   | Employee registration |

### Resignations
| Endpoint                  | Method | Description                  |
|--------------------------|--------|------------------------------|
| `/resignations`          | GET    | List resignations (HR sees all) |
| `/resignations`          | POST   | Submit new resignation       |
| `/resignations/:id/approve` | PUT  | Approve resignation (HR only) |

### Sample Response:
```json
{
  "_id": "65f4b8e3c8b8a7a8135b8a5",
  "employee": "65f4b8e3c8b8a7a8135b8a4",
  "status": "pending",
  "intendedLastDay": "2024-03-15T00:00:00.000Z"
}
```

## Tech Stack

### Frontend
- React 
- Material-UI
- Framer Motion (Animations)
- React Datepicker
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer (Email Service)

### Third-Party Services
- Calendarific (Holiday API)
- SMTP Service (Email delivery)

## Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License
MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments
- Calendarific for holiday data API
- MongoDB Atlas for database hosting
- Material-UI component library


[GitHub Repository](https://github.com/Rijish13Ahuja/Resignation-Management-System)
