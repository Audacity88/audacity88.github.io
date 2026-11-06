export type Palette = 'system' | 'light' | 'dark' | 'mono' | 'ocean';
export type Wallpaper = 'gradient' | 'mountain' | 'ocean' | 'desert' | 'night' | 'minimal';

export interface WindowPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
}

export interface DesktopState {
  wallpaper: Wallpaper;
  dockOrder: string[];
  windows: Record<string, WindowPosition>;
}

export interface ShellState {
  palette: Palette;
  lastCommand: string | null;
  activeSection: string | null;
  paletteOpen: boolean;
  commandPaletteOpen: boolean;
  motionPaused: boolean;
  desktop: DesktopState | null;
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
  desktop: null,
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

export function updateDesktopState(desktop: DesktopState) {
  broadcastStateChange({ desktop });
}

export function getDesktopState(): DesktopState | null {
  return state.desktop ? { ...state.desktop } : null;
}

// Encode desktop state to URL-safe string
export function encodeDesktopState(desktop: DesktopState): string {
  const compact = {
    w: desktop.wallpaper,
    d: desktop.dockOrder,
    o: Object.entries(desktop.windows)
      .filter(([_, win]) => win.isOpen)
      .map(([id, win]) => ({
        i: id,
        x: Math.round(win.x),
        y: Math.round(win.y),
        w: Math.round(win.width),
        h: Math.round(win.height),
        m: win.isMinimized ? 1 : 0,
        M: win.isMaximized ? 1 : 0,
      })),
  };
  
  try {
    const json = JSON.stringify(compact);
    return btoa(json)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch {
    return '';
  }
}

// Decode desktop state from URL-safe string
export function decodeDesktopState(encoded: string): DesktopState | null {
  if (!encoded) return null;
  
  try {
    const base64 = encoded
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const padded = base64 + '=='.substring(0, (4 - base64.length % 4) % 4);
    const json = atob(padded);
    const compact = JSON.parse(json);
    
    if (!compact.w || !Array.isArray(compact.d)) {
      return null;
    }
    
    const windows: Record<string, WindowPosition> = {};
    if (Array.isArray(compact.o)) {
      compact.o.forEach((win: any) => {
        if (win.i && typeof win.x === 'number' && typeof win.y === 'number') {
          windows[win.i] = {
            x: win.x,
            y: win.y,
            width: win.w || 600,
            height: win.h || 500,
            isOpen: true,
            isMinimized: win.m === 1,
            isMaximized: win.M === 1,
          };
        }
      });
    }
    
    return {
      wallpaper: compact.w as Wallpaper,
      dockOrder: compact.d,
      windows,
    };
  } catch {
    return null;
  }
}
