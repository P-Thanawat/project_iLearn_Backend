const express = require('express')
const learnerSkillController = require('../controllers/learnerSkillController')

const learnerSkillRouter = express.Router();

learnerSkillRouter.get('/', learnerSkillController.getAllLearnerSkill)
learnerSkillRouter.get('/:id', learnerSkillController.getLearnerSkillById)
learnerSkillRouter.post('/', learnerSkillController.createLearnerSkill)
learnerSkillRouter.put('/:id', learnerSkillController.updateLearnerSkill)
learnerSkillRouter.delete('/:id', learnerSkillController.deleteLearnerSkill)

module.exports = learnerSkillRouter;