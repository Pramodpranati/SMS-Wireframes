export type EventTarget = 'students' | 'teachers' | 'individuals' | 'whole-school';
export type EventCategory = 'academic' | 'event' | 'training' | 'meeting' | 'holiday';
export type EventPriority = 'low' | 'medium' | 'high';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  target: EventTarget;
  targetIds: string[]; // IDs of specific students, teachers, or groups
  category: EventCategory;
  priority: EventPriority;
  location: string;
  createdBy: string;
  createdAt: Date;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  target: EventTarget;
  targetIds: string[];
  category: EventCategory;
  priority: EventPriority;
  location: string;
}