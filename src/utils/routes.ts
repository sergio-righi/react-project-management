import { EnumModalType } from "utils/enums"

const aliases = {
  backlog: "/backlog",
  board: "/",
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
  project: {
    popup: (id?: string) => {
      return id ? `?modal=${EnumModalType.Project}&id=${id}` : `?modal=${EnumModalType.Project}`
    }
  },
  task: {
    index: ":project?",
    view: ":id",
    popup: (id?: string) => {
      return id ? `?modal=${EnumModalType.Task}&id=${id}` : `?modal=${EnumModalType.Task}`
    }
  }
}

const strings = {
  backlog: aliases.backlog,
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