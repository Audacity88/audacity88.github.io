export type Palette = 'system' | 'light' | 'dark' | 'mono' | 'ocean';

export interface ShellState {
  palette: Palette;
  lastCommand: string | null;
  activeSection: string | null;
  paletteOpen: boolean;
  commandPaletteOpen: boolean;
  motionPaused: boolean;
}

export interface ShellStateChangeEvent extends CustomEvent {
  detail: Partial<ShellState>;
}

const state: ShellState = {
  palette: 'system',
  lastCommand: null,
  activeSection: null,
  paletteOpen: false,
  commandPaletteOpen: false,
  motionPaused: false,
};

function broadcastStateChange(changes: Partial<ShellState>) {
  Object.assign(state, changes);
  
  const event = new CustomEvent('shell:state-change', {
    detail: changes,
  }) as ShellStateChangeEvent;
  
  document.dispatchEvent(event);
}

export function getShellState(): Readonly<ShellState> {
  return { ...state };
}

export function updatePalette(palette: Palette) {
  broadcastStateChange({ palette });
}

export function setLastCommand(command: string) {
  broadcastStateChange({ lastCommand: command });
}

export function setActiveSection(section: string | null) {
  broadcastStateChange({ activeSection: section });
}

export function setPaletteOpen(open: boolean) {
  broadcastStateChange({ paletteOpen: open });
}

export function setCommandPaletteOpen(open: boolean) {
  const motionPaused = open;
  broadcastStateChange({ commandPaletteOpen: open, motionPaused });
}

export function onShellStateChange(
  handler: (changes: Partial<ShellState>) => void
): () => void {
  const listener = ((event: ShellStateChangeEvent) => {
    handler(event.detail);
  }) as EventListener;
  
  document.addEventListener('shell:state-change', listener);
  
  return () => {
    document.removeEventListener('shell:state-change', listener);
  };
}
