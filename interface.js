var notes = new Notes();

function updateText(note) {
  document.getElementById('note').textContent = note.text;
}

function updateList(notes) {
  document.getElementById('note-list').innerHTML = ""
  notes.all().forEach(function(note, index) {
    let listLink = document.createElement('a');
    let listItem = document.createElement('li');
    listLink.href = '#' + index
    getListEmojis(note.shortText(), listLink)
    listItem.appendChild(listLink)
    document.getElementById('note-list').appendChild(listItem)
  })
}

document.getElementById('new-note').onclick = function() {
  console.log('hello')
  // event.preventDefault();
  var myNote = new Note();
  var text = document.getElementById('text').value;
  myNote.addText(text);
  console.log(myNote)
  notes.add(myNote)
  updateList(notes)
  document.getElementById("text").value = "";
}

window.addEventListener("hashchange", function() {
  let id = window.location.hash.split("#")[1];
  console.log(id);
  display(notes.all()[id]);
})

function display(note) {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  console.log(`I am in the display(note) function`)
  var body = note.text
  getModalEmojis(body)
  document.getElementsByClassName("close")[0].onclick = function() {
    modal.style.display = "none";
    history.replaceState(null, null, ' ');
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      history.replaceState(null, null, ' ');
    }
  }
}

function getModalEmojis(body) {
  fetch('https://makers-emojify.herokuapp.com/', {
  method: 'POST',
  body: JSON.stringify({ text: body}),
  headers: {
    'Content-Type': 'application/json',
  },
  })
    .then(
      function(response) {
        response.json().then(function(data) {
          console.log(data);
          document.getElementById("modal-text").innerHTML = data.emojified_text;
        });
      }
    )
  }

  function getListEmojis(body, listLink) {
    fetch('https://makers-emojify.herokuapp.com/', {
    method: 'POST',
    body: JSON.stringify({ text: body}),
    headers: {
      'Content-Type': 'application/json',
    },
    })
      .then(
        function(response) {
          response.json().then(function(data) {
            console.log(data);
            listLink.innerHTML = data.emojified_text;
          });
        }
      )
    }