export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      client_logos: {
        Row: {
          active: boolean
          created_at: string
          display_order: number
          handle: string
          id: string
          logo_url: string
          name: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          display_order?: number
          handle: string
          id?: string
          logo_url?: string
          name: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          display_order?: number
          handle?: string
          id?: string
          logo_url?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          created_at: string
          display_order: number
          id: string
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          created_at?: string
          display_order?: number
          id?: string
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          display_order?: number
          id?: string
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      hero_section: {
        Row: {
          badge_text: string
          created_at: string
          heading_line_1: string
          heading_line_2: string
          id: string
          primary_cta_text: string
          secondary_cta_text: string
          subtitle: string
          updated_at: string
        }
        Insert: {
          badge_text?: string
          created_at?: string
          heading_line_1?: string
          heading_line_2?: string
          id?: string
          primary_cta_text?: string
          secondary_cta_text?: string
          subtitle?: string
          updated_at?: string
        }
        Update: {
          badge_text?: string
          created_at?: string
          heading_line_1?: string
          heading_line_2?: string
          id?: string
          primary_cta_text?: string
          secondary_cta_text?: string
          subtitle?: string
          updated_at?: string
        }
        Relationships: []
      }
      one_time_services: {
        Row: {
          active: boolean
          created_at: string
          description: string
          display_order: number
          highlight: boolean
          id: string
          name: string
          price_max: number
          price_min: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string
          display_order?: number
          highlight?: boolean
          id?: string
          name: string
          price_max: number
          price_min: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string
          display_order?: number
          highlight?: boolean
          id?: string
          name?: string
          price_max?: number
          price_min?: number
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          active: boolean
          category: string
          client: string
          created_at: string
          description: string
          display_order: number
          id: string
          thumbnail_url: string
          title: string
          updated_at: string
          video_url: string
          views: string
        }
        Insert: {
          active?: boolean
          category?: string
          client?: string
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          thumbnail_url?: string
          title: string
          updated_at?: string
          video_url?: string
          views?: string
        }
        Update: {
          active?: boolean
          category?: string
          client?: string
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          thumbnail_url?: string
          title?: string
          updated_at?: string
          video_url?: string
          views?: string
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          active: boolean
          created_at: string
          display_order: number
          duration: string
          features: string
          id: string
          name: string
          popular: boolean
          price_max: number
          price_min: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          display_order?: number
          duration?: string
          features?: string
          id?: string
          name: string
          popular?: boolean
          price_max: number
          price_min: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          display_order?: number
          duration?: string
          features?: string
          id?: string
          name?: string
          popular?: boolean
          price_max?: number
          price_min?: number
          updated_at?: string
        }
        Relationships: []
      }
      process_steps: {
        Row: {
          active: boolean
          created_at: string
          id: string
          step_description: string
          step_number: number
          step_title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          step_description: string
          step_number: number
          step_title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          step_description?: string
          step_number?: number
          step_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          active: boolean
          created_at: string
          description: string
          display_order: number
          features: string
          icon: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description: string
          display_order?: number
          features?: string
          icon?: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string
          display_order?: number
          features?: string
          icon?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      stats: {
        Row: {
          color: string
          created_at: string
          display_order: number
          icon: string
          id: string
          label: string
          suffix: string
          updated_at: string
          value: number
        }
        Insert: {
          color?: string
          created_at?: string
          display_order?: number
          icon?: string
          id?: string
          label: string
          suffix?: string
          updated_at?: string
          value: number
        }
        Update: {
          color?: string
          created_at?: string
          display_order?: number
          icon?: string
          id?: string
          label?: string
          suffix?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      team: {
        Row: {
          active: boolean
          bio: string
          created_at: string
          display_order: number
          id: string
          image_url: string
          name: string
          role: string
          socials: Json
          updated_at: string
        }
        Insert: {
          active?: boolean
          bio?: string
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          name: string
          role: string
          socials?: Json
          updated_at?: string
        }
        Update: {
          active?: boolean
          bio?: string
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          name?: string
          role?: string
          socials?: Json
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          company: string
          created_at: string
          featured: boolean
          id: string
          image_url: string
          name: string
          rating: number
          review: string
          role: string
          website_url: string | null
        }
        Insert: {
          company?: string
          created_at?: string
          featured?: boolean
          id?: string
          image_url?: string
          name: string
          rating: number
          review: string
          role: string
          website_url?: string | null
        }
        Update: {
          company?: string
          created_at?: string
          featured?: boolean
          id?: string
          image_url?: string
          name?: string
          rating?: number
          review?: string
          role?: string
          website_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
