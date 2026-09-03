"use client";

import { useEffect, useRef, useState } from "react";
import ContactForm from "./contact-form";

const stages = ["Discover", "Strategize", "Create", "Launch", "Analyze", "Optimize"];
const services = ["Brand identity", "Digital engineering", "Creative production", "Paid acquisition", "Search & trust", "AI automation"];
const industries = ["Real estate", "Restaurants", "Healthcare", "Education", "Fitness", "Interiors", "Fashion", "Hospitality", "E-commerce", "And more"];
const shapes = [
  { cells: [[1, 1, 1, 1]], color: "teal" },
  { cells: [[1, 1], [1, 1]], color: "green" },
  { cells: [[0, 1, 0], [1, 1, 1]], color: "aqua" },
  { cells: [[1, 0, 0], [1, 1, 1]], color: "deep" },
];
type Piece = { cells: number[][]; x: number; y: number; color: string };
type Game = { board: (string | null)[][]; piece: Piece; score: number; lines: number; over: boolean; won: boolean };
const columns = 10;
const rows = 16;
const blankBoard = () => Array.from({ length: rows }, () => Array<string | null>(columns).fill(null));
const randomPiece = (): Piece => { const shape = shapes[Math.floor(Math.random() * shapes.length)]; return { cells: shape.cells, color: shape.color, x: Math.floor((columns - shape.cells[0].length) / 2), y: 0 }; };

