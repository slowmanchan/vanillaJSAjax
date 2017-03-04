window.onload = function() {
  var XHR = new XMLHttpRequest();
  var XHR2 = new XMLHttpRequest();
  var info = document.getElementById('info');
  var button = document.getElementById('search');
  var inputMovie = document.getElementById('search-box');
  var inputYear = document.getElementById('search-year');
  var movieTitle = document.getElementById('movie-title');
  var infoBox = document.getElementById('info-box');

  XHR.onreadystatechange = function() {
    if (XHR.readyState === 4) {
      if (XHR.status === 200) {
        var movieData = JSON.parse(XHR.responseText);
        if (movieData.Response == "True") {
          moviePicURL = movieData.Poster;
          createImage(moviePicURL);
          createTable(movieData);
        } else {
          alert('No movie found');
        }
      } else {
        alert('error, no data');
      }
    } else {
      console.log(XHR);
      debugger;
    }
  }

  button.addEventListener('click', function(e){
    e.preventDefault();
    openRequest();
    XHR.send();
  })


  function createImage(moviePicURL) {
    var image = document.createElement('img');
    var oldImage = document.getElementById('movie-pic');

    if (oldImage) {
      oldImage.remove();
    }

    image.src = moviePicURL;
    image.id = 'movie-pic';
    image.style.float = 'left';
    image.style.margin = '40px';
    infoBox.append(image);
  }

  function createTable(movieData) {
    var table = document.createElement('table');
    var oldTable = document.getElementById('movie-data');
    if (oldTable) {
      oldTable.remove();
    }

    table.id = 'movie-data';
    function createRows() {
      for (key in movieData) {
        var tr = document.createElement('tr');
        var tdTitle = document.createElement('td');
        var tdContent = document.createElement('td');

        tdTitle.style.fontWeight = 'bold';
        tdTitle.style.border = 'thin solid black';
        tdTitle.innerHTML = key;
        tdTitle.style.padding = '5px';
        tdContent.innerHTML = movieData[key];
        tdContent.style.border = 'thin solid black';
        tdContent.style.padding = '5px';
        tdContent.style.width = '400px';
        tdContent.style.wordWrap = 'break-word';
        table.style.borderCollapse = 'collapse';
        table.style.tableLayout = 'fixed';
        table.style.width = '600px';
        tr.append(tdTitle);
        tr.append(tdContent);
        table.append(tr);
      }
    }
    createRows();
    infoBox.append(table);
  }

  function openRequest() {
    var movieName = inputMovie.value;
    var movieYear = inputYear.value;

    XHR.open('GET', 'http://www.omdbapi.com/?t=' + movieName + '&y=' + movieYear);
    inputMovie.value = '';
    inputYear.value = '';

  }
}
