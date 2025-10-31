# Highway Delite - Adventure Booking Platform

A modern, full-stack web application for booking adventure experiences with real-time slot management, promo codes, and seamless checkout flow.

**Live Demo:** [Frontend URL] | [Backend API URL]

![Highway Delite](https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=300&fit=crop)

## 🌟 Features

### User Features
- 🏠 **Home Page** - Browse all adventure experiences
- 🔍 **Search** - Search experiences by title, location, or description
- 📋 **Experience Details** - View detailed information with image gallery
- 📅 **Slot Selection** - Choose date and time with real-time availability
- 🛒 **Quantity Management** - Select number of participants
- 💳 **Checkout** - Complete booking with form validation
- 🎟️ **Promo Codes** - Apply discount codes (SAVE10, FLAT100, etc.)
- ✅ **Confirmation** - View booking reference ID and details
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop

### Technical Features
- ⚡ **Fast Performance** - Next.js 15 with App Router
- 🎨 **Modern UI** - Custom design with TailwindCSS
- 🔒 **Type Safety** - Full TypeScript implementation
- 🗄️ **Database** - SQLite with Prisma ORM
- 🌐 **REST API** - Express.js backend with validation
- 🔄 **Real-time Updates** - Dynamic slot availability
- 🛡️ **Error Handling** - Comprehensive error management
- 📊 **Data Validation** - Server-side and client-side validation

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **State Management:** React Hooks

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** SQLite
- **ORM:** Prisma
- **Validation:** Express Validator

## 📁 Project Structure

```
highway_delite/
├── client/                 # Frontend (Next.js)
│   ├── app/
│   │   ├── page.tsx       # Home page - Experience listing
│   │   ├── experience/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Experience details & slot selection
│   │   ├── checkout/
│   │   │   └── page.tsx   # Checkout form
│   │   └── confirmation/
│   │       └── page.tsx   # Booking confirmation
│   ├── components/        # Reusable components
│   ├── services/          # API services
│   ├── types/            # TypeScript types
│   └── lib/              # Utilities
│
└── server/               # Backend (Express)
    ├── src/
    │   ├── controllers/  # Request handlers
    │   ├── routes/       # API routes
    │   ├── index.ts      # Server entry point
    │   └── seed.ts       # Database seeder
    └── prisma/
        └── schema.prisma # Database schema
```

## 🚀 Quick Start Guide

### Prerequisites

