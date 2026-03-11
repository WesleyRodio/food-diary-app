"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import useLoader from "@/components/ui/loader";
import type { WeightRegisterType } from "@/types/weights";

const weightSchema = z.object({
  weight: z
    .string()
    .min(1, "Este campo é obrigatório")
    .transform(val => Number(val.trim().replace(/\./g, "").replace(/,/g, "."))),
  note: z.string(),
});
type WeightFormInput = z.input<typeof weightSchema>;
type WeightFormOutput = z.output<typeof weightSchema>;

type DialogWeightProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  onSubmit: (data: WeightRegisterType) => void;
};

export default function DialogWeight({
  open,
  setOpen,
  onSubmit,
}: DialogWeightProps) {
  const { setLoading } = useLoader();
  const {
    register,
    handleSubmit,
    // reset,
    // setValue,
    // getValues,
    formState: { errors },
  } = useForm<WeightFormInput, unknown, WeightFormOutput>({
    resolver: zodResolver(weightSchema),
  });

  const onSubmitForm = useCallback(
    async (data: WeightFormOutput) => {
      setLoading(true);

      await new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });

      onSubmit({
        weight: data.weight,
        note: data.note,
      });

      setLoading(false);
      setOpen(false);
    },
    [onSubmit, setLoading, setOpen],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Registrar peso</DialogTitle>
        <DialogDescription>
          Registre quanto você está pesando hoje
        </DialogDescription>
        <form id="formWeight" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="space-y-3">
            <div className="flex-1 space-y-1">
              <h1 className="text-muted/80 text-xs font-bold text-nowrap">
                PESO (kg)
              </h1>
              {errors.weight && (
                <span className="text-xs text-red-400">
                  Este campo é obrigatório
                </span>
              )}
              <div className="flex flex-row flex-wrap gap-2">
                <Input
                  type="tel"
                  inputMode="numeric"
                  min={0}
                  {...register("weight", { required: true })}
                  placeholder="Ex: 72.5"
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-muted/80 text-xs font-bold">OBSERVAÇÕES</h1>
              <div className="flex flex-row flex-wrap gap-2">
                <Input
                  type="text"
                  placeholder="Ex: Em jejum, pela manhã"
                  className="w-full"
                  {...register("note")}
                />
              </div>
            </div>
          </div>
        </form>
        <DialogFooter className="mt-6">
          <Button
            pointer
            form="formWeight"
            className="text-light flex-1 bg-linear-[135deg,var(--color-brand-1),var(--color-brand-2)]"
          >
            Registrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
