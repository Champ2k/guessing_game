const Stage = require("../models/stage-model");

createStage = (req, res) => {
  const body = req.body

  if (!body) {
      return res.status(400).json({
          success: false,
          error: 'You must provide a stage',
      })
  }

  const stage = new Stage(body)

  if (!stage) {
      return res.status(400).json({ success: false, error: err })
  }

  stage
      .save()
      .then(() => {
          return res.status(201).json({
              success: true,
              id: stage._id,
              message: 'Stage created!',
          })
      })
      .catch(error => {
          return res.status(400).json({
              error,
              message: 'Stage not created!',
          })
      })
}

getStages = async (req, res) => {
  await Stage.find({}, (err, stages) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!stages.length) {
          return res
              .status(404)
              .json({ success: false, error: `Movie not found` })
      }
      return res.status(200).json({ success: true, data: stages })
  }).catch(err => console.log(err))
}

getStageById = async (req, res) => {
    await Stage.findOne({ _id: req.params.id }, (err, stage) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!stage) {
            return res
                .status(404)
                .json({ success: false, error: `Stage not found` })
        }
        return res.status(200).json({ success: true, data: stage })
    }).catch(err => console.log(err))
}

module.exports = {
    createStage,
    getStages,
    getStageById
}
