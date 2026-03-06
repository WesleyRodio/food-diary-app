export default function useDate() {
  function brFormat(): string {
    return new Date()
      .toLocaleDateString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(", ", "-");
  }

  return {
    brFormat,
  };
}