Make sure you have these installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **pnpm**
- **Git** - [Download here](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd highway_delite
```

### Step 2: Backend Setup (Server)

Open a terminal and run:

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Create and setup database
npx prisma migrate dev --name init

# Seed database with sample data (8 experiences, 336 slots, 4 promo codes)
npm run seed

# Start backend server
npm run dev
```

✅ **Backend is now running at:** `http://localhost:5000`

You should see:
```
Server running on port 5000
Database connected successfully
```

### Step 3: Frontend Setup (Client)

**Open a NEW terminal window** (keep backend running) and run:

```bash
# Navigate to client folder (from project root)
cd client

# Install dependencies
npm install

# Start frontend server
npm run dev
```

✅ **Frontend is now running at:** `http://localhost:3000`

You should see:
```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

### Step 4: Open the Application

Open your browser and go to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api/experiences

🎉 **You're all set!** Start exploring experiences and making bookings.

---

## 🔧 Troubleshooting

### Backend won't start?
```bash
cd server
rm -rf node_modules
npm install
npx prisma generate
npm run dev
```

### Frontend won't start?
```bash
cd client
rm -rf node_modules .next
npm install
npm run dev
```

### Database issues?
```bash
cd server
rm prisma/dev.db
npx prisma migrate dev --name init
npm run seed
```

### Port already in use?
- Backend: Change port in `server/src/index.ts` (default: 5000)
- Frontend: Change port using `npm run dev -- -p 3001`

---

## 📊 Database Management

### View Database in Prisma Studio

```bash
cd server
npx prisma studio
```

Opens at: `http://localhost:5555`

Here you can:
- View all experiences, slots, bookings
- Edit data directly
- Test promo codes
- Check slot availability

### Reset Database

```bash
cd server
npx prisma migrate reset
npm run seed
```

## 📡 API Endpoints

### Experiences

#### GET `/api/experiences`
Get all experiences
```json
Response:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Kayaking in River",
      "location": "Udaipur, Rajasthan",
      "image": "url",
      "price": 999,
      "description": "...",
      ...
    }
  ]
}
```

#### GET `/api/experiences/:id`
Get experience details with slots
```json
Response:
{
  "success": true,
  "data": {
    "experience": { ... },
    "slots": [
      {
        "id": "uuid",
        "date": "Nov 1",
        "time": "09:00 AM",
        "availableSpots": 8,
        "totalSpots": 10
      }
    ]
  }
}
```

### Bookings

#### POST `/api/bookings`
Create a new booking
```json
Request:
{
  "experienceId": "uuid",
  "slotId": "uuid",
  "fullName": "John Doe",
  "email": "john@example.com",
  "quantity": 2,
  "promoCode": "SAVE10",
  "subtotal": 1998,
  "discount": 200,
  "taxes": 120,
  "total": 1918
}

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "referenceId": "BK12345678",
    "status": "confirmed",
    ...
  }
}
```

### Promo Codes

#### POST `/api/promo/validate`
Validate a promo code
```json
Request:
{
  "code": "SAVE10"
}

Response:
{
  "success": true,
  "data": {
    "code": "SAVE10",
    "discount": 10,
    "type": "percentage"
  }
}
```

## 🎟️ Available Promo Codes

- **SAVE10** - 10% off
- **FLAT100** - ₹100 off
- **WELCOME20** - 20% off
- **ADVENTURE50** - ₹50 off

## 🎨 Design & UX

- **Responsive Design:** Fully responsive across mobile, tablet, and desktop
- **Loading States:** Spinners and skeletons for async operations
- **Error Handling:** User-friendly error messages
- **Form Validation:** Email and required field validation
- **Accessibility:** Semantic HTML and ARIA labels

## 🧪 Testing the Application

### Complete User Flow

1. **Home Page** (`http://localhost:3000`)
   - Browse 8 different adventure experiences
   - View prices, locations, ratings
   - Use search bar to find experiences

2. **Search** 
   - Type "kayaking" or "trekking" in search bar
   - Press Enter or click Search button
   - View filtered results

3. **Experience Details** (Click any experience card)
   - View large image and full description
   - See "About" section with details
   - Choose from available dates (Oct 22 - Oct 26)
   - Select time slot (shows availability: "4 left", "Sold out", etc.)
   - Adjust quantity with +/- buttons
   - View price breakdown (Subtotal, Taxes, Total)
   - Click "Confirm" to proceed

4. **Checkout Page**
   - Fill in booking details:
     - Full Name: "John Doe"
     - Email: "test@example.com"
     - Phone: "1234567890"
   - Apply promo code:
     - Try "SAVE10" (10% off)
     - Try "FLAT100" (₹100 off)
     - Try "WELCOME20" (20% off)
   - Check "I agree to terms" checkbox
   - Click "Pay and Confirm"

5. **Confirmation Page**
   - See success message with green checkmark
   - View booking reference ID (e.g., BK12345678)
   - See complete booking details
   - Click "Back to Home" to start over

### Test Data

**Seeded Experiences:**
- Bungee Jumping (₹1,499 - Rishikesh)
- Kayaking in River (₹999 - Udaipur)
- Mountain Trekking (₹799 - Manali)
- Scuba Diving (₹2,499 - Andaman)
- Coffee Plantation Tour (₹599 - Coorg)
- Sunrise Hike (₹699 - Nandi Hills)
- Boat Cruise (₹899 - Kerala)
- Desert Safari (₹1,299 - Jaisalmer)

**Available Promo Codes:**
| Code | Discount | Type |
|------|----------|------|
| SAVE10 | 10% off | Percentage |
| FLAT100 | ₹100 off | Fixed |
| WELCOME20 | 20% off | Percentage |
| ADVENTURE50 | ₹50 off | Fixed |

**Test Booking:**
- Experience: Any from list
- Date: Oct 22, 23, 24, 25, or 26
- Time: 07:00 AM, 09:00 AM, 11:00 AM (avoid "Sold out" slots)
- Quantity: 1-4
- Name: John Doe
- Email: test@example.com
- Phone: 1234567890
- Promo: SAVE10

## 📦 Build for Production

### Backend
```bash
cd server
npm run build
npm start
```

### Frontend
```bash
cd client
npm run build
npm start
```

## 🌐 Deployment Guide

### Option 1: Vercel (Frontend) + Render (Backend)

#### Deploy Backend to Render

1. **Create account** at [render.com](https://render.com)
2. **New Web Service** → Connect GitHub repo
3. **Settings:**
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     ```
     NODE_ENV=production
     PORT=5000
     DATABASE_URL=file:./prod.db
     ```
4. **Deploy** - Copy your backend URL (e.g., `https://your-app.onrender.com`)

#### Deploy Frontend to Vercel

1. **Create account** at [vercel.com](https://vercel.com)
2. **Import Project** → Connect GitHub repo
3. **Settings:**
   - **Root Directory:** `client`
   - **Framework:** Next.js
   - **Environment Variables:**
     ```
     NEXT_PUBLIC_API_URL=https://your-app.onrender.com/api
     ```
4. **Deploy** - Your frontend URL: `https://your-app.vercel.app`

### Option 2: Railway (Both Frontend & Backend)

1. **Create account** at [railway.app](https://railway.app)
2. **New Project** → Deploy from GitHub
3. Railway auto-detects and deploys both services
4. Set environment variables as above

### Option 3: AWS EC2 (Production)

```bash
# On EC2 instance
git clone <repo>
cd highway_delite

# Backend
cd server
npm install --production
npx prisma generate
npx prisma migrate deploy
npm run seed
pm2 start dist/index.js --name api

# Frontend
cd ../client
npm install --production
npm run build
pm2 start npm --name web -- start

# Nginx reverse proxy
sudo nano /etc/nginx/sites-available/default
# Configure ports 5000 (backend) and 3000 (frontend)
```

### After Deployment

1. **Test API:** Visit `https://your-backend-url/api/experiences`
2. **Update README:** Add your live URLs
3. **Seed Production DB:** Run seed script on deployed backend
4. **Test Full Flow:** Complete a booking end-to-end

## 🔧 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
NODE_ENV=development
PORT=5000
DATABASE_URL="file:./dev.db"
```

## 📝 Development Notes

### Key Features Implemented
- ✅ Complete booking flow from browsing to confirmation
- ✅ Dynamic slot availability management
- ✅ Promo code system with percentage and fixed discounts
- ✅ Automatic reference ID generation
- ✅ Real-time slot updates after booking
- ✅ Comprehensive error handling
- ✅ TypeScript for type safety
- ✅ Clean code architecture

### Code Quality
- TypeScript for type safety
- Modular component structure
- Separation of concerns (routes, controllers, services)
- Error handling middleware
- Input validation
- Clean and maintainable code

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning and development.

## � Available Scripts

### Backend (server/)
```bash
npm run dev        # Start development server with hot reload
npm run build      # Build TypeScript to JavaScript
npm start          # Start production server
npm run seed       # Seed database with sample data
```

### Frontend (client/)
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

## 📚 Project Requirements Met

✅ **Frontend:** Next.js 15, TypeScript, TailwindCSS, Axios  
✅ **Backend:** Express.js, TypeScript, SQLite, Prisma ORM  
✅ **Pages:** Home, Details, Checkout, Confirmation, Search  
✅ **Features:** Slots, Promo codes, Dynamic booking, Validation  
✅ **Design:** Custom UI matching Figma specifications  
✅ **Code Quality:** Clean, modular, well-documented  
✅ **Error Handling:** Comprehensive error management  
✅ **Responsive:** Mobile-first design  

## �👨‍💻 Author

**[Your Name]**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- Assignment: Highway Delite Fullstack Intern

## 🙏 Acknowledgments

- **Highway Delite** - For the internship opportunity
- **Figma Design** - UI/UX specifications
- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- UI Components inspired by [shadcn/ui](https://ui.shadcn.com)

## 📄 License

This project is created for the Highway Delite internship assignment.

---

## ⭐ Important Notes

1. **Both servers must be running** - Backend (5000) and Frontend (3000)
2. **Run seed script** - Database needs sample data to work
3. **Environment variables** - Check `.env` files in both folders
4. **Port conflicts** - Make sure ports 3000 and 5000 are available
5. **Node version** - Use Node.js v18 or higher

---

**Built with ❤️ for Highway Delite Fullstack Internship Assignment**

**Last Updated:** October 31, 2025
