import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const validatePromoCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        error: 'Promo code is required',
      });
    }

    const promo = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!promo || !promo.active) {
      return res.status(404).json({
        success: false,
        error: 'Invalid or inactive promo code',
      });
    }

    res.json({
      success: true,
      data: {
        code: promo.code,
        discount: promo.discount,
        type: promo.type,
      },
    });
  } catch (error: any) {
    console.error('Error validating promo code:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to validate promo code',
    });
  }
};
