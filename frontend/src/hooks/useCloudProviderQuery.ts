import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { ProviderService } from "../../services/provider";
import { QueryKeyConst } from "@/constant/query";

export const useQueryCloudProvider = (
  encodedStringBtoA: string,
  selectedProvider: string
) => {
  return useQuery({
    queryKey: [QueryKeyConst.GET_PROVIDER_DATA],
    queryFn: () =>
      ProviderService.getConnectionToProvider(
        encodedStringBtoA,
        selectedProvider
      ),
  });
};

// export const useMutationCloudProvider = (
//   encodedStringBtoA: string,
//   selectedProvider: string
// ) => {
//   return useMutation({
//     mutationFn: [QueryKeyConst.GET_PROVIDER_DATA],
//     queryFn: () =>
//       ProviderService.getConnectionToProvider(
//         encodedStringBtoA,
//         selectedProvider
//       ),
//   });
// };