import React, { useRef, useState, useEffect } from 'react';

const calculateHeights = (childKeys, refs, currentHeights) => {
  const getHeight = key => {
    if (!refs || !refs.current[key]) {
      return undefined;
    }
    return refs.current[key].offsetHeight;
  };
  const updatedHeights = childKeys
    .map(key => ({ [key]: getHeight(key) || currentHeights[key] }))
    .reduce((l, r) => ({ ...l, ...r }), {});

  const result = { ...currentHeights, ...updatedHeights };
  return result;
};

export const Toasts = ({ children }) => {
  const childKeys = React.Children.map(children, child => child.key);
  const refs = useRef({});
  const [heights, setHeights] = useState({});

  console.log('Toasts render');

  useEffect(() => {
    setHeights(heights => calculateHeights(childKeys, refs, heights));
  }, [childKeys.join(',')]);

  useEffect(() => {
    if (childKeys.length === 0) {
      return undefined;
    }
    const handleResize = () =>
      setHeights(heights => calculateHeights(childKeys, refs, heights));
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [childKeys.join(',')]);

  const onRefUpdate = key => ref => {
    if (!ref) {
      return;
    }
    refs.current[key] = ref;
  };

  return React.Children.map(children, child => (
    <div style={{ height: heights[child.key] }}>
      <div ref={onRefUpdate(child.key)}>{child}</div>
    </div>
  ));
};

export default Toasts;
