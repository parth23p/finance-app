import {InferRequestType,InferResponseType} from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import client from "@/lib/hono";
import { toast } from "sonner";

type ResponseType=InferResponseType<typeof client.api.categories[":id"]["$delete"]>;
// type RequestType=InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"];

export const useDeleteCategory=(id?:string)=>{
   const queryClient =useQueryClient();
   const mutation=useMutation<
    ResponseType,
    Error
   >({
    mutationFn:async(json)=>{
        const response=await client.api.categories[":id"]["$delete"]({
           param:{id},
        })
        return await response.json();
    },
    onSuccess:()=>{
        toast.success("Category deleted")
        queryClient.invalidateQueries({queryKey:["categories",{id}]});
        queryClient.invalidateQueries({queryKey:["categories"]});
        queryClient.invalidateQueries({queryKey:["transactions"]});
        queryClient.invalidateQueries({queryKey:["summary"]});
    },
    onError:()=>{
        toast.error("Failed to delete a category");
    },
   });
   return mutation;
};