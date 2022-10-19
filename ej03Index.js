window.addEventListener('DOMContentLoaded', handleContentLoaded)

function handleContentLoaded () {
  const xhr = new window.XMLHttpRequest()

  xhr.onload = function () {
    const response = xhr.responseText
    const info = JSON.parse(response)

    fillHeadingWithDate(info.fecha)
    fillNumberOfPrograms(info.programas.length)
    fillTableWithPrograms(info.programas)
  }

  xhr.open('GET', './canalDAW.json')
  xhr.send()
}

function fillHeadingWithDate (dateString) {
  const dateSpan = document.getElementById('date')
  const weekDaySpan = document.getElementById('week-day')
  const date = new Date(Date.parse(dateString))

  dateSpan.textContent = date.toLocaleDateString()
  weekDaySpan.textContent = getSpanishWeekDay(date)
}

/**
 * Return a string with the day of the week in Spanish
 * @param {Date} dateObj
 */
function getSpanishWeekDay (dateObj) {
  const weekDateFrom0To6 = dateObj.getDay()
  const weekDayInSpanish = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

  return weekDayInSpanish[weekDateFrom0To6]
}

function fillNumberOfPrograms (numberOfPrograms) {
  const numberOfProgramsSpan = document.getElementById('number-programs')
  numberOfProgramsSpan.textContent = numberOfPrograms
}

function fillTableWithPrograms (programs) {
  const table = document.getElementById('table')
  const fragment = document.createDocumentFragment()

  // Table headers
  const nameTh = document.createElement('th')
  nameTh.textContent = 'Nombre'

  const hourTh = document.createElement('th')
  hourTh.textContent = 'Hora'

  fragment.appendChild(nameTh)
  fragment.appendChild(hourTh)

  // Table content
  for (const program of programs) {
    const tr = document.createElement('tr')
    const nameTd = document.createElement('td')
    const hourTd = document.createElement('td')

    nameTd.textContent = program.nombre
    nameTd.addEventListener('click', e => handleNameClick(program.generos))
    hourTd.textContent = program.hora

    tr.appendChild(nameTd)
    tr.appendChild(hourTd)
    fragment.appendChild(tr)
  }

  table.appendChild(fragment)
}

function handleNameClick (genres) {
  let alertContent = ''

  if (genres.length > 0) {
    for (let i = 0; i < genres.length - 1; i++) {
      alertContent += genres[i] + ' / '
    }

    alertContent += genres[genres.length - 1]
  } else {
    alertContent = 'No se ha especificado ningún género'
  }

  window.alert(alertContent)
}
