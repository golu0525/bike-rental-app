import { Request, Response } from 'express';
import { AuthRequest } from '../auth/auth.types.js';
import { BikeService } from './bike.service.js';

const bikeService = new BikeService();

export const getBikes = async (req: Request, res: Response) => {
  const { location, type } = req.query;

  try {
    const bikes = await bikeService.getBikes(
      location as string | undefined,
      type as string | undefined
    );
    res.json(bikes);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching bikes' });
  }
};

export const addBike = async (req: AuthRequest, res: Response) => {
  const { model, type, hourly_rate, location, image_url } = req.body;

  try {
    const result = await bikeService.addBike(model, type, hourly_rate, location, image_url);
    res.status(201).json({ message: 'Bike added successfully', ...result });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error adding bike' });
  }
};

export const updateBike = async (req: AuthRequest, res: Response) => {
  const id = String(req.params.id);

  try {
    const result = await bikeService.updateBike(id, req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error updating bike' });
  }
};

export const deleteBike = async (req: AuthRequest, res: Response) => {
  const id = String(req.params.id);

  try {
    const result = await bikeService.deleteBike(id);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error deleting bike' });
  }
};
