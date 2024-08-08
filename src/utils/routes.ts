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
  component: {
    form: (refId: string, id?: string) => {
      return id ? `?modal=${EnumModalType.ComponentForm}&ref_id=${refId}&id=${id}&previous=${EnumModalType.ComponentList}` : `?modal=${EnumModalType.ComponentForm}&ref_id=${refId}&previous=${EnumModalType.ComponentList}`
    },
    list: (id: string) => {
      return `?modal=${EnumModalType.ComponentList}&id=${id}&previous=${EnumModalType.ProjectForm}`
    }
  },
  table: {
    index: ":project?"
  },
  project: {
    form: (id?: string) => {
      return id ? `?modal=${EnumModalType.ProjectForm}&id=${id}` : `?modal=${EnumModalType.ProjectForm}`
    }
  },
  task: {
    index: ":project?",
    view: ":id",
    form: (id?: string) => {
      return id ? `?modal=${EnumModalType.TaskForm}&id=${id}` : `?modal=${EnumModalType.TaskForm}`
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