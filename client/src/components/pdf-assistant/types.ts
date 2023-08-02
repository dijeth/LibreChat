export const PdfAssistantState = {
  LOADING: 'loading',
  ERROR: 'error',
  IDLE: 'idle',
} as const;

export type TPdfAssistantState = (typeof PdfAssistantState)[keyof typeof PdfAssistantState];
