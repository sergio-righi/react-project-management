import { ITask } from "interfaces";

export class Timeline {
  private task: ITask;

  constructor(task: ITask) {
    this.task = task;
    if (!this.task.timeline) {
      this.task.timeline = {};
    }
  }

  public moveToState(stateId: string): void {
    const currentDate = new Date().toISOString();

    // Calculate duration if previous state exists
    const previousStateId = typeof this.task.state === "string" ? this.task.state : this.task.state._id;
    if (previousStateId && this.task.timeline![previousStateId]) {
      const previousState = this.task.timeline![previousStateId];
      const durationInSeconds = this.calculateDurationInSeconds(new Date(previousState.startDate), new Date(currentDate));
      previousState.duration += durationInSeconds;
    }

    // Move to new state
    if (!this.task.timeline![stateId]) {
      this.task.timeline![stateId] = {
        startDate: currentDate,
        duration: 0
      };
    } else {
      this.task.timeline![stateId].startDate = currentDate;
    }

    // Update the current state of the ticket
    this.task.state = stateId;
  }

  private calculateDurationInSeconds(startDate: Date, endDate: Date): number {
    return (endDate.getTime() - startDate.getTime()) / 1000;
  }

  public formatDuration(seconds: number): string {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${days} day${days !== 1 ? 's' : ''} ${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
  }

  public getTask(): ITask {
    return this.task;
  }
}