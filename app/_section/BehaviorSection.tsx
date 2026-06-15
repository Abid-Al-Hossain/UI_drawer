"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Switch from "@/components/shared/input/Switch";
import type { DrawerState } from "../types";

type Props = { state: DrawerState; update: <K extends keyof DrawerState>(key: K, value: DrawerState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Dismiss" subtitle="How the drawer closes.">
        <Switch label="Close on Escape" checked={state.closeOnEscape} onChange={(value) => update("closeOnEscape", value)} />
        <Switch label="Close on outside click" checked={state.closeOnOutside} onChange={(value) => update("closeOnOutside", value)} />
      </SectionCard>
      <SectionCard title="Overlay" subtitle="Overlay and modal behavior.">
        <Switch label="Show overlay" checked={state.showOverlay} onChange={(value) => update("showOverlay", value)} />
        <Switch label="Modal (aria-modal)" checked={state.modal} onChange={(value) => update("modal", value)} />
      </SectionCard>
      <SectionCard title="Focus" subtitle="Focus management when opening and closing.">
        <Switch label="Return focus on close" checked={state.focusReturn} onChange={(value) => update("focusReturn", value)} />
        <Switch label="Scroll lock" checked={state.scrollLock} onChange={(value) => update("scrollLock", value)} />
      </SectionCard>
      <SectionCard title="State" subtitle="Default open and disabled state.">
        <Switch label="Default open" checked={state.defaultOpen ?? state.previewState === "open"} onChange={(value) => update("defaultOpen", value)} />
        <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      </SectionCard>
    </div>
  );
}
