import useMediaQuery from "./useMediaQuery";

const useIsMobile = () => useMediaQuery("(max-width: 767px)");
const useIsTablet = () =>
  useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");

export { useIsMobile, useIsTablet, useIsDesktop };
