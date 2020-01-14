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
        stampaDatiTodo();
      },
      'error' : function () {
        alert('errore')
      }
    })
  })

  $(document).on('click', '.fa-edit', function () {

    $(this).addClass('nascondi');
    $(this).siblings('.fa-save').addClass('mostra');
    $(this).siblings('span').addClass('nascondi');
    $(this).siblings('.modificaElemento').addClass('mostra');

  })

  $(document).on('click', '.fa-save', function () {
    var id_todo = $(this).parent().attr('data-todoId');
    var valInput = $(this).siblings('.modificaElemento').val().trim();
    if (valInput.length > 0) {
      $.ajax({
        'url' : 'http://157.230.17.132:3025/todos/' + id_todo,
        'method' : 'PUT',
        'data' : {
          'text' : valInput
        },
        'success' : function (data) {
          stampaDatiTodo()
        },
        'error' : function () {
          alert('errore')
        }
      })
    }
    else {
      stampaDatiTodo()
    }


  })

  function stampaDatiTodo() {

    $.ajax({
      'url' : 'http://157.230.17.132:3025/todos/',
      'method' : 'GET',
      'success' : function (data) {
        $('#container-elementi').empty();
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
