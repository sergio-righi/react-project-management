const aliases = {
  board: "/board",
  table: "/table",
  task: "/tasks",
  projects: "/projects",
  settings: "/settings"
}

const pages = {
  board: {
    index: ":project?"
  },
  table: {
    index: ":project?"
  },
  task: {
    index: ":project?",
    view: ":id"
  }
}

const strings = {
  board: aliases.board,
  projects: aliases.projects,
  table: aliases.table,
  tasks: aliases.task,
  task: aliases.task + pages.task.view,
  settings: aliases.settings
}

/* eslint-disable import/no-anonymous-default-export */
export default {
  aliases: aliases,
  pages: pages,
  strings: strings,
}