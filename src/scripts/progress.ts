export interface ProgressData {
  enabled: boolean;
  consentTimestamp: number | null;
  lastActiveTimestamp: number;
  openedChapters: string[];
  completedChapters: string[];
}

const STORAGE_KEY = 'aerolearn_progress_v1';
const EXPIRY_MS = 12 * 30 * 24 * 60 * 60 * 1000; // ~12 months

export const getProgress = (): ProgressData => {
  if (typeof window === 'undefined') return defaultProgress();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();

    const data: ProgressData = JSON.parse(raw);
    const now = Date.now();

    if (now - data.lastActiveTimestamp > EXPIRY_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return defaultProgress();
    }

    return data;
  } catch (e) {
    return defaultProgress();
  }
};

export const saveProgress = (data: Partial<ProgressData>) => {
  if (typeof window === 'undefined') return;
  const current = getProgress();
  const updated: ProgressData = {
    ...current,
    ...data,
    lastActiveTimestamp: Date.now()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  // Dispatch event for reactive UI updates
  window.dispatchEvent(new CustomEvent('aerolearn:progress-updated', { detail: updated }));
};

export const enableProgress = () => {
  saveProgress({ enabled: true, consentTimestamp: Date.now() });
};

export const markChapterOpened = (chapterId: string) => {
  const p = getProgress();
  if (!p.enabled) return;
  if (!p.openedChapters.includes(chapterId)) {
    saveProgress({ openedChapters: [...p.openedChapters, chapterId] });
  }
};

export const markChapterCompleted = (chapterId: string, completed: boolean = true) => {
  const p = getProgress();
  if (!p.enabled && completed) {
     enableProgress();
  }

  const current = getProgress();
  let updatedCompleted = [...current.completedChapters];

  if (completed && !updatedCompleted.includes(chapterId)) {
    updatedCompleted.push(chapterId);
  } else if (!completed) {
    updatedCompleted = updatedCompleted.filter(id => id !== chapterId);
  }

  saveProgress({ completedChapters: updatedCompleted });
};

export const clearProgress = () => {
  if (typeof window === 'undefined') return;
  const current = getProgress();
  saveProgress({ ...current, openedChapters: [], completedChapters: [] });
};

export const disableProgress = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('aerolearn:progress-updated', { detail: defaultProgress() }));
};

function defaultProgress(): ProgressData {
  return {
    enabled: false,
    consentTimestamp: null,
    lastActiveTimestamp: Date.now(),
    openedChapters: [],
    completedChapters: []
  };
}
