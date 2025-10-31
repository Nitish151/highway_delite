import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: experiences,
    });
  } catch (error: any) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch experiences',
    });
  }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const experience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        error: 'Experience not found',
      });
    }

    const slots = await prisma.slot.findMany({
      where: { experienceId: id },
      orderBy: [
        { date: 'asc' },
        { time: 'asc' },
      ],
    });

    res.json({
      success: true,
      data: {
        experience,
        slots,
      },
    });
  } catch (error: any) {
    console.error('Error fetching experience:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch experience details',
    });
  }
};
