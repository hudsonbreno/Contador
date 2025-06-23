import ReactDOM from "react-dom/client";
import { act } from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import Contador from "../components/Contador";

let container;

describe("Testes no componente Contador", () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test("Renderiza o valor inicial como 0", async () => {
    const root = ReactDOM.createRoot(container);

    await act(async () => {
      root.render(<Contador />);
    });

    const valor = container.querySelector("[data-testid='valor-contador']");
    expect(valor.textContent).toBe("Valor: 0");
  });

  test("Incrementa o contador ao clicar no botão", async () => {
    const root = ReactDOM.createRoot(container);

    await act(async () => {
      root.render(<Contador />);
    });

    const botaoIncrementar = Array.from(
      container.querySelectorAll("button")
    ).find((btn) => btn.textContent === "Incrementar");

    await act(async () => {
      botaoIncrementar.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });

    const valor = container.querySelector("[data-testid='valor-contador']");
    expect(valor.textContent).toBe("Valor: 1");
  });

  test("Incrementar o contador duas vezes ao clicar", async () => {
    const root = ReactDOM.createRoot(container);

    await act(async () => {
      root.render(<Contador />);
    });

    const botaoIncrementar = Array.from(
      container.querySelectorAll("button")
    ).find((btn) => btn.textContent === "Incrementar");

    await act(async () => {
      botaoIncrementar.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });

    await act(async () => {
      botaoIncrementar.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });

    const valor = container.querySelector("[data-testid='valor-contador']");
    expect(valor.textContent).toBe("Valor: 2");
  });

  test("Decrementar o contador ao clicar no botão", async () => {
    const root = ReactDOM.createRoot(container);

    await act(async () => {
      root.render(<Contador />);
    });

    const botaoDescrementar = Array.from(
      container.querySelectorAll("button")
    ).find((btn) => btn.textContent === "Decrementar");

    await act(async () => {
      botaoDescrementar.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });

    const valor = container.querySelector("[data-testid='valor-contador']");
    expect(valor.textContent).toBe("Valor: -1");
  });

  test("Reinica o valor do ", async () => {
    const root = ReactDOM.createRoot(container);

    await act(async () => {
      root.render(<Contador />);
    });

    const botaoIncrementar = Array.from(
      container.querySelectorAll("button")
    ).find((btn) => btn.textContent === "Incrementar");

    await act(async () => {
      botaoIncrementar.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });

    const botaoReinicia= Array.from(
      container.querySelectorAll("button")
    ).find((btn) => btn.textContent === "Resetar");

    await act( async () => {
      botaoReinicia.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    })

    const valor = container.querySelector("[data-testid='valor-contador']");
    expect(valor.textContent).toBe("Valor: 0");
  });
});
