import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search
      } : null)

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (!title) {
        return res.writeHead(400).end(JSON.stringify({ error: "Título obrigatório" }))
      }

      if (!description) {
        return res.writeHead(400).end(JSON.stringify({ error: "Descrição obrigatória" }))
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (!title && !description) {
        return res.writeHead(400).end(JSON.stringify({ error: "Título ou descrição obrigatório" }))
      }

      let [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(400).end(JSON.stringify({ error: "Tarefa não encontrada!" }))
      }

      task.title = title ? title : task.title
      
      task.description = description ? description : task.description

      task.updated_at = new Date()

      database.update('tasks', id, task)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params
      
      let [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(400).end(JSON.stringify({ error: "Tarefa não encontrada!" }))
      }

      database.completeTask('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      let [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(400).end(JSON.stringify({ error: "Tarefa não encontrada!" }))
      }

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  }
]