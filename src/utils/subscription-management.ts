import { Subscription } from 'rxjs';

export function unsubscribeMany(subs: Subscription[]) {
  if (!subs || subs.length < 0) {
    return
  }
  subs.forEach(sub => sub.unsubscribe())
}