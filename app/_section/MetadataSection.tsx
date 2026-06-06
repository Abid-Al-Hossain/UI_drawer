"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Slider from "@/components/shared/input/Slider";
import type { DrawerState } from "../types";

type Props = { state: DrawerState; update: <K extends keyof DrawerState>(key: K, value: DrawerState[K]) => void };

export default function MetadataSection({ state, update }: Props) {
  return <SectionCard title="Metadata" subtitle="Metadata controls for native drawer generation."><Input label="id" value={state.id} onChange={(value) => update("id", value)} />
<Input label="aria-label" value={state.ariaLabel} onChange={(value) => update("ariaLabel", value)} />
<div className="rounded-2xl border p-3 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>Role is fixed to dialog; the export wires aria-modal, labelledby, and describedby from these fields.</div>
<Slider label="tabIndex" value={state.tabIndex} min={0} max={4} step={1} onChange={(value) => update("tabIndex", value)} /></SectionCard>;
}
