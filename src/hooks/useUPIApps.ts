// src/hooks/useUPIApps.ts

import { useState, useCallback } from 'react';
import { UPIConfig, UPIApp } from '../types';
import { UPI_APPS, UPIAppInfo } from '../config/constants';

export interface UPIAppsState {
  availableApps: UPIAppInfo[];
  selectedApp: UPIAppInfo | null;
  upiConfig: UPIConfig | null;
  isSellEnabled: boolean;
  selectApp: (appId: UPIApp) => void;
  saveUPIConfig: (upiId: string, app: UPIApp) => void;
  enableSell: () => void;
  disableSell: () => void;
}

export function useUPIApps(): UPIAppsState {
  const [selectedApp, setSelectedApp] = useState<UPIAppInfo | null>(null);
  const [upiConfig, setUPIConfig] = useState<UPIConfig | null>(null);
  const [isSellEnabled, setIsSellEnabled] = useState(false);

  const selectApp = useCallback((appId: UPIApp) => {
    const app = UPI_APPS.find((a) => a.id === appId) ?? null;
    setSelectedApp(app);
  }, []);

  const saveUPIConfig = useCallback((upiId: string, app: UPIApp) => {
    const config: UPIConfig = { app, upiId, isActive: true };
    setUPIConfig(config);
    const appInfo = UPI_APPS.find((a) => a.id === app) ?? null;
    setSelectedApp(appInfo);
    setIsSellEnabled(true);
  }, []);

  const enableSell = useCallback(() => {
    setIsSellEnabled(true);
  }, []);

  const disableSell = useCallback(() => {
    setIsSellEnabled(false);
    if (upiConfig) {
      setUPIConfig({ ...upiConfig, isActive: false });
    }
  }, [upiConfig]);

  return {
    availableApps: UPI_APPS,
    selectedApp,
    upiConfig,
    isSellEnabled,
    selectApp,
    saveUPIConfig,
    enableSell,
    disableSell,
  };
}
