"use client";

import { Button } from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCallback, useRef, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdDelete, MdEdit } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export default function Home() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const mainRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const el = mainRef.current;
    if (!el) return;
    setScrolled(el.scrollTop > 100);
  }, []);

  const handleToggleOpenMeal = useCallback((id: number) => {
    setOpen(prev => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        newSet.delete(id);
        return newSet;
      }

      newSet.add(id);
      return newSet;
    });
  }, []);

  const MEAL_TYPES = [
    { typeId: 1, label: "Café da manhã", icon: "☀️" },
    { typeId: 2, label: "Lanche manhã", icon: "🍎" },
    { typeId: 3, label: "Almoço", icon: "🥗" },
    { typeId: 4, label: "Lanche tarde", icon: "🫐" },
    { typeId: 5, label: "Jantar", icon: "🌙" },
    { typeId: 6, label: "Ceia", icon: "🌿" },
  ];

  const meals = [
    {
      id: 1,
      typeId: 2,
      food: "1/5 Maçãafskjsd osdjfldsj slkjdsfokjfl js kdflsjf s",
      weight: 150,
      calories: 10,
      note: "Maçanzinhas hehe",
      time: "10:00",
      done: false,
    },
  ];

  return (
    <>
      <header
        className={twMerge(
          "bg-foreground shadow-shadow mb-2 flex h-48.5 flex-col rounded-b-4xl p-5 shadow transition-all duration-300",
          scrolled && "mb-0 h-0 overflow-hidden py-0",
          // ? "mb-0 max-h-0 py-0 opacity-0"
          // : "mb-2 max-h-95 opacity-100",
        )}
      >
        <span className="text-muted mb-2 font-semibold">QUA, 4 DE MAR</span>
        <h1 className="text-secondary text-2xl font-bold">Meu diário</h1>
        <h2 className="text-brand-1 mb-6 text-xl font-bold">Alimentar 🌿</h2>
        <div className="flex gap-2">
          <Button className="text-brand-1 border-brand-1 bg-brand-1/20 cursor-pointer rounded-4xl border px-6 py-2 text-sm font-medium">
            📋 Hoje
          </Button>
          <Button className="text-secondary bg-background border-border cursor-pointer rounded-4xl border px-6 py-2 text-sm font-medium">
            📅 Histórico
          </Button>
        </div>
      </header>
      <main
        ref={mainRef}
        onScroll={handleScroll}
        className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-auto"
      >
        <section
          className={twMerge(
            "sticky top-0 z-10 mb-6 rounded-b-2xl px-2 transition-all duration-300 sm:rounded-2xl",
            scrolled && "bg-foreground p-2",
          )}
        >
          <section className="mb-2 flex flex-row gap-2">
            <div className="border-border shadow-shadow bg-foreground flex flex-1 flex-col rounded-xl border p-4 shadow">
              <div className="text-2xl">🍽️</div>
              <span className="text-primary text-xl font-semibold">3</span>
              <span className="text-muted text-xs font-semibold">
                refeições
              </span>
              <span className="text-muted text-[0.55rem] font-semibold">
                4 feitas
              </span>
            </div>
            <div className="border-border shadow-shadow bg-foreground flex flex-1 flex-col rounded-xl border p-4 shadow">
              <div className="text-2xl">🔥</div>
              <span className="text-primary text-xl font-semibold">400</span>
              <span className="text-muted text-xs font-semibold">kcal</span>
              <span className="text-muted text-[0.55rem] font-semibold">
                hoje
              </span>
            </div>
            <div className="border-border shadow-shadow bg-foreground flex flex-1 flex-col rounded-xl border p-4 shadow">
              <div className="text-2xl">🥦</div>
              <span className="text-primary text-xl font-semibold">485g</span>
              <span className="text-muted text-xs font-semibold">
                consumido
              </span>
              <span className="text-muted text-[0.55rem] font-semibold">
                total
              </span>
            </div>
          </section>
          <section className="flex flex-row gap-2">
            <button className="text-foreground shadow-shadow from-brand-1 to-brand-2 text-md flex-1 cursor-pointer rounded-xl bg-linear-to-br py-3 font-medium shadow">
              + Refeição
            </button>
            <button className="border-border text-primary shadow-shadow text-md bg-foreground flex-1 cursor-pointer rounded-xl border py-3 shadow">
              ⚖️ Peso
            </button>
          </section>
        </section>
        <section className="flex flex-col gap-4 px-2 pb-2">
          <h5 className="text-brand-1/80 text-xs font-semibold">
            REFEIÇÕES DO DIA
          </h5>
          <div className="no-scrollbar flex h-full flex-col gap-2">
            {meals.map((obj, i) => {
              const mealType = MEAL_TYPES.find(
                types => types.typeId === obj.typeId,
              );

              return (
                <div
                  key={i}
                  className="bg-foreground border-brand-2 flex flex-1 flex-col items-start rounded-xl border p-4"
                >
                  <div className="flex w-full flex-row items-center gap-2">
                    <Checkbox className="bg-brand-3 size-6 rounded-full" />
                    <span className="mx-2 text-xl">{mealType?.icon}</span>
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                      <div className="flex flex-row flex-wrap items-center gap-2">
                        <p className="text-md text-secondary truncate font-medium">
                          {obj.food}
                        </p>
                        <div className="bg-brand-3/50 text-brand-1/80 rounded-full px-1.5 py-0.5 text-xs">
                          {`${obj.weight}g`}
                        </div>
                      </div>
                      <p className="text-muted text-xs">
                        {mealType?.label} - {obj.time}
                      </p>
                    </div>
                    <div className="text-secondary ml-auto flex flex-row gap-1 opacity-80">
                      <button
                        onClick={() => handleToggleOpenMeal(obj.id)}
                        className="cursor-pointer p-1"
                      >
                        <CgNotes className="size-5" />
                      </button>
                      <button className="cursor-pointer p-1">
                        <MdEdit className="size-5" />
                      </button>
                      <button className="cursor-pointer p-1 text-red-400">
                        <MdDelete className="size-5" />
                      </button>
                    </div>
                  </div>
                  <div
                    className={twMerge(
                      "border-border text-secondary/80 mt-2 ml-10 overflow-hidden rounded-l-md border-l-2 py-1 pl-2 text-sm transition-all duration-300",
                      !open.has(obj.id) && "mt-0 h-0 py-0 opacity-0",
                    )}
                  >
                    {obj.note}
                  </div>
                </div>
              );
            })}
          </div>
          <Dialog defaultOpen>
            <DialogTrigger>Abrir</DialogTrigger>
            <DialogContent>
              <DialogTitle>Nova refeição</DialogTitle>
              <DialogDescription>Cadastrar uma nova refeição</DialogDescription>
              <div className="space-y-1">
                <h1 className="text-secondary text-xs font-bold">TIPO</h1>
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
                      className="bg-background border-border flex items-center rounded-full border px-3 py-1.5 text-xs"
                    >
                      <span>
                        {obj.icon} {obj.label}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </section>
      </main>
    </>
  );
}
