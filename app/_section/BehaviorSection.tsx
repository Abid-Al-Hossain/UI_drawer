"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Switch from "@/components/shared/input/Switch";
import type { DrawerState } from "../types";

type Props = { state: DrawerState; update: <K extends keyof DrawerState>(key: K, value: DrawerState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return <SectionCard title="Behavior" subtitle="Behavior controls for native drawer generation."><Switch label="Close on Escape" checked={state.closeOnEscape} onChange={(value) => update("closeOnEscape", value)} />
<Switch label="Close outside" checked={state.closeOnOutside} onChange={(value) => update("closeOnOutside", value)} />
<Switch label="Default open" checked={state.defaultOpen ?? state.previewState === "open"} onChange={(value) => update("defaultOpen", value)} />
<Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} /></SectionCard>;
}
