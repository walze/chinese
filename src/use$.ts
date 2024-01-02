import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export default function <T>(o: Observable<T>, init: T) {
  const [state, setState] = useState(init);

  useEffect(() => {
    const sub = o.subscribe((t) => setState(t));
    return () => sub.unsubscribe();
  }, []);

  return state;
}
