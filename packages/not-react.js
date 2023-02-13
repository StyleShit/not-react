let hooks = [];
let currentHook = 0;
let render = null;

export function createElement(type, props = {}, ...children) {
  return {
    type,
    props: {
      ...props,
      children: props.children ?? children,
    },
  };
}

export function useState(initialState) {
  const thisHook = currentHook++;

  if (!hooks[thisHook]) {
    hooks[thisHook] =
      typeof initialState === "function" ? initialState() : initialState;
  }

  const state = hooks[thisHook];

  const setState = (newState) => {
    const prevState = hooks[thisHook];

    if (typeof newState === "function") {
      newState = newState(prevState);
    }

    hooks[thisHook] = newState;

    // Avoid infinite rendering when the state is the same.
    if (!Object.is(prevState, newState)) {
      render();
    }
  };

  return [state, setState];
}

export function useEffect(callback, deps) {
  const thisHook = currentHook++;

  const [prevDeps = [], prevCleanup] = hooks[thisHook] ?? [];

  const isFirst = !hooks[thisHook];
  const hasDepsChanged = deps.some((d) => !prevDeps.includes(d));

  const shouldRun = isFirst || hasDepsChanged;

  if (!shouldRun) {
    return;
  }

  if (typeof prevCleanup === "function") {
    prevCleanup();
  }

  const newCleanup = callback();

  hooks[thisHook] = [deps, newCleanup];
}

export function useRef(initialValue) {
  const thisHook = currentHook++;

  const ref = Object.seal({ current: initialValue });

  hooks[thisHook] ??= ref;

  return ref;
}

export function useMemo(factory, deps) {
  const [state, setState] = useState(() => factory());
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    setState(factory());
  }, deps);

  return state;
}

// TODO: Find a better way to keep track of the current render function,
// so we'll be able to render multiple apps at the same time.
export function setRender(renderFn) {
  render = () => {
    currentHook = 0;

    renderFn();
  };
}
