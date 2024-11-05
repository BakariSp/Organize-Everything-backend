import { Request, Response } from 'express';
import CardModel from '../models/Card';

// Get all cards
export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await CardModel.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cards', error });
  }
};

// Create a new card
export const createCard = async (req: Request, res: Response) => {
  try {
    const newCard = new CardModel(req.body);
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(500).json({ message: 'Error creating card', error });
  }
};

// Update an existing card
export const updateCard = async (req: Request, res: Response) => {
  try {
    const updatedCard = await CardModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: 'Error updating card', error });
  }
};

// Delete a card
export const deleteCard = async (req: Request, res: Response) => {
  try {
    const deletedCard = await CardModel.findByIdAndDelete(req.params.id);
    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting card', error });
  }
}; 