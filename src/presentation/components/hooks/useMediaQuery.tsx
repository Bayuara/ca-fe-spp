import React from "react";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", documentChangeHandler);

    // Set the initial state
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener("change", documentChangeHandler);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