export default function Home() {
  const [activeStage, setActiveStage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [, redraw] = useState(0);
  const game = useRef<Game>({ board: blankBoard(), piece: randomPiece(), score: 0, lines: 0, over: false, won: false });
  const current = game.current;

  function canMove(piece: Piece, dx = 0, dy = 0, cells = piece.cells) {
    return !cells.some((line, y) => line.some((filled, x) => filled && (piece.x + x + dx < 0 || piece.x + x + dx >= columns || piece.y + y + dy >= rows || (piece.y + y + dy >= 0 && game.current.board[piece.y + y + dy][piece.x + x + dx] !== null))));
  }
  function rotate(cells: number[][]) { return cells[0].map((_, x) => cells.map((line) => line[x]).reverse()); }
  function fall() {
    const state = game.current;
    if (state.over || state.won) return;
    if (canMove(state.piece, 0, 1)) state.piece.y += 1;
    else {
      state.piece.cells.forEach((line, y) => line.forEach((filled, x) => { if (filled && state.piece.y + y >= 0) state.board[state.piece.y + y][state.piece.x + x] = state.piece.color; }));
      const open = state.board.filter((line) => line.some((cell) => cell === null));
      const cleared = rows - open.length;
      state.board = Array.from({ length: cleared }, () => Array<string | null>(columns).fill(null)).concat(open);
      state.lines += cleared;
      state.score += cleared * cleared * 100;
      if (state.lines >= 10) state.won = true;
      else { state.piece = randomPiece(); if (!canMove(state.piece)) state.over = true; }
    }
    redraw((value) => value + 1);
  }
  function move(direction: number) { const state = game.current; if (!state.over && !state.won && canMove(state.piece, direction)) { state.piece.x += direction; redraw((value) => value + 1); } }
  function spin() { const state = game.current; const cells = rotate(state.piece.cells); if (!state.over && !state.won && canMove(state.piece, 0, 0, cells)) { state.piece.cells = cells; redraw((value) => value + 1); } }
  function reset() { game.current = { board: blankBoard(), piece: randomPiece(), score: 0, lines: 0, over: false, won: false }; redraw((value) => value + 1); }
  useEffect(() => { const timer = window.setInterval(fall, 500); const keyHandler = (event: KeyboardEvent) => { if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"].includes(event.key)) event.preventDefault(); if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); if (event.key === "ArrowDown") fall(); if (event.key === "ArrowUp") spin(); }; window.addEventListener("keydown", keyHandler); return () => { window.clearInterval(timer); window.removeEventListener("keydown", keyHandler); }; });
  const visible = current.board.map((line) => [...line]);
  current.piece.cells.forEach((line, y) => line.forEach((filled, x) => { if (filled && current.piece.y + y >= 0 && current.piece.y + y < rows) visible[current.piece.y + y][current.piece.x + x] = `${current.piece.color} falling`; }));

  return <main>
    <header className="site-header"><a className="site-logo" href="#top" aria-label="Shinrai Connect home"><img src="/shinrai-logo.png" alt="Shinrai Connect" /><span>SHINRAI CONNECT<small>TRUST · STRATEGY · GROWTH</small></span></a><nav className={menuOpen ? "site-nav is-open" : "site-nav"}><a href="#process">Process</a><a href="/services">Services</a><a href="#why">Why us</a><a href="/contact">Contact</a><a href="/pricing">Pricing</a></nav><div className="header-actions"><a className="header-link" href="https://wa.me/916366850605">WhatsApp</a><a className="header-button" href="/contact">Book free session <span>↗</span></a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? "×" : "☰"}</button></div></header>
    <section className="agency-hero" id="top"><div className="hero-noise" /><div className="hero-copy"><p className="eyebrow">Data-driven growth marketing</p><h1>We don&apos;t just market brands.<br /><em>We grow them.</em></h1><p className="hero-description">Data-driven digital marketing that helps businesses attract more customers, generate qualified leads, and scale with confidence.</p><div className="hero-buttons"><a className="teal-button" href="#contact">Book your free strategy session <span>↗</span></a><a className="outline-button" href="https://wa.me/916366850605">Call / WhatsApp <span>↗</span></a></div><div className="outcomes"><span>More leads</span><span>More sales</span><span>Stronger brand</span><span>Sustainable growth</span></div></div><div className="growth-game"><div className="trace-top"><span>SHINRAI_TETRIS</span><span>SCORE {current.score} · LINES {current.lines}</span></div><div className="tetris-board" aria-label="Shinrai Tetris game">{visible.flatMap((line, y) => line.map((cell, x) => <div className={`tetris-cell ${cell || ""}`} key={`${y}-${x}`} />))}{current.won && <div className="game-over game-won"><img src="/shinrai-logo.png" alt="Shinrai Connect logo" /><strong>Growth unlocked.</strong><button onClick={reset}>Play again ↻</button></div>}{current.over && !current.won && <div className="game-over"><strong>Grid full.</strong><span>Keep building your run.</span><button onClick={reset}>Play again ↻</button></div>}</div><div className="tetris-controls"><button onClick={() => move(-1)} aria-label="Move left">←</button><button onClick={spin} aria-label="Rotate">↻</button><button onClick={() => move(1)} aria-label="Move right">→</button></div><div className="game-status">{current.won ? "The Shinrai mark appears when you clear 10 lines." : "Arrow keys or the controls: fill and clear the grid."}<button onClick={reset}>Reset <span>↺</span></button></div></div><div className="scroll-cue">SCROLL <span>↓</span></div></section>
    <section className="industry-strip" aria-label="Industries served"><div>{industries.concat(industries).map((industry, index) => <span key={`${industry}-${index}`}>✦ {industry}</span>)}</div></section>
    <section className="process-section" id="process"><div className="section-intro"><p className="eyebrow">Our process</p><h2>Six stages.<br /><em>One growth engine.</em></h2><p>A proven process backed by strategy, creativity, and data to deliver measurable results.</p></div><div className="process-list">{stages.map((stage, index) => <button className={activeStage === index ? "process-step active" : "process-step"} onClick={() => setActiveStage(index)} key={stage}><span>0{index + 1}</span><strong>{stage}</strong><p>Strategy, creativity, and data moving together toward your next result.</p><b>↗</b></button>)}</div></section>
    <section className="services-section" id="services"><div className="section-intro light"><p className="eyebrow">Our services</p><h2>Full-suite marketing<br /><em>&amp; creative services.</em></h2><p>Creative engineering, paid acquisition, and AI automation built to scale businesses predictably.</p></div><div className="service-grid">{services.map((service, index) => <article key={service}><span>0{index + 1}</span><div><h3>{service}</h3><p>Focused systems that turn attention into measurable growth.</p></div><b>↗</b></article>)}</div></section>
    <section className="why-section" id="why"><div className="why-mark">SC</div><div className="section-intro"><p className="eyebrow">Why Shinrai</p><h2>Strategy with<br /><em>skin in the game.</em></h2></div><div className="why-points"><article><strong>01</strong><h3>Built around your goals</h3><p>No templates or vanity metrics. Every move begins with what growth means for your business.</p></article><article><strong>02</strong><h3>Creative meets numbers</h3><p>Strong ideas earn attention. Clear reporting proves what it does for your bottom line.</p></article><article><strong>03</strong><h3>A partner, not a vendor</h3><p>We stay close, communicate clearly, and keep improving the engine.</p></article></div></section>
    <section className="contact-section" id="contact"><p className="eyebrow">Let&apos;s connect. Let&apos;s grow.</p><h2>Ready to build<br /><em>what&apos;s next?</em></h2><p>Every plan starts with a free strategy session. Tell us where you want to go.</p><a className="dark-button" href="mailto:shinraiconnect@gmail.com">Start the conversation <span>↗</span></a></section><footer className="site-footer"><a className="site-logo" href="#top"><img src="/shinrai-logo.png" alt="Shinrai Connect" /><span>SHINRAI CONNECT<small>TRUST · STRATEGY · GROWTH</small></span></a><span>6366850605 · shinraiconnect@gmail.com</span><span>© 2026 Shinrai Connect</span></footer>
  </main>;
}
