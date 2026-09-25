export type BookRow = {
  id: string;
  slug: string;
  title: string;
  quote: string;
  description: string;
  price: number;
  price_note: string | null;
  cover_url: string;
  buy_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CourseRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  start_date: string | null;
  is_active: boolean;
  created_at: string;
};

export type CourseInterestInsert = {
  course_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message?: string | null;
};

export type ContactSubmissionInsert = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  message: string;
  source?: string;
};

export type Database = {
  public: {
    Tables: {
      books: {
        Row: BookRow;
        Insert: Omit<BookRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<BookRow>;
        Relationships: [];
      };
      courses: {
        Row: CourseRow;
        Insert: Omit<CourseRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<CourseRow>;
        Relationships: [];
      };
      course_interests: {
        Row: CourseInterestInsert & { id: string; created_at: string };
        Insert: CourseInterestInsert;
        Update: Partial<CourseInterestInsert>;
        Relationships: [];
      };
      contact_submissions: {
        Row: ContactSubmissionInsert & { id: string; created_at: string };
        Insert: ContactSubmissionInsert;
        Update: Partial<ContactSubmissionInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
