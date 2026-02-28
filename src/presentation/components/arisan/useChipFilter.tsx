import { useMemo } from "react";

export default function useChipFilter<T>(
  value: T,
  displayFn: (item: T[keyof T], key: keyof T) => string
) {
  const chips = useMemo(() => {
    const keys = Object.keys(value as object);

    if (!keys.length) return [];

    return keys
      .map((key) => {
        const item = value[key as keyof T];
        if (!item) return undefined;
        return {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          text: displayFn(item, key as keyof T),
          name: key,
        };
      })
      .filter((item) => item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return chips;
}
