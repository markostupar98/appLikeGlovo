import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";


// Get all products
export const useCategoryList = () => {
    return useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        const { data, error } = await supabase.from("categories").select("*");
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };
  