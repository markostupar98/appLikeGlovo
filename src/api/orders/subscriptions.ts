import { supabase } from "@/lib/supabase";
import {  useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = useQueryClient();

export const useOrderSubscription = () => {
  // Subscribe to changes
  useEffect(() => {
    const orderdSubscription = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          console.log("Change received!", payload);
          queryClient.invalidateQueries(["orders"]);
        }
      )
      .subscribe();
    return () => {
      orderdSubscription.unsubscribe();
    };
  }, []);
};

// Changes for updating order
export const useUpdateOrderSubscription = (id: number) => {
  useEffect(() => {
    const orders = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          queryClient.invalidateQueries(["orders", id]);
        }
      )
      .subscribe();

    return () => {
      orders.unsubscribe();
    };
  }, []);
};
