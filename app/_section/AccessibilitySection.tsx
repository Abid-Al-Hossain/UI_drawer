"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Switch from "@/components/shared/input/Switch";
import type { DrawerState } from "../types";

type Props = { state: DrawerState; update: <K extends keyof DrawerState>(key: K, value: DrawerState[K]) => void };

export default function AccessibilitySection({ state, update }: Props) {
  return <SectionCard title="Accessibility" subtitle="Accessibility controls for native drawer generation."><Input label="Accessible label" value={state.ariaLabel} onChange={(value) => update("ariaLabel", value)} />
<Switch label="Focus return" checked={state.focusReturn} onChange={(value) => update("focusReturn", value)} /></SectionCard>;
}
