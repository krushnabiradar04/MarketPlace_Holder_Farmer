export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          role: 'farmer' | 'customer' | 'admin';
          full_name: string;
          avatar_url: string | null;
          phone: string | null;
          location: string | null;
          bio: string | null;
          is_available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: 'farmer' | 'customer' | 'admin';
          full_name: string;
          avatar_url?: string | null;
          phone?: string | null;
          location?: string | null;
          bio?: string | null;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: 'farmer' | 'customer' | 'admin';
          full_name?: string;
          avatar_url?: string | null;
          phone?: string | null;
          location?: string | null;
          bio?: string | null;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          farmer_id: string;
          name: string;
          description: string;
          category: string;
          price: number;
          unit: string;
          quantity_available: number;
          image_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          farmer_id: string;
          name: string;
          description: string;
          category: string;
          price: number;
          unit: string;
          quantity_available: number;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          farmer_id?: string;
          name?: string;
          description?: string;
          category?: string;
          price?: number;
          unit?: string;
          quantity_available?: number;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          customer_id: string;
          farmer_id: string;
          rating: number;
          comment: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          farmer_id: string;
          rating: number;
          comment: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          farmer_id?: string;
          rating?: number;
          comment?: string;
          created_at?: string;
        };
      };
    };
  };
}