import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

/**
 * Service for notify and subscribe to events.
 */
@Injectable()
export class MessagingService {
	events: Array<EventMapping<any>> = new Array<EventMapping<any>>();

    /**
     * Notify an event to any subcriber passing a value.
     */
	notify<T>(event: string, value?: T): void {
		const eventMapping = this.events.find((em: EventMapping<T>) => em.event === event);
		if (eventMapping) {
			eventMapping.subject.next(value);
		}
	}

    /**
     * Subscribe to an event passing the function handler.
     */
	subscribe<T>(event: string, handler: ((value: T) => void)): EventSubscription {
		let eventMapping = this.events.find((em: EventMapping<T>) => em.event === event);
		let subscription: Subscription;
		if (!eventMapping) {
			const subject = new Subject();
			eventMapping = new EventMapping(event, subject);
			this.events.push(eventMapping);
			subscription = subject.subscribe(handler);
		} else {
			subscription = eventMapping.subject.subscribe(handler);
		}

		return new EventSubscription(this.events, eventMapping, subscription);
	}
}

export class EventSubscription {
	constructor(private events: Array<EventMapping<any>>, private eventMapping: EventMapping<any>, private subscription: Subscription) { }

	public unsubscribe() {
		this.subscription.unsubscribe();
		if (this.eventMapping.subject.observers.length === 0) {
			const index = this.events.indexOf(this.eventMapping);
			this.events.splice(index, 1);
		}
	}
}

export class EventMapping<T> {
	constructor(public event: string, public subject: Subject<T>) { }
}
