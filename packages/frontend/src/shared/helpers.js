// @ts-check


import {TASK_STATUS} from "./lookups";

export const isTaskPending = (task) => task.STATUS === TASK_STATUS.PENDING.value;
export const isTaskInProgress = (task) => task.STATUS === TASK_STATUS.IN_PROGRESS.value;
export const isTaskCompleted = (task) => task.STATUS === TASK_STATUS.COMPLETED.value;

export function calcTaskCompletionPercent(tasks) {
  if (!tasks || !tasks.length) {
    return 0;
  }

  const totalCompletedTasks =  tasks
    .reduce((totalCompleted, task) =>
        task.STATUS === TASK_STATUS.COMPLETED.value ? totalCompleted + 1 : totalCompleted
      , 0);

  return Math.round((totalCompletedTasks / tasks.length ) * 100);
}

export function completionColor(completion) {
  switch (true) {
    case (completion > 0 && completion <= 25):
      return 'warning';
    case (completion > 25 && completion <= 50):
      return 'orange';
    case (completion > 50 && completion < 100):
      return 'info';
    case (completion === 100):
      return 'success';
  }
}
