import { useAuth } from "@/app/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InsertTables } from "@/types";
// Create order


  export const useInsertOrderItems = () => {
    return useMutation({
      async mutationFn(items: InsertTables<'order_items'>[]) {
        const { error, data: newProduct } = await supabase
          .from('order_items')
          .insert(items)
          .select();
  
        if (error) {
          throw new Error(error.message);
        }
        return newProduct;
      },
    });
  };