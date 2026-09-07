export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category: string | null;
          price: number | null;
          sizes: string[] | null;
          colors: string[] | null;
          description: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
          ref: string | null;
          short: string | null;
          material: string | null;
          care: string | null;
          is_new: boolean;
          featured: boolean;
          images: Json | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          category?: string | null;
          price?: number | null;
          sizes?: string[] | null;
          colors?: string[] | null;
          description?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
          ref?: string | null;
          short?: string | null;
          material?: string | null;
          care?: string | null;
          is_new?: boolean;
          featured?: boolean;
          images?: Json | null;
        };
        Update: Partial<{
          id: string;
          name: string;
          slug: string;
          category: string | null;
          price: number | null;
          sizes: string[] | null;
          colors: string[] | null;
          description: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
          ref: string | null;
          short: string | null;
          material: string | null;
          care: string | null;
          is_new: boolean;
          featured: boolean;
          images: Json | null;
        }>;
        Relationships: [];
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          storage_path: string;
          position: number;
          is_cover: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          storage_path: string;
          position?: number;
          is_cover?: boolean;
          created_at?: string;
        };
        Update: Partial<{
          id: string;
          product_id: string;
          storage_path: string;
          position: number;
          is_cover: boolean;
          created_at: string;
        }>;
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      product_videos: {
        Row: {
          id: string;
          product_id: string;
          storage_path: string;
          type: string;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          storage_path: string;
          type?: string;
          position?: number;
          created_at?: string;
        };
        Update: Partial<{
          id: string;
          product_id: string;
          storage_path: string;
          type: string;
          position: number;
          created_at: string;
        }>;
        Relationships: [
          {
            foreignKeyName: "product_videos_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
