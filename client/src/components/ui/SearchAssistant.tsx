import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useDocumentTitle from '~/hooks/useDocumentTitle';
import SunIcon from '../svg/SunIcon';
import store from '~/store';
import { localize } from '~/localization/Translation';
import { useGetStartupConfig } from '@librechat/data-provider';

export const SearchAssistant = () => {
  const { data: config } = useGetStartupConfig();
  const setText = useSetRecoilState(store.text);
  const conversation = useRecoilValue(store.conversation);
  const lang = useRecoilValue<string>(store.lang);
  // @ts-ignore TODO: Fix anti-pattern - requires refactoring conversation store
  const { title = localize(lang, 'com_ui_new_chat') } = conversation || {};

  useDocumentTitle(title);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { innerText } = e.target as HTMLButtonElement;
    const quote = innerText.split('"')[1].trim();
    setText(quote);
  };

  return (
    <div className="w-full px-6 text-gray-800 dark:text-gray-100 md:flex md:max-w-2xl md:flex-col lg:max-w-3xl">
      <h1
        id="landing-title"
        className="mb-10 ml-auto mr-auto mt-6 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mb-16 md:mt-[10vh]"
      >
        {config?.appTitle || 'LibreChat'}
      </h1>
      <div className="items-start gap-3.5 text-center md:flex">
        <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
          <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
            <SunIcon />
            {localize(lang, 'com_ui_examples')}
          </h2>
          <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
            <button
              onClick={clickHandler}
              className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
            >
              &quot;{localize(lang, 'com_ui_example_quantum_computing')}&quot; →
            </button>
            <button
              onClick={clickHandler}
              className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
            >
              &quot;{localize(lang, 'com_ui_example_10_year_old_b_day')}&quot; →
            </button>
            <button
              onClick={clickHandler}
              className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
            >
              &quot;{localize(lang, 'com_ui_example_http_in_js')}&quot; →
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};
