"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { DrawerState } from "../types";

function isInitiallyOpen(state: DrawerState) {
  return state.defaultOpen ?? state.previewState === "open";
}

function getClosedTranslate(side: DrawerState["side"]): string {
  if (side === "left") return "translateX(-100%)";
  if (side === "right") return "translateX(100%)";
  if (side === "top") return "translateY(-100%)";
  return "translateY(100%)";
}

function panelStyle(state: DrawerState, open: boolean): CSSProperties {
  const horizontal = state.side === "left" || state.side === "right";
  return {
    position: "fixed",
    top: state.side === "bottom" ? "auto" : 16,
    right: state.side === "left" ? "auto" : 16,
    bottom: state.side === "top" ? "auto" : 16,
    left: state.side === "right" ? "auto" : 16,
    width: horizontal ? state.width : "calc(100% - 32px)",
    maxWidth: "calc(100vw - 32px)",
    height: horizontal ? "calc(100% - 32px)" : state.height,
    minHeight: horizontal ? "calc(100% - 32px)" : state.height,
    padding: state.padding,
    display: "grid",
    alignContent: "start",
    gap: state.gap,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    opacity: state.disabled ? 0.55 : 1,
    transform: open ? "translate(0,0)" : getClosedTranslate(state.side),
    transition: state.motion ? "transform 320ms cubic-bezier(.32,.72,0,1)" : "none",
  };
}

export default function LivePreview({ state }: { state: DrawerState }) {
  const initialOpen = isInitiallyOpen(state);
  const [open, setOpen] = useState(initialOpen);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = `${state.id}-title`;
  const descriptionId = `${state.id}-description`;

  useEffect(() => setOpen(initialOpen), [initialOpen]);

  useEffect(() => {
    if (!open || !state.closeOnEscape) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, state.closeOnEscape]);

  const closeDrawer = () => {
    setOpen(false);
    if (state.focusReturn) requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] border p-6" style={{ borderColor: state.border, background: "linear-gradient(135deg, rgba(15,23,42,.92), rgba(30,41,59,.74))" }}>
      <button ref={triggerRef} type="button" disabled={state.disabled} onClick={() => setOpen(true)} className="rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg" style={{ background: state.accent, color: "#020617" }}>
        {state.triggerLabel || "Open drawer"}
      </button>
      <p className="mt-4 max-w-md text-sm" style={{ color: state.muted }}>Preview state: {open ? "open" : "closed"}. Escape close is {state.closeOnEscape ? "enabled" : "disabled"}; outside close is {state.closeOnOutside ? "enabled" : "disabled"}.</p>
      <div
        onMouseDown={(event) => {
          if (open && state.closeOnOutside && event.target === event.currentTarget) closeDrawer();
        }}
        className="absolute inset-0"
        style={{
          pointerEvents: open ? "auto" : "none",
          background: open && state.showOverlay ? "rgba(15, 23, 42, .58)" : "transparent",
          transition: state.motion ? "background 320ms ease" : "none",
        }}
      >
        <section
          role="dialog"
          aria-modal={state.modal}
          aria-label={state.ariaLabel}
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={state.tabIndex}
          style={panelStyle(state, open)}
        >
          <button type="button" aria-label="Close drawer" onClick={closeDrawer} className="rounded-full border px-3 py-1 text-xs font-semibold" style={{ justifySelf: "end", borderColor: state.border, color: state.foreground }}>
            Close
          </button>
          <h3 id={titleId} style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
          <p id={descriptionId} style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="rounded-xl px-4 py-2" style={{ background: state.accent, color: "#020617" }}>{state.label}</button>
            <button type="button" className="rounded-xl border px-4 py-2" style={{ borderColor: state.border }}>Cancel</button>
          </div>
          <p className="text-xs" style={{ color: state.muted }}>{state.helper} Focus trap is not implemented; focus return is {state.focusReturn ? "enabled" : "disabled"}.</p>
        </section>
      </div>
    </div>
  );
}
