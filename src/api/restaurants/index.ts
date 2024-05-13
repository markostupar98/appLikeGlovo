import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get all restaurants
export const useRestaurantList = () => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const { data, error } = await supabase.from("restaurants").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

// Get restaurant by ID
export const useRestaurantById = (id: number) => {
  return useQuery({
    queryKey: ["restaurants", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

// Creating restaurant
export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newRestaurant } = await supabase
        .from("restaurants")
        .insert({
          name: data.name,
          address: data.address,
          phone: data.phone,
        })
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return newRestaurant;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["restaurants"]);
    },
    onError(error) {
      console.log(error);
    },
  });
};

// Updating restaurant
export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: updatedRestaurant } = await supabase
        .from('restaurants')
        .update({
          name: data.name,
          address: data.address,
          phone: data.phone,
        })
        .eq('id', data.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedRestaurant;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries(['restaurants']);
      await queryClient.invalidateQueries(['restaurants', id]);
    },
  });
};

// Deleting restaurant
export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from('restaurants').delete().eq('id', id);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries(['restaurants']);
    },
  });
};
