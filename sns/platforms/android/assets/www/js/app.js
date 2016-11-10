$(document).ready(function() {
  $('.Login').show();

  // 로그인 창에서 회원가입 버튼 클릭
  $('.loginBtnJoin').click(function() {
    $('.Login').hide();
    $('.Join').show();
  });

  // 로그인 창에서 로그인 버튼 클릭
  var currentUser = null;
  var isLogin = false;
  $('.loginBtnLogin').click(function() {
    var id = $('.loginID').val();
    var pw = $('.loginPw').val();

    if (!id) {
      alert('아이디를 입력하세요!');
      return false;
    } else if (!pw) {
      alert('비밀번호를 입력하세요!');
      return false;
    }

    isLogin = true;
    $.ajax({
      url: 'https://sano307_test.goorm.io/Cyka/php_ex1/snsApp/lib/login.php',
      data: {
        id: id,
        pw: pw
      },
      dataType: 'jsonp',
      success: function(data) {
        console.log(data);
        if (data.result == "success") {
          alert('로그인 성공!');
          $('.Login').hide();
          $('.Main').show();
          $('.NaviPadding > p').html('안녕하세요, <b>' + id + '</b>님.');
          currentUser = id;
          loadPosts();
        } else if (data.result == "wrong") {
          alert('잘못된 아이디나 비밀번호를 입력하셨습니다.');
        } else {
          alert('오류가 발생하였습니다.');
          console.log('cyka');
        }
        isLogin = false;
      },
      error: function( xhr, status, errorThrown ) {
        alert('오류가 발생하였습니다.');
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
        isLogin = false;
      }
    });
  });

  // 회원가입 창에서 회원가입 버튼 클릭
  var isJoin = false;
  $('.joinBtnJoin').click(function() {
    var id = $('.joinID').val();
    var pw = $('.joinPw').val();
    var pwc = $('.joinPwc').val();

    if (!id) {
      alert('아이디를 입력하세요!');
      return false;
    } else if (!pw) {
      alert('비밀번호를 입력하세요!');
      return false;
    } else if (pw != pwc) {
      alert('비밀번호가 일치하지 않습니다!');
      return false;
    }

    isJoin = true;
    $.ajax({
      url: 'https://sano307_test.goorm.io/Cyka/php_ex1/snsApp/lib/join.php',
      data: {
        id: id,
        pw: pw
      },
      dataType: 'jsonp',
      success: function (data) {
        if (data.result == "success") {
          alert('회원가입 완료! 메인화면으로 돌아갑니다.');
          $('.Join').hide();
          $('.Login').show();
        } else {
          alert('오류가 발생하였습니다.');
        }
        isJoin = false;
      },
      error: function( xhr, status, errorThrown ) {
        alert('오류가 발생하였습니다.');
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
        isJoin = false;
      }
    });
  });

  // 회원가입 창에서 취소 버튼 클릭
  $('.joinBtnCancel').click(function() {
    if (window.confirm('가입을 취소하시겠습니까?')) {
      $('.Join').hide();
      $('.Login').show();
    }
  });

  // 메인 창에서 로그아웃 버튼 클릭
  $('.mainBtnLogout').click(function() {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      currentUser = null;

      $('.Main').hide();
      $('.Login').show();
    }
  });

  // 메인 창에서 글쓰기 버튼 클릭
  $('.mainBtnWrite').click(function() {
    $('.Main').hide();
    $('.Write').show();
  });

  // 클쓰기 창에서 작성하기 버튼 클릭
  var isPostWrite = false;
  $('.writeBtnWrite').click(function() {
    var subject = $('.writeTxtSubject').val();
    var content = $('.writeTxtContent').val();

    if (!subject) {
      alert('제목을 입력해주세요.');
      return false;
    } else if (!content) {
      alert('내용을 입력해주세요.');
      return false;
    }

    $.ajax({
      url: 'https://sano307_test.goorm.io/Cyka/php_ex1/snsApp/lib/writePost.php',
      data: {
        id: currentUser,
        subject: subject,
        content: content
      },
      dataType: 'jsonp',
      success: function(data) {
        if (data.result == "success") {
          alert('포스트 작성에 성공했습니다.');
          $('.Write').hide();
          $('.Main').show();
          loadPosts();
        } else {
          alert('오류가 발생했습니다.');
          return false;
        }
      },
      error: function( xhr, status, errorThrown ) {
        alert('오류가 발생하였습니다.');
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      }
    });
  });

  // 글 쓰기 창에서 작성취소 버튼 클릭
  $('.writeBtnCancel').click(function() {
    if (window.confirm('글 작성을 취소하시겠습니까?')) {
      $('.Write').hide();
      $('.Main').show();
      loadPosts();
    }
  });

  // 포스트 불러오기
  function loadPosts() {
    $('.Items').empty();

    $.ajax({
      url: 'https://sano307_test.goorm.io/Cyka/php_ex1/snsApp/lib/postLoad.php',
      data: {
        id: currentUser
      },
      dataType: 'jsonp',
      success: function(data) {
        console.log(data);
        if (data.result == "success") {
          var cnt = data.data.length;

          for (var iCount = 0; iCount < cnt; iCount++) {
            var id = data.data[iCount].pid;
            var subject = data.data[iCount].psubject;
            var content = data.data[iCount].pcontent;
            var writer = data.data[iCount].pwriter;
            var writedate = data.data[iCount].pwritedate;
            var item = $('<div></div>').attr('data-id', id).addClass('Item');
            var itemText = $('<div></div>').addClass('ItemText').appendTo(item);
            $('<h4></h4>').text(subject).appendTo(itemText);
            $('<h6></h6>').text('작성시간 : ' + writedate).appendTo(itemText);
            $('<p></p>').text(content).appendTo(itemText);

            var itemButtons = $('<div></div>').addClass('ItemButtons').appendTo(itemText);
            $('<button></button>').addClass('mainBtnDel AppBtnRed').text('삭제하기').appendTo(itemButtons);

            var comment = $('<div></div>').addClass('Comment').appendTo(item);
            $('<input />').attr({ type: 'text', placeholder: '댓글입력...' }).addClass('itemTxtComment').appendTo(comment);
            $('<button></button>').addClass('commentBtnWrite AppBtnBlue').text('댓글달기').appendTo(comment);

            $('<div></div>').addClass('Comments').appendTo(comment);
            item.appendTo($('.Items'));

            loadComment(id);
          }
        } else {
          alert('오류가 발생하였습니다.');
          $('.Main').hide();
          $('.Login').show();
        }
      },
      error: function( xhr, status, errorThrown ) {
        alert('오류가 발생하였습니다.');
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      }
    });
  };

  // 댓글 불러오기
  function loadComment(postId) {
    if (!postId) return false;

    var target = $('div.Item[data-id' + postId +'] .Comments');

    $.ajax({
      url: 'https://sano307_test.goorm.io/Cyka/php_ex1/snsApp/lib/commentLoad.php',
      data: {
        postId: postId
      },
      dataType: 'jsonp',
      success: function(data) {
        if (data.result == "success") {
          var cnt = data.data.length;

          for (var iCount = 0; iCount < cnt; iCount++) {
            var id = data.data[iCount].pid;
            var content = data.data[iCount].pcontent;
            var pwritedate = data.data[iCount].pwritedate;
            var pwriter = data.data[iCount].pwriter;

            var commentItem = $('<div></div>').addClass('CommentItem').attr('data-id', id);
            $('<h4></h4>').text(writer).appendTo(commentItem);
            $('<h6></h6>').text('작성시간 : ' + writedate).appendTo(itemText);
            $('<p></p>').text(content).appendTo(commentItem);
            $('<button></button>').addClass('AppBtnRed commentBtnDel').text('삭제').appendTo(commentItem);
            commentItem.appendTo(target);
          }
        } else {
          console.log('cyka');
          alert('오류가 발생했습니다.');
        }
      },
      error: function( xhr, status, errorThrown ) {
        alert('오류가 발생하였습니다.');
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      }
    });
  };

  $(document.body).on('click', '.mainBtnDel', function() {
    if (window.confirm('포스트를 삭제하시겠습니까?')) {
      var id = $(this).parent().parent().parent().attr('data-id');
      var removeTarget = $(this).parent().parent().parent();

      $.ajax({
        url: 'https://sano307_test.goorm.io/Cyka/php_ex1/snsApp/lib/postDel.php',
        data: {
          postId: id
        },
        dataType: 'jsonp',
        success: function(data) {
          console.log(data);
          if(data.result == "success") {
            removeTarget.remove();
          } else {
            window.alert('오류가 발생하였습니다.');
          }
        },
        error: function() {
          window.alert('오류가 발생하였습니다.');
        }
      });
    }
  });

  var isComment = false;
  $(document.body).on('click', '.commentBtnWrite', function() {
      if (isComment) return false;
      var parentId = $(this).parent().parent().attr('data-id');
      var content = $(this).prev().val();
      var comments = $(this).next();

      if (!content) {
        window.alert('댓글을 입력하세요');
        return false;
      }

      isComment = true;

      $.ajax({
        url: 'https://sano307_test.goorm.io/Cyka/php_ex1/snsApp/lib/commentPost.php',
        data: {
          parentId: parentId,
          content: content,
          writer: currentUser
        },
        dataType: 'jsonp',
        success: function(data) {
          if (data.result == "success") {
            var lid = data.lastId;

            var commentItem = $('<div></div>').addClass('CommentItem').attr('data-id', lid);
            $('<h4></h4>').text(currentUser).appendTo(commentItem);
            $('<p></p>').text(content).appendTo(commentItem);
            $('<button></button>').addClass('AppBtnRed commentBtnDel').text('삭제').appendTo(commentItem);
            commentItem.appendTo(comments);
          } else {
            window.alert('오류가 발생하였습니다');
          }

          isComment = false;
        },
        error: function() {
          window.alert('오류가 발생하였습니다');
          isComment = false;
        }
      });
  });

  $(document.body).on('click', '.commentBtnDel', function() {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      var id = $(this).parent().attr('data-id');
      var removeTarget = $(this).parent();

      $.ajax({
        url: 'https://sano307_test.goorm.io/Cyka/php_ex1/snsApp/lib/commentDel.php',
        data: {
          postId: id
        },
        dataType: 'jsonp',
        success: function(data) {
          if (data.result == "success") {
            removeTarget.remove();
          } else {
            window.alert('오류가 발생하였습니다');
          }
        },
        error: function( xhr, status, errorThrown ) {
          alert('오류가 발생하였습니다.');
          console.log( "Error: " + errorThrown );
          console.log( "Status: " + status );
          console.dir( xhr );
        }
      });
    }
  });
});
