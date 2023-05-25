/**
 *    ____                  __________
 *   / __ \_   _____  _____/ __/ / __ \_      __
 *  / / / / | / / _ \/ ___/ /_/ / / / / | /| / /
 * / /_/ /| |/ /  __/ /  / __/ / /_/ /| |/ |/ /
 * \____/ |___/\___/_/  /_/ /_/\____/ |__/|__/
 *
 * The copyright indication and this authorization indication shall be
 * recorded in all copies or in important parts of the Software.
 *
 * @author 0verfl0w767
 * @link https://github.com/0verfl0w767
 * @license MIT LICENSE
 *
 */

const fs = require('fs')

const date = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = ('0' + (today.getMonth() + 1)).slice(-2)
  const day = ('0' + today.getDate()).slice(-2)
  return year + '-' + month + '-' + day
}

const time = () => {
  const today = new Date()
  const hours = ('0' + today.getHours()).slice(-2)
  const minutes = ('0' + today.getMinutes()).slice(-2)
  const seconds = ('0' + today.getSeconds()).slice(-2)
  return hours + ':' + minutes + ':' + seconds
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const getResponse = async () => {
  const config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'))
  const response = await fetch(config['url'], config['options'])

  if (!response.ok) {
    response.text().then((text) => {
      throw new Error(text)
    })
  }

  const rawJson = await response.json()

  let newJson = {}

  newJson['time'] = date() + ' ' + time()
  newJson['returnCode'] = rawJson['returnCode']
  const convert = rawJson['data'].map((element) => {
    delete element['num']
    delete element['os']
    delete element['model']
    return element
  })
  newJson['data'] = convert

  fs.writeFile(
    'api.json',
    JSON.stringify(newJson, null, 2),
    //JSON.stringify(JSON.parse(rawJson, null, 2),
    (err) => {
      if (err) {
        console.log(err)
      }
    },
  )

  let busNumbers = newJson['data'].map((element) => {
    return element['name']
  })

  console.log(newJson['time'] + ' / API [ ' + busNumbers.join(', ') + ' ] data loading completed.')
}

setInterval(() => {
  getResponse()
}, 2000)
