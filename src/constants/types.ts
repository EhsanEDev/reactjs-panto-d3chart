// Define the types
export type SinglePoint = [number, number | null];
export type MultiPoint = [number, (number | null)[]];
export type ChartPoint = SinglePoint | MultiPoint;
