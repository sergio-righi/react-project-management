import { IFlow, ITask } from "interfaces";

export class Timeline {
  private task: ITask;

  constructor(task: ITask) {
    this.task = task;
    if (!this.task.timeline) {
      this.task.timeline = {};
    }
  }

  public moveToFlow(flow: IFlow): void {
    const currentDate = new Date().toISOString();

    // Calculate duration if previous state exists
    const previousFlowId = typeof this.task.flow === "string" ? this.task.flow : this.task.flow._id;
    if (previousFlowId && this.task.timeline![previousFlowId]) {
      const previousFlow = this.task.timeline![previousFlowId];
      const durationInSeconds = this.calculateDurationInSeconds(new Date(previousFlow.startDate), new Date(currentDate));
      previousFlow.duration += durationInSeconds;
    }

    // Move to new state
    if (!this.task.timeline![flow._id]) {
      this.task.timeline![flow._id] = {
        startDate: currentDate,
        duration: 0
      };
    } else {
      this.task.timeline![flow._id].startDate = currentDate;
    }

    // Update the current state of the ticket
    this.task.flow = flow;
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