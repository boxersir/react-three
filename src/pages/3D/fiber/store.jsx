/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-05-21 09:25:18
 * @LastEditors: caixin
 * @LastEditTime: 2024-05-21 11:35:14
 * @Description: file content
 */
import create from "zustand";
import clamp from "lodash-es/clamp";
import pingSound from "./ping.mp3";

const ping = new Audio(pingSound);

export const useStore = create((set) => ({
  api: {
    pong(velocity) {
      ping.currentTime = 0;
      ping.volume = clamp(velocity / 20, 0, 1);
      ping.play();
      if (velocity > 4) set((state) => ({ count: state.count + 1 }));
    },
    reset: (welcome) =>
      set((state) => ({ count: welcome ? state.count : 0, welcome })),
  },
  count: 0,
  welcome: true,
}));