export interface IProject {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  url: string | null;
  position: number | null;
  coverImage?: string | null;
  files: string[] | null;
  createdAt: string;
  updatedAt: string;
}