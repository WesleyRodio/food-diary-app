"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { FaAppleWhole, FaFire, FaWeightHanging } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { MdDelete, MdEdit } from "react-icons/md";
import { RiPlantFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

import RegisterMeal from "@/components/features/modal-form-meal";
import RegisterWeight from "@/components/features/modal-register-weight";
import { Button } from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import GradientIcon from "@/components/ui/gradient-icon";
import Input from "@/components/ui/input";
import { setLocalStorage, useLocalStorage } from "@/helpers/useLocalStorage";
import { mealsTypes, type MealRegisterType, type MealType } from "@/types/meal";
import type { WeightType } from "@/types/weights";

const today = () => new Date().toISOString().slice(0, 10);
const fmtDate = (d: Date) => {
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const months = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];
  return `${days[d.getDay()]}, ${d.getDate()} de ${months[d.getMonth()]}`;
};

export default function Home() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const mainRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const localMeals = useLocalStorage("dn_meals");
  const localWeights = useLocalStorage("dn_weights");

  const [isEdit, setIsEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [dataEdit, setDataEdit] = useState<MealRegisterType | null>(null);

  const [meals, setMeals] = useState<MealType[]>(
    JSON.parse(localMeals || "[]"),
  );
  const [weights, setWeights] = useState<WeightType[]>(
    JSON.parse(localWeights || "[]"),
  );
  const [selDate, setSelDate] = useState(today());

  const handleScroll = useCallback(() => {
    const el = mainRef.current;
    if (!el) return;
    setScrolled(el.scrollTop > 100);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMeals(JSON.parse(localMeals || "[]"));
    }, 0);
  }, [localMeals]);

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

  const handleToggleDone = useCallback(
    (id: number) => {
      const meal = meals.find(obj => obj.id === id);
      if (meal) {
        meal.done = !meal.done;
        setLocalStorage("dn_meals", JSON.stringify(meals));
      }
    },
    [meals],
  );

  const submitNewMeal = useCallback(
    (data: MealRegisterType) => {
      const allMeals = meals;
      allMeals.push({
        ...data,
        id: Date.now(),
        date: selDate,
        done: false,
      });
      setMeals(allMeals);
      setLocalStorage("dn_meals", JSON.stringify(allMeals));
    },
    [meals, selDate],
  );

  const dayMeals = meals
    .filter(m => m.date === selDate)
    .sort((a, b) => a.time.localeCompare(b.time));
  const todayWeight = weights.filter(w => w.date === selDate).at(-1);
  const totalCal = dayMeals.reduce((s, m) => s + (m.done ? m.calories : 0), 0);
  const totalGrams = dayMeals.reduce((s, m) => s + (m.done ? m.weight : 0), 0);

  return (
    <>
      <RegisterMeal
        initial={dataEdit}
        edit={isEdit}
        open={showAdd}
        setOpen={setShowAdd}
        onSubmit={submitNewMeal}
      />
      <header
        className={twMerge(
          "bg-foreground shadow-shadow mb-2 flex flex-col rounded-b-4xl p-5 shadow transition-all duration-300",
          scrolled && "mb-0 h-0 overflow-hidden py-0",
          // ? "mb-0 max-h-0 py-0 opacity-0"
          // : "mb-2 max-h-95 opacity-100",
        )}
      >
        <div className="flex">
          <div className="flex flex-col">
            <span className="text-muted mb-2 text-sm font-semibold">
              {fmtDate(new Date(`${selDate}T12:00:00`)).toUpperCase()}
            </span>
            <h1 className="text-secondary text-lg font-bold">Meu diário</h1>
            <div className="mb-6 flex flex-row items-center gap-1">
              <h2 className="text-brand-1 text-2xl font-bold">Alimentar</h2>
              <GradientIcon
                id="logo"
                color1="var(--color-brand-2)"
                color2="var(--color-brand-3)"
                Icon={RiPlantFill}
              />
            </div>
          </div>
          <Input type="date" className="mb-auto ml-auto" />
        </div>
        <div className="flex gap-2">
          <Button className="text-brand-1 border-brand-1 bg-brand-1/20 cursor-pointer rounded-4xl border px-6 py-2 text-sm font-medium">
            📋 Hoje
          </Button>
          <Button className="text-secondary border-secondary/30 cursor-pointer rounded-4xl border bg-transparent px-6 py-2 text-sm font-medium">
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
          <section className="mb-2 flex flex-row">
            <div className="border-border shadow-shadow bg-foreground flex flex-1 flex-col rounded-xl border p-4 shadow transition-all">
              <div className="text-2xl">
                <GradientIcon
                  id="meal"
                  color1="var(--color-gray-300)"
                  color2="var(--color-zinc-400)"
                  Icon={GiMeal}
                />
              </div>
              <span className="text-primary text-xl font-semibold">
                {dayMeals.length}
              </span>
              <span className="text-muted text-xs font-semibold">
                refeições
              </span>
              <span className="text-muted text-[0.55rem] font-semibold">
                {dayMeals.filter(m => m.done).length} feitas
              </span>
            </div>
            <div
              className={twMerge(
                "border-border shadow-shadow bg-foreground ml-2 flex flex-col overflow-hidden rounded-xl border p-4 shadow transition-all",
                !totalCal
                  ? "animate-out fade-out-0 zoom-out-95 m-0 w-0 scale-0 border-0 p-0 shadow-none"
                  : "animate-in fade-in-0 zoom-in-95 flex-1",
              )}
            >
              <div className="text-2xl">
                <GradientIcon
                  id="kcal"
                  color1="var(--color-orange-300)"
                  color2="var(--color-red-400)"
                  Icon={FaFire}
                />
              </div>
              <span className="text-primary text-xl font-semibold">
                {totalCal}
              </span>
              <span className="text-muted text-xs font-semibold">kcal</span>
              <span className="text-muted text-[0.55rem] font-semibold">
                hoje
              </span>
            </div>
            <div
              className={twMerge(
                "border-border shadow-shadow bg-foreground ml-2 flex flex-col overflow-hidden rounded-xl border p-4 shadow transition-all",
                !totalGrams
                  ? "animate-out fade-out-0 zoom-out-95 m-0 w-0 scale-0 border-0 p-0 shadow-none"
                  : "animate-in fade-in-0 zoom-in-95 flex-1",
              )}
            >
              <div className="text-2xl">
                <GradientIcon
                  id="consumed"
                  color1="var(--color-brand-1)"
                  color2="var(--color-brand-2)"
                  Icon={FaAppleWhole}
                />
              </div>
              <span className="text-primary text-xl font-semibold">
                {totalGrams}g
              </span>
              <span className="text-muted text-xs font-semibold">
                consumido
              </span>
              <span className="text-muted text-[0.55rem] font-semibold">
                total
              </span>
            </div>
            {todayWeight && (
              <div className="border-border shadow-shadow bg-foreground flex flex-1 flex-col rounded-xl border p-4 shadow">
                <div className="text-2xl">
                  <GradientIcon
                    id="weight"
                    color1="var(--color-zinc-600)"
                    color2="var(--color-zinc-800)"
                    Icon={FaWeightHanging}
                  />
                </div>
                <span className="text-primary text-xl font-semibold">
                  {todayWeight.weight}kg
                </span>
                <span className="text-muted text-xs font-semibold">
                  consumido
                </span>
                <span className="text-muted text-[0.55rem] font-semibold">
                  total
                </span>
              </div>
            )}
          </section>
          <section className="flex flex-row gap-2">
            <Button className="text-foreground text-md bg-brand-1 flex-1 cursor-pointer rounded-xl bg-linear-[135deg,var(--color-brand-1),var(--color-brand-2)] py-3 font-medium shadow-md transition-all outline-none active:scale-98">
              + Refeição
            </Button>
            <RegisterWeight />
          </section>
        </section>
        <section className="flex flex-col gap-4 px-2 pb-2">
          <div className="no-scrollbar flex h-full flex-col gap-2">
            {meals.length ? (
              <>
                <h5 className="text-brand-1/80 text-xs font-semibold">
                  REFEIÇÕES DO DIA
                </h5>
                {meals.map((obj, i) => {
                  const mealType = mealsTypes.find(
                    types => types.typeId === obj.typeId,
                  );

                  return (
                    <div
                      key={i}
                      className={twMerge(
                        "bg-foreground animate-in fade-in-0 zoom-in-95 border-brand-2 flex flex-1 flex-col items-start rounded-xl border p-4 transition-all",
                        obj.done && "bg-brand-3/80",
                      )}
                    >
                      <div className="flex w-full flex-row items-center gap-2">
                        <Checkbox
                          onClick={() => handleToggleDone(obj.id)}
                          defaultChecked={obj.done}
                          className="bg-brand-3 size-6 rounded-full"
                        />
                        <span
                          className={twMerge(
                            "mx-2 text-xl",
                            obj.done && "opacity-60",
                          )}
                        >
                          {mealType?.icon}
                        </span>
                        <div className="flex flex-col gap-0.5 overflow-hidden">
                          <div className="flex flex-row flex-wrap items-center gap-2">
                            <p
                              className={twMerge(
                                "text-md text-secondary truncate font-medium",
                                obj.done && "text-primary/60 line-through",
                              )}
                            >
                              {obj.food}
                            </p>
                            {!!obj.weight && (
                              <div className="bg-brand-3/50 text-brand-1/80 rounded-full px-1.5 py-0.5 text-xs transition-all">
                                {`${obj.weight}g`}
                              </div>
                            )}
                            {!!obj.calories && (
                              <div className="rounded-full bg-amber-300/20 px-1.5 py-0.5 text-xs text-amber-500">
                                {`${obj.calories} kcal`}
                              </div>
                            )}
                          </div>
                          <p
                            className={twMerge(
                              "text-muted text-xs",
                              obj.done && "text-primary/40",
                            )}
                          >
                            {mealType?.label} - {obj.time}
                          </p>
                        </div>
                        <div className="text-secondary ml-auto flex flex-row gap-1 opacity-80">
                          {!!obj.note.length && (
                            <button
                              onClick={() => handleToggleOpenMeal(obj.id)}
                              className="cursor-pointer p-1"
                            >
                              <CgNotes className="size-5" />
                            </button>
                          )}
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
              </>
            ) : (
              <div className="mx-auto mt-12 flex flex-col items-center gap-4">
                <span className="text-5xl">🌱</span>
                <div className="flex flex-col items-center">
                  <span className="text-secondary font-medium">
                    Nenhuma refeição ainda
                  </span>
                  <span className="text-muted text-xs font-medium">
                    Registre o que você comeu hoje!
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
