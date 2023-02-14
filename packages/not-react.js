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

export function useReducer(reducer, initialState) {
  const thisHook = currentHook++;

  if (!hooks[thisHook]) {
    initialState =
      typeof initialState === "function" ? initialState() : initialState;

    hooks[thisHook] = [initialState, reducer];
  }

  const dispatch = (newState) => {
    const [prevState, reducer] = hooks[thisHook];

    newState = reducer(newState, prevState);

    hooks[thisHook][0] = newState;

    // Avoid infinite rendering when the state is the same.
    if (!Object.is(prevState, newState)) {
      render();
    }
  };

  const [state] = hooks[thisHook];

  return [state, dispatch];
}

export function useState(initialState) {
  const reducer = (newState, prevState) => {
    return typeof newState === "function" ? newState(prevState) : newState;
  };

  return useReducer(reducer, initialState);
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

export function useCallback(callback, deps) {
  return useMemo(() => callback, deps);
}

// TODO: Find a better way to keep track of the current render function,
// so we'll be able to render multiple apps at the same time.
export function setRender(renderFn) {
  render = () => {
    currentHook = 0;

    renderFn();
  };
}
