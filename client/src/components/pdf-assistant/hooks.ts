import { useEffect, useState } from 'react';

const getQueryStatus = (statusLine: string): string => {
  for (const status of ['error', 'loading']) {
    if (statusLine.includes(status)) {
      return status;
    }
  }

  return 'idle';
};

type TQueryStatusParameters = {
  queries: { status: string }[]; // Queries to get summary status
  onError: () => void; // Action for error status
  onLoading: () => void; // Action for loading status
  onSuccess: () => void; // Action for success status
  errorDelay?: number; // The number of ms after witch the error status will be changed to success status
  loadingDelay?: number; // The number of ms to wait before setting loading status
};
export const useQueryStatus = ({
  queries,
  onError,
  onLoading,
  onSuccess,
  errorDelay = 2000,
  loadingDelay = 500,
}: TQueryStatusParameters) => {
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

  const statusLine = queries.map(({ status }) => status).join(' ');

  useEffect(() => {
    switch (getQueryStatus(statusLine)) {
      case 'loading':
        if (!timer) {
          setTimer(
            setTimeout(() => {
              setTimer(undefined);
              onLoading();
            }, loadingDelay),
          );
        }

        break;

      case 'error':
        clearTimeout(timer);
        setTimer(undefined);
        onError();
        setTimeout(onSuccess, errorDelay);
        break;

      case 'idle':
        clearTimeout(timer);
        setTimer(undefined);
        onSuccess();
        break;
    }
  }, [statusLine]);
};
