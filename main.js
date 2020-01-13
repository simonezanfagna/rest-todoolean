$(document).ready(function () {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);

  stampaDatiTodo();

  $('.bottoneInserisci').click(function () {
    if ($('.inserisciElemento').val().trim().length > 0) {
      $.ajax({
        'url' : 'http://157.230.17.132:3025/todos/',
        'method' : 'POST',
        'data' : {
          'text' : $('.inserisciElemento').val()
        },
        'success' : function () {
          $('#container-elementi').empty();
          stampaDatiTodo();
          $('.inserisciElemento').val('');
        },
        'error' : function () {
            alert('errore')
        }
      })
    }
    else {
      alert('Devi scrivere qualcosa')
    }

  });

  $(document).on('click', '.fa-trash-alt', function () {
    var id_todo = $(this).parent().attr('data-todoId');

    $.ajax({
      'url' : 'http://157.230.17.132:3025/todos/' + id_todo,
      'method' : 'DELETE',
      'success' : function () {
        $('#container-elementi').empty();
        stampaDatiTodo();
      },
      'error' : function () {
        alert('errore')
      }
    })
  })

  function stampaDatiTodo() {
    $.ajax({
      'url' : 'http://157.230.17.132:3025/todos/',
      'method' : 'GET',
      'success' : function (data) {
        for (var i = 0; i < data.length; i++) {
          var context = {
            elemento : data[i].text,
            todoId : data[i].id
          }
          var html = template(context);
          $('#container-elementi').append(html);
        }
      },
      'error' : function () {
        alert('errore')
      }
    })
  }

})
