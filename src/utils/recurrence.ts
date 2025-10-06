import type { Event } from '../types';
import { createLocalDateString } from './dateUtils';

export function expandRecurringEvents(events: Event[], startDate: Date, endDate: Date): Event[] {
  const expanded: Event[] = [];
  
  events.forEach(event => {
    if (!event.isRecurring) {
      // Normales Event ohne Wiederholung
      expanded.push(event);
      return;
    }

    const eventDate = new Date(event.date);
    const recurrenceEndDate = event.recurrenceEnd 
      ? new Date(event.recurrenceEnd) 
      : new Date(endDate.getTime() + 365 * 24 * 60 * 60 * 1000);

    let interval = 0;
    switch (event.recurrenceType) {
      case 'daily': interval = 1; break;
      case 'weekly': interval = 7; break;
      case 'biweekly': interval = 14; break;
      case 'monthly': interval = 30; break; // Vereinfacht
      default: interval = 7;
    }
    
    let currentDate = new Date(eventDate);
    
    while (currentDate <= recurrenceEndDate && currentDate <= endDate) {
      if (currentDate >= startDate) {
        expanded.push({
          ...event,
          date: createLocalDateString(currentDate),
          id: `${event.id}-${currentDate.getTime()}`,
          generatedFromRecurring: true,
          parentId: typeof event.id === 'number' ? event.id : parseInt(String(event.id))
        });
      }
      
      currentDate.setDate(currentDate.getDate() + interval);
    }
  });
  
  return expanded.sort((a, b) => a.date.localeCompare(b.date));
}