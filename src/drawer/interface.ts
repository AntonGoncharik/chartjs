export interface Drawer {
  width: number;
  height: number;
  line(xStart: number, yStart: number, xEnd: number, yEnd: number): void;
  clear(): void;
}

export interface DrawerConfig {
  lineWidth?: number;
}
