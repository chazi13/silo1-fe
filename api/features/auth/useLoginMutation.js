import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../lib/axios";

export const login = (body) =>
  axios.post(`/login`, body).then((res) => res.data);

export const useLoginMutation = (options) => {
  const queryClient = useQueryClient();

  const mutationOptions = {
    mutationKey: ["login"],
    onSettled: () => {
      queryClient.invalidateQueries(["user"]);
    },
    ...options,
  };

  return useMutation(
    ["login"],
    (variables) => login(variables),
    mutationOptions
  );
};
