import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import experienceRoutes from './routes/experiences';
import bookingRoutes from './routes/bookings';
import promoRoutes from './routes/promo';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/experiences', experienceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/promo', promoRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Seed endpoint (for production database initialization)
app.get('/api/seed', async (req, res) => {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    // Check if already seeded
    const count = await prisma.experience.count();
    if (count > 0) {
      await prisma.$disconnect();
      return res.json({ 
        success: false, 
        message: 'Database already seeded',
        experienceCount: count 
      });
    }

    // Seed data inline
    console.log('🌱 Starting database seed...');

    const experiences = [
      {
        title: 'Kayaking in River',
        location: 'Udaipur, Rajasthan',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        price: 999,
        description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
        fullDescription: 'Experience the thrill of kayaking in the beautiful waters of Udaipur. Curated small-group experience with certified guides. Safety first with all gear included including helmet and life jackets. An expert will accompany you throughout the journey.',
        about: 'Scenic routes, trained guides, and safety standards. Minimum age 10 years. Duration: 2-3 hours.',
      },
      {
        title: 'Nandi Hills Sunrise Trek',
        location: 'Bangalore, Karnataka',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        price: 899,
        description: 'Witness breathtaking sunrise views from Nandi Hills. Guided trek with refreshments.',
        fullDescription: 'Start your day with a magical sunrise trek to Nandi Hills. Experience stunning panoramic views as the sun rises over the hills. Includes guided trek, refreshments, and photography opportunities.',
        about: 'Easy to moderate difficulty level. Suitable for beginners. Duration: 4-5 hours including travel.',
      },
      {
        title: 'Coorg Coffee Plantation Tour',
        location: 'Coorg, Karnataka',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
        price: 1299,
        description: 'Explore lush coffee plantations. Learn about coffee cultivation and processing.',
        fullDescription: 'Walk through aromatic coffee plantations and learn about the entire coffee-making process from bean to cup. Includes coffee tasting, plantation walk, and local cuisine.',
        about: 'Family-friendly activity. Includes lunch and coffee tasting. Duration: 5-6 hours.',
      },
      {
        title: 'Kerala Backwater Kayaking',
        location: 'Alleppey, Kerala',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
        price: 1199,
        description: 'Paddle through serene backwaters. Explore village life and nature.',
        fullDescription: 'Discover the tranquil beauty of Kerala backwaters on a kayaking expedition. Navigate through narrow canals, witness local village life, and spot diverse bird species.',
        about: 'Suitable for all fitness levels. Duration: 3-4 hours. Morning and evening slots available.',
      },
      {
        title: 'Rishikesh River Rafting',
        location: 'Rishikesh, Uttarakhand',
        image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800',
        price: 1499,
        description: 'Thrilling white water rafting experience. Professional instructors and safety gear.',
        fullDescription: 'Experience the adrenaline rush of white water rafting in the holy Ganges. Professional rafting instructors, premium safety equipment, and stunning Himalayan views.',
        about: 'Moderate to difficult rapids. Minimum age 14 years. Duration: 2-3 hours in water.',
      },
      {
        title: 'Sundarbans Boat Safari',
        location: 'Sundarbans, West Bengal',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        price: 2499,
        description: 'Explore mangrove forests. Wildlife spotting including Royal Bengal Tigers.',
        fullDescription: 'Embark on an unforgettable journey through the worlds largest mangrove forest. Spot Royal Bengal Tigers, crocodiles, and diverse bird species on this guided boat safari.',
        about: 'Full day experience with meals. Wildlife sighting not guaranteed. Eco-friendly tour.',
      },
      {
        title: 'Bungee Jumping Adventure',
        location: 'Rishikesh, Uttarakhand',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
        price: 3500,
        description: 'Take the leap! Experience the ultimate adrenaline rush.',
        fullDescription: 'Jump from 83 meters into the stunning valley. Indias highest bungee jumping experience with international safety standards and certified jump masters.',
        about: 'Weight limit: 40-110 kg. Minimum age 12 years. Medical certificate required for age 45+.',
      },
      {
        title: 'Goa Scuba Diving',
        location: 'Grande Island, Goa',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
        price: 2999,
        description: 'Discover underwater world. Coral reefs and marine life exploration.',
        fullDescription: 'Dive into the crystal clear waters of Goa and explore vibrant coral reefs. No prior experience needed. Complete training and equipment provided by PADI certified instructors.',
        about: 'Beginners welcome. Duration: 4-5 hours including training. Underwater photography available.',
      },
    ];

    const createdExperiences = await Promise.all(
      experiences.map((exp) => prisma.experience.create({ data: exp }))
    );

    // Create slots
    const dates = ['Nov 1', 'Nov 2', 'Nov 3', 'Nov 4', 'Nov 5', 'Nov 6', 'Nov 7'];
    const times = ['07:00 AM', '09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];
    
    let slotCount = 0;
    for (const experience of createdExperiences) {
      for (const date of dates) {
        for (const time of times) {
          await prisma.slot.create({
            data: {
              experienceId: experience.id,
              date,
              time,
              totalSpots: 10,
              availableSpots: Math.floor(Math.random() * 8) + 2,
            },
          });
          slotCount++;
        }
      }
    }

    // Create promo codes
    const promoCodes = [
      { code: 'SAVE10', discount: 10, type: 'percentage', active: true },
      { code: 'FLAT100', discount: 100, type: 'fixed', active: true },
      { code: 'WELCOME20', discount: 20, type: 'percentage', active: true },
      { code: 'ADVENTURE50', discount: 50, type: 'fixed', active: true },
    ];

    await Promise.all(
      promoCodes.map((promo) => prisma.promoCode.create({ data: promo }))
    );

    await prisma.$disconnect();
    
    res.json({ 
      success: true, 
      message: 'Database seeded successfully!',
      data: {
        experiences: createdExperiences.length,
        slots: slotCount,
        promoCodes: promoCodes.length
      }
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});

export default app;
