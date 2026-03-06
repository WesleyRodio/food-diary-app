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

export default function RegisterWeight() {
  return (
    <Dialog>
      <DialogTrigger className="bg-foreground shadow-shadow focus-visible:ring-brand-3 border-border hover:bg-foreground/50 text-muted flex-1 cursor-pointer rounded-xl border px-2 py-3 text-sm font-semibold shadow ring-2 ring-transparent outline-0 transition-all duration-300 active:scale-96">
        ⚖️ Peso
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Registrar peso</DialogTitle>
        <DialogDescription>
          Registre quanto você está pesando hoje
        </DialogDescription>
        <div className="space-y-3">
          <div className="flex-1 space-y-1">
            <h1 className="text-muted/80 text-xs font-bold text-nowrap">
              PESO (kg)
            </h1>
            <div className="flex flex-row flex-wrap gap-2">
              <Input
                type="tel"
                inputMode="numeric"
                min={0}
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
              />
            </div>
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button
            pointer
            className="text-light flex-1 bg-linear-[135deg,var(--color-brand-1),var(--color-brand-2)]"
          >
            Registrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
