/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  useGetEndpointsQuery,
  useGetPresetsQuery,
  useGetSearchEnabledQuery,
} from '@librechat/data-provider';

import MessageHandler from '../components/MessageHandler';
import MobileNav from '../components/Nav/MobileNav';
import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';
import store from '~/store';
import { useAuthContext } from '~/hooks/AuthContext';
import { useSetRecoilState } from 'recoil';
import { WithPdfViewer } from '../components/pdf-assistant/WithPdfViewer';

export default function Root() {
  const [navVisible, setNavVisible] = useState(() => {
    const savedNavVisible = localStorage.getItem('navVisible');
    return savedNavVisible !== null ? JSON.parse(savedNavVisible) : false;
  });

  const setIsSearchEnabled = useSetRecoilState(store.isSearchEnabled);
  const setEndpointsConfig = useSetRecoilState(store.endpointsConfig);
  const setPresets = useSetRecoilState(store.presets);
  const { user, isAuthenticated } = useAuthContext();

  const searchEnabledQuery = useGetSearchEnabledQuery();
  const endpointsQuery = useGetEndpointsQuery();
  const presetsQuery = useGetPresetsQuery({ enabled: !!user });

  useEffect(() => {
    localStorage.setItem('navVisible', JSON.stringify(navVisible));
  }, [navVisible]);

  useEffect(() => {
    if (endpointsQuery.data) {
      setEndpointsConfig(endpointsQuery.data);
    } else if (endpointsQuery.isError) {
      console.error('Failed to get endpoints', endpointsQuery.error);
    }
  }, [endpointsQuery.data, endpointsQuery.isError]);

  useEffect(() => {
    if (presetsQuery.data) {
      setPresets(presetsQuery.data);
    } else if (presetsQuery.isError) {
      console.error('Failed to get presets', presetsQuery.error);
    }
  }, [presetsQuery.data, presetsQuery.isError]);

  useEffect(() => {
    if (searchEnabledQuery.data) {
      setIsSearchEnabled(searchEnabledQuery.data);
    } else if (searchEnabledQuery.isError) {
      console.error('Failed to get search enabled', searchEnabledQuery.error);
    }
  }, [searchEnabledQuery.data, searchEnabledQuery.isError]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <div className="flex h-screen">
        <Nav navVisible={navVisible} setNavVisible={setNavVisible} />
        <div className="flex h-full w-full flex-1 flex-col bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100">
          <WithPdfViewer userId="1">
            <div className="transition-width relative flex h-full w-full flex-1 flex-col items-stretch overflow-hidden pt-10 md:pt-0">
              <MobileNav setNavVisible={setNavVisible} />
              <Outlet />
            </div>
          </WithPdfViewer>
        </div>
      </div>
      <MessageHandler />
    </>
  );
}
