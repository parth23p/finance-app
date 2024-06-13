import { Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle } from "@/components/ui/sheet";
import { insertCategorySchema } from "@/db/schema";
import {z} from "zod";
import { Loader2 } from "lucide-react";
import { useConfirm } from "../../../app/hooks/use-confirm";
import { CategoryForm } from "./category-form";
import { useCreateCategory } from "../api/use-create-category";
import { useOpenCategory } from "../hooks/use-open-category";
import { useGetCategories } from "../api/use-get-categories";
import { useGetCategory } from "../api/use-get-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { useEditCategory } from "../api/use-edit-category";

const formSchema=insertCategorySchema.pick({
    name:true,
});

type FormValues=z.input<typeof formSchema>

export const EditCategorySheet=()=>{
    
    const {isOpen,onClose,id}=useOpenCategory();
    const[ConfirmDialog,confirm] =useConfirm(
        "Are you sure?",
        "You are about to delete this category."
    );
    const categoriesQuery=useGetCategory(id);
    const editMutation=useEditCategory(id);
    const deleteMutation=useDeleteCategory(id);
    const mutation=useCreateCategory();
    const isPending=editMutation.isPending || deleteMutation.isPending;
    const isLoading=categoriesQuery.isLoading;
    const onSubmit=(values:FormValues)=>{
       editMutation.mutate(values,{
        onSuccess:()=> {
            onClose();
        },
       });
    }

    const onDelete=async()=>{
        const ok=await confirm();

        if(ok){
            deleteMutation.mutate(undefined,{
                onSuccess:()=>{
                    onClose();
                }
            });
        };
    }
    const defaultValues=categoriesQuery.data?{
        name:categoriesQuery.data.name
    }:{
        name:""
    }
    return (
       <>
       <ConfirmDialog />
         <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Edit Account
                    </SheetTitle>
                    <SheetDescription>
                        Edit an existing account
                    </SheetDescription>
                </SheetHeader>
                {isLoading?
                    (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className=" size-4 text-muted-foreground animate-spin" />
                        </div>
                    ):
                    (
                        <CategoryForm id={id} onSubmit={onSubmit} defaultValues={defaultValues} disabled={mutation.isPending}  onDelete={onDelete} />
                    )
                }
                
            </SheetContent>
        </Sheet>
       </>
    )
}

