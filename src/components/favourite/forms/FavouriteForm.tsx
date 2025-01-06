import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputText } from "../../formInputs/FormInputText";
import {
  CreateFavouriteField,
  createFavouriteSchema,
} from "../../../schemas/favourite.schema";
import { useAddFavourite } from "../../../queries/favourite.query";
import { useModalStore } from "../../../store/modal.store";
import { ModalWrapper } from "../../../modals/ModalWrapper";

export const FavouriteForm = () => {
  const closeModal = useModalStore((state) => state.closeModal);
  const { mutate: AddFavourite } = useAddFavourite();

  const { control, handleSubmit } = useForm<CreateFavouriteField>({
    resolver: zodResolver(createFavouriteSchema),
    defaultValues: { url: "", title: "", created_at: "jj" },
  });
  const onSubmit: SubmitHandler<CreateFavouriteField> = async (formData) => {
    AddFavourite(formData);
    closeModal();
  };

  return (
    <ModalWrapper handleSubmit={handleSubmit(onSubmit)} title="Add Shortcut">
      <>
        <div className="flex flex-col gap-12 mb-8 mt-6">
          <FormInputText
            control={control}
            name="url"
            label="Url"
            varient="outlined"
            required
          />
          <FormInputText
            control={control}
            name="title"
            label="Name"
            varient="outlined"
          />
        </div>
      </>
    </ModalWrapper>
  );
};
