# BookIt Client (Frontend)

Next.js frontend for the BookIt experiences booking platform.

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

### Build

```bash
npm run build
npm start
```

## 📦 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **HTTP Client:** Axios
- **Icons:** Lucide React

## 🌍 Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production:
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

## 📁 Structure

```
client/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── experience/[id]/   # Experience details
│   ├── checkout/          # Checkout page
│   └── confirmation/      # Confirmation page
├── components/            # React components
│   ├── header.tsx
│   ├── experience-card.tsx
│   └── ui/               # UI components
├── services/             # API services
│   └── api.ts
├── types/                # TypeScript types
│   └── index.ts
└── lib/                  # Utilities
    └── utils.ts
```

## 🎨 Features

- Fully responsive design
- Dynamic data from backend API
- Real-time slot availability
- Promo code validation
- Form validation
- Loading states
- Error handling
- TypeScript type safety

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

Deploy to Vercel:
```bash
vercel --prod
```

See [DEPLOYMENT.md](../DEPLOYMENT.md) for detailed instructions.

