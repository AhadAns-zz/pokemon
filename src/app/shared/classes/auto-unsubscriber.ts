import { OnDestroy, Directive } from '@angular/core';
import { Subscription, ReplaySubject } from 'rxjs';

/**
 * @description
 * This allows you to automatically unsubscribe your subscriptions
 * to avoid memory leaks and bugs
 *
 * HOW TO USE:
 * Your component needs to extend the class AutoUnsubscriber. Each time you make a Subscription
 * you need to register it using the method "registerSubscription".
 * The subscription will be unsubscribed when the component is destroyed.
 *
 * NOTES:
 * You need to call super(); in the constructor of you component or else the code won't compile
 * You may pass multiple subscriptions to the registerSubscription method.
 *
 * WARNING:
 * If your component already has a ngOnDestroy method, you'll have to call super.ngOnDestroy()
 * inside it.
 *
 * EXAMPLE:
 * class MyAwesomeComponent extends AutoUnsubscriber {
 *        myAwesomeMethod() {
 *            this.registerSubscription(
 *                this.myAwesomeService.getSomeInfo().subscribe(infos => { ... }),
 *                this.myAwesomeService.getSomeOtherInfo().subscribe(infos => { ... })
 *            );
 *        }
 *    }
 *
 * You can also use {@link AutoUnsubscriber#destroyed$} with {@link takeUntil}
 *
 * @example
 * takeUntil(this.destroyed$)
 */
@Directive()
export abstract class AutoUnsubscriber implements OnDestroy {
  public readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private readonly _rootSubscription: Subscription = new Subscription();

  public registerSubscription(...subscriptions: Subscription[]): void {
    subscriptions.forEach(
      (subscription: Readonly<Subscription>): Subscription =>
        this._rootSubscription.add(subscription)
    );
  }

  public ngOnDestroy(): void {
    this._rootSubscription.unsubscribe();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
