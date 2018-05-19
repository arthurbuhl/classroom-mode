const mongoose = require('mongoose')

const Student = mongoose.model('Student')
const scraper = require('../helpers/scraper')

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/
  if (email && !re.test(email)) {
    console.log('Email is invalid.')
    return 'Email is invalid.'
  } else if (!email) {
    console.log('Email is required.')
    return 'Email is required.'
  }
}

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndRemove(req.params.studentId)
    res.sendStatus(204)
  } catch (e) {
    console.log(`Error: ${e}`)
  }
}

exports.showStudent = (req, res) => {
  let numStudents = 0
  let numResponsesReceived = 0

  Student.find({})
    .lean()
    .then(students => {
      numStudents = students.length

      if (numStudents === 0) {
        res.status(200).json(students)
      }

      students.map(student => {
        scraper.fetchUserInfoFromFCC(student.username, (_err, fccResults) => {
          student.daysInactive = fccResults.daysInactive

          if (fccResults.completedChallenges) {
            const completedChallengesCount = student.completedChallengesCount
              ? student.completedChallengesCount
              : 0
            student.newSubmissionsCount =
              fccResults.completedChallenges.length - completedChallengesCount
          }

          numResponsesReceived++

          if (numResponsesReceived >= numStudents) {
            res.status(200).json(students)
          }
        })
      })
    })
}

exports.addStudent = (req, res) => {
  const errors = []
  const { name, email, username, notes } = req.body

  if (!name) {
    errors.push('Name is required.')
  }

  if (!username) {
    errors.push('Username is required.')
  }

  const emailValidationError = validateEmail(email)

  if (emailValidationError) {
    errors.push(emailValidationError)
  }

  if (errors.length > 0) {
    res.status(422).json({ errors })
    return
  }

  scraper.fetchUserInfoFromFCC(username, (error, fccResults) => {
    if (!error) {
      const student = new Student({
        name,
        username,
        email,
        notes,
        completedChallengesCount:
          fccResults.completedChallenges &&
          fccResults.completedChallenges.length,
        completedChallenges: fccResults.completedChallenges,
      })
      student.save(err => {
        if (err) {
          console.log('Student saved failed', student)
          res.sendStatus(500)
        }
        console.log(student)
        res.sendStatus(200)
      })
    } else {
      errors.push('freeCodeCamp username is invalid.')
      res.status(422).json({ errors })
    }
  })
}

exports.updateStudent = (req, res) => {
  const errors = []
  const { name, email, username } = req.body

  if (!name) {
    errors.push('Name is required.')
  }

  if (!username) {
    errors.push('Username is required.')
  }

  const emailValidationError = validateEmail(email)

  if (emailValidationError) {
    errors.push(emailValidationError)
  }

  if (errors.length > 0) {
    console.error(errors)
    res.status(422).json({ errors })
    return
  }

  Student.update({ _id: req.body.studentId }, req.body, err => {
    if (err) {
      console.log('Student update failed', req.body)
      res.sendStatus(500)
    }
    res.json(req.body)
  })
}
