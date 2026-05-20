/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BotStatus = 'running' | 'stopped';

export interface Bot {
  id: string;
  name: string;
  status: BotStatus;
  type: 'music' | 'moderation' | 'ai';
  avatarColor: string; // Tailwind color class for ambient neon glow
  uptime: string;
  latency: number; // in ms
  ramUsage: string; // e.g. "45MB"
  cpuUsage: string; // e.g. "1.2%"
  description: string;
}

export type LogLevel = 'info' | 'warning' | 'error' | 'success';

export interface ConsoleLog {
  id: string;
  timestamp: string;
  botName: string;
  level: LogLevel;
  message: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
}

export type ActiveTab = 'dashboard' | 'bots' | 'settings' | 'docs' | 'pricing';

export interface TutorialStep {
  step: string;
  title: string;
  description: string;
}
