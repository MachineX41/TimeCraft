import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import PageTransition from './components/PageTransition'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import { createEmptyProject } from './interfaces/projectSchema'
import {
  loadProjectsFromStorage,
  saveProjectsToStorage,
} from './utils/projectStorage'

function DashboardApp() {
  const [projects, setProjects] = useState(loadProjectsFromStorage)
  const [modalOpen, setModalOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState('create')
  const [drawerProjectId, setDrawerProjectId] = useState(null)
  const [deletingProject, setDeletingProject] = useState(null)

  const drawerProject = drawerProjectId
    ? (projects.find((project) => project.id === drawerProjectId) ?? null)
    : null

  const updateProjects = useCallback((updater) => {
    setProjects((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveProjectsToStorage(next)
      return next
    })
  }, [])

  const openCreateModal = useCallback(() => {
    setDrawerProjectId(null)
    setDrawerMode('create')
    setModalOpen(true)
  }, [])

  const openDetailModal = useCallback((project) => {
    setDrawerProjectId(project.id)
    setDrawerMode('detail')
    setModalOpen(true)
  }, [])

  const openEditModal = useCallback((project) => {
    setDrawerProjectId(project.id)
    setDrawerMode('edit')
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setDrawerProjectId(null)
    setDrawerMode('create')
  }, [])

  useEffect(() => {
    if (modalOpen && drawerProjectId && !drawerProject) {
      closeModal()
    }
  }, [modalOpen, drawerProjectId, drawerProject, closeModal])

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
    const deletedId = deletingProject.id
    updateProjects((prev) => prev.filter((project) => project.id !== deletedId))
    if (drawerProjectId === deletedId) {
      closeModal()
    }
    setDeletingProject(null)
  }, [deletingProject, drawerProjectId, closeModal, updateProjects])

  const handleSaveProject = useCallback(
    (formData) => {
      if (drawerProjectId) {
        updateProject(drawerProjectId, formData)
      } else {
        createProject(formData)
      }
    },
    [drawerProjectId, updateProject, createProject],
  )

  return (
    <Dashboard
      projects={projects}
      modalOpen={modalOpen}
      drawerMode={drawerMode}
      drawerProject={drawerProject}
      deletingProject={deletingProject}
      onAddProject={openCreateModal}
      onSelectProject={openDetailModal}
      onEditProject={openEditModal}
      onDrawerModeChange={setDrawerMode}
      onRequestDelete={requestDeleteProject}
      onCancelDelete={cancelDelete}
      onConfirmDelete={confirmDelete}
      onCloseModal={closeModal}
      onSaveProject={handleSaveProject}
    />
  )
}

function AppRoutes() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageTransition>
              <DashboardApp />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
