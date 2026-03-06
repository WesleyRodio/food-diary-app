import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import useLoader from "@/components/ui/loader";
import Textarea from "@/components/ui/textarea";
import useDate from "@/helpers/useDate";
import { mealsTypes, type MealRegisterType } from "@/types/meal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState, type ElementType } from "react";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

const mealSchema = z.object({
  food: z.string().min(1, "Campo obrigatório"),
  typeId: z.union([z.number(), z.undefined()]),
  weight: z.string().transform(val => Number(val)),
  calories: z.string().transform(val => Number(val)),
  time: z.string().min(1, "Campo obrigatório"),
  note: z.string(),
});
type MealFormInput = z.input<typeof mealSchema>;
type MealFormOutput = z.output<typeof mealSchema>;

type RegisterMealProps = {
  open: boolean;
  edit?: boolean;
  Btn?: ElementType;
  initial?: MealRegisterType | null;
  setOpen: (state: boolean) => void;
  onSubmit: (data: MealRegisterType) => void;
};

export default function RegisterMeal({
  open,
  edit,
  initial,
  setOpen,
  onSubmit,
}: RegisterMealProps) {
  const { brFormat } = useDate();
  const { setLoading } = useLoader();
  const curDate = brFormat().split("-")[1].split(":").slice(0, 2).join(":");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MealFormInput, unknown, MealFormOutput>({
    resolver: zodResolver(mealSchema),
  });

  console.log(errors);

  const [typeId, setTypeId] = useState<number>(initial?.typeId || 1);

  useEffect(() => {
    if (!open) {
      reset();
    }

    if (initial && edit) {
      for (const [key, value] of Object.entries(initial)) {
        if (key) {
          const formatValue = key === "typeId" ? Number(value) : String(value);
          setValue(key as keyof MealFormInput, formatValue);
        }
      }
    } else {
      reset();
    }
  }, [open, initial, edit, setValue, reset]);

  const onSubmitForm = useCallback(
    async (data: MealFormOutput) => {
      setLoading(true);
      await new Promise(resolve => {
        data.typeId = typeId;

        onSubmit({
          typeId: data.typeId,
          food: data.food.trim(),
          weight: data.weight,
          calories: data.calories,
          note: data.note.trim(),
          time: data.time,
        });

        setTimeout(() => {
          resolve(true);
        }, 500);
      });
      setLoading(false);
      setOpen(false);
    },
    [typeId, onSubmit, setLoading, setOpen],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>{edit ? "Editando" : "Nova"} refeição</DialogTitle>
        <DialogDescription>
          {edit
            ? "Editando uma refeição já cadastrada"
            : "Cadastrar uma nova refeição"}
        </DialogDescription>
        <form id="meal-form" onSubmit={handleSubmit(onSubmitForm)}>
          {edit && initial && (
            <div className="text-brand-1/80 border-brand-1/60 bg-brand-2/40 mb-4 flex flex-row items-center gap-2 rounded-xl border px-4 py-3 text-sm">
              <MdEdit className="text-xl" />
              <span>
                Editando <strong>{initial?.food}</strong>
              </span>
            </div>
          )}
          <div className="space-y-3">
            <div className="space-y-1">
              <h1 className="text-muted/80 text-xs font-bold">TIPO</h1>
              <div className="flex flex-row flex-wrap gap-2">
                {/* <Button
                    pointer
                    className="bg-brand-1/50! border-brand-1 text-secondary flex items-center rounded-full border px-3 py-1 text-xs"
                  >
                    <span>☀️ Café da manhã</span>
                  </Button> */}
                {mealsTypes.map(obj => (
                  <Button
                    key={obj.typeId}
                    pointer
                    type="button"
                    onClick={() => setTypeId(obj.typeId)}
                    className={twMerge(
                      "bg-background border-border flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs duration-initial",
                      typeId === obj.typeId &&
                        "bg-brand-1/50! border-brand-1 text-secondary",
                    )}
                  >
                    {obj.icon}
                    <span>{obj.label}</span>
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <div>
                <h1 className="text-muted/80 text-xs font-bold">
                  O QUE VOCÊ COMEU?
                </h1>
                {errors.food && (
                  <span className="text-xs text-red-400">
                    Este campo é obrigatório
                  </span>
                )}
              </div>
              <div className="flex flex-row flex-wrap gap-2">
                <Input
                  type="text"
                  placeholder="Ex: Feijão, arroz e salada"
                  {...register("food", { required: true })}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex flex-row flex-wrap items-end gap-2">
              <div className="flex-1 space-y-1">
                <h1 className="text-muted/80 text-xs font-bold text-nowrap">
                  PESO (g)
                </h1>
                <div className="flex flex-row flex-wrap gap-2">
                  <Input
                    type="tel"
                    inputMode="numeric"
                    min={0}
                    placeholder="350"
                    {...register("weight")}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <h1 className="text-muted/80 text-xs font-bold">CALORIAS</h1>
                <div className="flex flex-row flex-wrap gap-2">
                  <Input
                    type="tel"
                    inputMode="numeric"
                    min={0}
                    placeholder="480"
                    {...register("calories")}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <div>
                  <h1 className="text-muted/80 text-xs font-bold">HORÁRIO</h1>
                  {errors.time && (
                    <span className="text-xs text-red-400">
                      Campo obrigatório
                    </span>
                  )}
                </div>
                <div className="flex flex-row flex-wrap gap-2">
                  <Input
                    type="time"
                    defaultValue={curDate}
                    {...register("time", { required: true })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-muted/80 text-xs font-bold">
                NOTAS (opcional)
              </h1>
              <div className="flex flex-row flex-wrap gap-2">
                <Textarea
                  placeholder="Como você se sentiu? Substituoções, observações"
                  {...register("note")}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </form>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button pointer>Cancelar</Button>
          </DialogClose>
          <Button
            pointer
            type="submit"
            form="meal-form"
            className="text-light flex-1 bg-linear-[135deg,var(--color-brand-1),var(--color-brand-2)]"
          >
            {edit ? "Editar refeição" : "Adicionar refeição"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
