import { createRef, useEffect, useState } from "react";
import { throttle } from 'lodash'

export default function useVisibility(
  offset = 0,
  throttleMilliseconds = 100
){
  const [isVisible, setIsVisible] = useState(false);
  let currentElement = createRef();

  const onScroll = throttle(() => {
    if (!currentElement.current) {
      setIsVisible(false);
      return;
    }
    const top = currentElement.current.getBoundingClientRect().top;
    setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
  }, throttleMilliseconds);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });
  
  return [isVisible, currentElement];
}