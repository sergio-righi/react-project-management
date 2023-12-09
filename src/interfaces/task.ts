export interface JournalType {
  message: string;
  updatedBy: string;
  updatedAt: string;
}

export interface ITask {
  _id: string;
  number: string;
  title: string;
  description: string;
  deadline: string;
  priority: string;
  state: string;
  category: string;
  assignee: string;
  project: string;
  referenceTask: string;
  flow: string;
  environment: string;
  estimatedTime: string;
  createdBy: string;
  createdAt: string;
  journal: JournalType[];
}