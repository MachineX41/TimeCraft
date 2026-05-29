import { useCallback, useState } from 'react'
import Dashboard from './pages/Dashboard'
import { createEmptyProject } from './interfaces/projectSchema'
import {
  loadProjectsFromStorage,
  saveProjectsToStorage,
} from './utils/projectStorage'

export default function App() {
  const [projects, setProjects] = useState(loadProjectsFromStorage)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [deletingProject, setDeletingProject] = useState(null)

  const updateProjects = useCallback((updater) => {
    setProjects((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveProjectsToStorage(next)
      return next
    })
  }, [])

  const openCreateModal = useCallback(() => {
    setEditingProject(null)
    setModalOpen(true)
  }, [])

  const openEditModal = useCallback((project) => {
    setEditingProject(project)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setEditingProject(null)
  }, [])

  const createProject = useCallback(
    (formData) => {
      const newProject = { ...createEmptyProject(), ...formData }
      updateProjects((prev) => [newProject, ...prev])
    },
    [updateProjects],
  )

  const updateProject = useCallback(
    (id, formData) => {
      updateProjects((prev) =>
        prev.map((project) =>
          project.id === id ? { ...project, ...formData } : project,
        ),
      )
    },
    [updateProjects],
  )

  const requestDeleteProject = useCallback(
    (id) => {
      setDeletingProject(projects.find((project) => project.id === id) ?? null)
    },
    [projects],
  )

  const cancelDelete = useCallback(() => {
    setDeletingProject(null)
  }, [])

  const confirmDelete = useCallback(() => {
    if (!deletingProject) return
    updateProjects((prev) =>
      prev.filter((project) => project.id !== deletingProject.id),
    )
    setDeletingProject(null)
  }, [deletingProject, updateProjects])

  const handleSaveProject = useCallback(
    (formData) => {
      if (editingProject) {
        updateProject(editingProject.id, formData)
      } else {
        createProject(formData)
      }
    },
    [editingProject, updateProject, createProject],
  )

  return (
    <Dashboard
      projects={projects}
      modalOpen={modalOpen}
      editingProject={editingProject}
      deletingProject={deletingProject}
      onAddProject={openCreateModal}
      onEditProject={openEditModal}
      onRequestDelete={requestDeleteProject}
      onCancelDelete={cancelDelete}
      onConfirmDelete={confirmDelete}
      onCloseModal={closeModal}
      onSaveProject={handleSaveProject}
    />
  )
}
