export interface CategoryProps {
  id: string | null;
  name: string;
  description: string;
  parentId: string | null;   // ObjectId as string in domain
  isActive?: boolean;
}