import express from 'express';
import { protect } from '../middlewares/auth.js';
import { deleteProject, getProjectCode, getPublishedProjectById, getPublishedProjects, makeRevision, rollbackToVersion, saveProjectCode } from '../Controllers/ProjectController.js';

const projectRouter = express.Router();

projectRouter.post('/revision/:projectId', protect, makeRevision)
projectRouter.put('/save/:projectId', protect, saveProjectCode)
projectRouter.get('/rollback/:projectId/:versionId', protect, rollbackToVersion)
projectRouter.delete('/:projectId', protect, deleteProject)
projectRouter.get('/preview/:projectId', protect, getProjectCode)
projectRouter.get('/published', getPublishedProjects)
projectRouter.get('/published/:projectId', getPublishedProjectById)

export default projectRouter;