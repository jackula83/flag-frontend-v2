export const tap = <T>(input: T, func: (x: T) => void): T => {
  func(input);
  return input;
}