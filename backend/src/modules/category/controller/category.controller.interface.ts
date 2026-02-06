import type { Request, Response } from "express";

export interface ICategoryController {
  createCategory(req: Request, res: Response): Promise<void>;
  editCategory(req: Request, res: Response): Promise<void>;
  getCategoryById(req: Request, res: Response): Promise<void>;
  getAllParentCategoryForAdmin(req: Request, res: Response): Promise<void>;
  getAllSubCategoryForAdminById(req: Request, res: Response): Promise<void>;
  blockCategory(req: Request, res: Response): Promise<void>;
  unblockCategory(req: Request, res: Response): Promise<void>;
  getParentCategories(req: Request, res: Response): Promise<void>;
  getSubCategories(req: Request, res: Response): Promise<void>;
  getAllSubCategoryForAdmin(req: Request, res: Response): Promise<void>;
  getAllSubCategoryForUser(req: Request, res: Response): Promise<void>;
}