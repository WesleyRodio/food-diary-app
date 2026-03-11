const fruits: Array<{ food: string; calPerG: number }> = [
  { food: "Abacate", calPerG: 1.6 },
  { food: "Abacaxi", calPerG: 0.5 },
  { food: "Acerola", calPerG: 0.33 },
  { food: "Ameixa-vermelha", calPerG: 0.46 },
  { food: "Amora", calPerG: 0.43 },
  { food: "Banana", calPerG: 1.0 },
  { food: "Banana Maçã", calPerG: 0.87 },
  { food: "Banana Prata", calPerG: 0.98 },
  { food: "Carambola", calPerG: 0.31 },
  { food: "Caqui chocolate", calPerG: 0.7 },
  { food: "Goiaba", calPerG: 0.68 },
  { food: "Jabuticaba", calPerG: 0.58 },
  { food: "Kiwi", calPerG: 0.61 },
  { food: "Laranja", calPerG: 0.47 },
  { food: "Maçã", calPerG: 0.52 },
  { food: "Mamão Papaia", calPerG: 0.43 },
  { food: "Maracujá", calPerG: 0.68 },
  { food: "Melancia", calPerG: 0.3 },
  { food: "Melão", calPerG: 0.34 },
  { food: "Mexerica", calPerG: 0.53 },
  { food: "Morango", calPerG: 0.32 },
  { food: "Pera", calPerG: 0.57 },
  { food: "Pêssego", calPerG: 0.39 },
  { food: "Uva Itália", calPerG: 0.69 },
  { food: "Uva Rubi", calPerG: 0.69 },
];

export function calculateCal(food: string, weight: number) {
  if (!food || !weight) return false;

  const normalied = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const filterFruits = fruits.filter(f =>
    normalied(f.food.toLowerCase()).includes(normalied(food.toLowerCase())),
  );

  if (filterFruits) {
    const endFruits = filterFruits.map(f => {
      const calPerG = f.calPerG;
      const calc = Math.ceil(calPerG * weight);
      return {
        food: f.food,
        cal: calc,
      };
    });

    return endFruits;
  }

  return false;
}
