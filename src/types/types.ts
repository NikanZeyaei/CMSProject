export interface post {
  id: number;
  title: string;
  description: string;
  content: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
  tags: string[] | null;
}

export interface tag {
  id: number;
  title: string;
  created_at: number;
}
