import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      experienceId,
      slotId,
      fullName,
      email,
      quantity,
      promoCode,
      subtotal,
      discount,
      taxes,
      total,
    } = req.body;

    // Validate required fields
    if (!experienceId || !slotId || !fullName || !email || !quantity) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    // Check if slot exists and has availability
    const slot = await prisma.slot.findUnique({
      where: { id: slotId },
    });

    if (!slot) {
      return res.status(404).json({
        success: false,
        error: 'Slot not found',
      });
    }

    if (slot.availableSpots < quantity) {
      return res.status(400).json({
        success: false,
        error: 'Not enough available spots',
      });
    }

    // Generate reference ID
    const referenceId = `BK${uuidv4().substring(0, 8).toUpperCase()}`;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        experienceId,
        slotId,
        fullName,
        email,
        quantity,
        promoCode: promoCode || null,
        subtotal,
        discount: discount || 0,
        taxes,
        total,
        referenceId,
        status: 'confirmed',
      },
    });

    // Update slot availability
    await prisma.slot.update({
      where: { id: slotId },
      data: {
        availableSpots: slot.availableSpots - quantity,
      },
    });

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking created successfully',
    });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create booking',
    });
  }
};
