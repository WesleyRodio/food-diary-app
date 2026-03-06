import { MEAL_TYPES } from "@/app/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import useDate from "@/helpers/useDate";

export default function RegisterMeal() {
  const { brFormat } = useDate();

  const curDate = brFormat().split("-")[1].split(":").slice(0, 2).join(":");

  return (
    <Dialog>
      <DialogTrigger className="text-foreground text-md bg-brand-1 flex-1 cursor-pointer rounded-xl bg-linear-[135deg,var(--color-brand-1),var(--color-brand-2)] py-3 font-medium shadow-md transition-all outline-none active:scale-98">
        + Refeição
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Nova refeição</DialogTitle>
        <DialogDescription>Cadastrar uma nova refeição</DialogDescription>
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
              {MEAL_TYPES.map((obj, i) => (
                <Button
                  key={i}
                  pointer
                  className="bg-background border-border flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs"
                >
                  {obj.icon}
                  <span>{obj.label}</span>
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-muted/80 text-xs font-bold">
              O QUE VOCÊ COMEU?
            </h1>
            <div className="flex flex-row flex-wrap gap-2">
              <Input
                type="text"
                placeholder="Ex: Feijão, arroz e salada"
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <div className="flex-1 space-y-1">
              <h1 className="text-muted/80 text-xs font-bold text-nowrap">
                PESO (g)
              </h1>
              <div className="flex flex-row flex-wrap gap-2">
                <Input
                  type="number"
                  min={0}
                  placeholder="350"
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <h1 className="text-muted/80 text-xs font-bold">CALORIAS</h1>
              <div className="flex flex-row flex-wrap gap-2">
                <Input
                  type="number"
                  min={0}
                  placeholder="480"
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <h1 className="text-muted/80 text-xs font-bold">HORÁRIO</h1>
              <div className="flex flex-row flex-wrap gap-2">
                <Input type="time" defaultValue={curDate} className="w-full" />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-muted/80 text-xs font-bold">
              NOTAS (opcional)
            </h1>
            <div className="flex flex-row flex-wrap gap-2">
              <Textarea
                className="w-full"
                placeholder="Como você se sentiu? Substituoções, observações"
              />
            </div>
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button pointer>Cancelar</Button>
          <Button
            pointer
            className="text-light flex-1 bg-linear-[135deg,var(--color-brand-1),var(--color-brand-2)]"
          >
            Adicionar refeição
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
