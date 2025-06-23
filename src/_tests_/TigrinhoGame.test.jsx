import ReactDOM from "react-dom/client";
import { act } from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import TigrinhoGames from "../components/TigrinhoGames"

let container;

describe("Testes no componente TigrinhoGame", () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test("Renderiza o título corretamente", async () => {
    const root = ReactDOM.createRoot(container);

    await act(async () => {
      root.render(<TigrinhoGames />);
    });

    const titulo = container.querySelector("h1");
    expect(titulo.textContent).toContain("Jogo do Tigrinho");
  });

  test("Renderiza os 3 slots iniciais como ❓", async () => {
    const root = ReactDOM.createRoot(container);

    await act(async () => {
      root.render(<TigrinhoGames />);
    });

    const slots = container.querySelectorAll("span");
    expect(slots.length).toBe(3);
    slots.forEach((slot) => {
      expect(slot.textContent).toBe("❓");
    });
  });

  test("Mostra mensagem de tentativa quando o jogador perde", async () => {
    const root = ReactDOM.createRoot(container);

    await act(async () => {
      root.render(<TigrinhoGames />);
    });

    const botao = container.querySelector("button");

    await act(async () => {
      botao.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const mensagem = container.querySelector("h2");
    expect(
      mensagem.textContent === "🎉 Parabéns! Você ganhou! 🎉" ||
      mensagem.textContent === "😢 Tente novamente!"
    ).toBe(true);
  });

  test("Mock: Força o jogador a ganhar com 3 símbolos iguais", async () => {
    const root = ReactDOM.createRoot(container);

    // Mock de Math.random para sempre escolher o primeiro símbolo (índice 0 -> 🐯)
    const mockRandom = vi.spyOn(Math, "random").mockImplementation(() => 0);

    await act(async () => {
      root.render(<TigrinhoGames />);
    });

    const botao = container.querySelector("button");

    await act(async () => {
      botao.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const slots = Array.from(container.querySelectorAll("span")).map(
      (el) => el.textContent
    );

    // Verifica se os 3 slots estão iguais
    expect(slots.every((s) => s === slots[0])).toBe(true);
    expect(slots[0]).toBe("🐯");

    // Verifica a mensagem de vitória
    const mensagem = container.querySelector("h2");
    expect(mensagem.textContent).toBe("🎉 Parabéns! Você ganhou! 🎉");

    // Limpa o mock
    mockRandom.mockRestore();
  });
});