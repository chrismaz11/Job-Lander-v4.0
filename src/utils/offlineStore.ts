interface QueuedAction {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
  retries: number;
}

export class OfflineStore {
  private queue: QueuedAction[] = [];
  private isOnline = navigator.onLine;
  private maxRetries = 3;

  constructor() {
    this.loadQueue();
    this.setupOnlineListener();
    this.processQueue();
  }

  private setupOnlineListener(): void {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  // Queue action for when online
  queueAction(type: string, payload: any): string {
    const action: QueuedAction = {
      id: crypto.randomUUID(),
      type,
      payload,
      timestamp: Date.now(),
      retries: 0
    };

    this.queue.push(action);
    this.saveQueue();

    if (this.isOnline) {
      this.processQueue();
    }

    return action.id;
  }

  // Process queued actions
  private async processQueue(): Promise<void> {
    if (!this.isOnline || this.queue.length === 0) return;

    const actionsToProcess = [...this.queue];
    
    for (const action of actionsToProcess) {
      try {
        await this.executeAction(action);
        this.removeFromQueue(action.id);
      } catch (error) {
        action.retries++;
        if (action.retries >= this.maxRetries) {
          console.error(`Action ${action.type} failed after ${this.maxRetries} retries:`, error);
          this.removeFromQueue(action.id);
        }
      }
    }

    this.saveQueue();
  }

  private async executeAction(action: QueuedAction): Promise<void> {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    switch (action.type) {
      case 'SAVE_RESUME':
        await fetch(`${apiUrl}/resumes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(action.payload)
        });
        break;
        
      case 'UPDATE_RESUME':
        await fetch(`${apiUrl}/resumes/${action.payload.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(action.payload)
        });
        break;
        
      case 'DELETE_RESUME':
        await fetch(`${apiUrl}/resumes/${action.payload.id}`, {
          method: 'DELETE'
        });
        break;
        
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  private removeFromQueue(id: string): void {
    this.queue = this.queue.filter(action => action.id !== id);
  }

  private saveQueue(): void {
    localStorage.setItem('actionQueue', JSON.stringify(this.queue));
  }

  private loadQueue(): void {
    const saved = localStorage.getItem('actionQueue');
    if (saved) {
      try {
        this.queue = JSON.parse(saved);
      } catch (error) {
        console.error('Failed to load action queue:', error);
        this.queue = [];
      }
    }
  }

  // Get pending actions count
  getPendingCount(): number {
    return this.queue.length;
  }

  // Check if specific action is pending
  isPending(type: string, payload?: any): boolean {
    return this.queue.some(action => 
      action.type === type && 
      (!payload || JSON.stringify(action.payload) === JSON.stringify(payload))
    );
  }

  // Clear all queued actions
  clearQueue(): void {
    this.queue = [];
    this.saveQueue();
  }
}

export const offlineStore = new OfflineStore();
