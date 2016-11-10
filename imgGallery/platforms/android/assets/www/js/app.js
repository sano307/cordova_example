$(document).ready(function() {
  $('.Main').show();

  $('.mainBtnUpload').click(function() {
    $('.Main').hide();
    $('.Upload').show();
  });

  $('.mainBtnGallery').click(function() {
    $('.Main').hide();
    $('.Gallery').show();
    loadImages();
  });

  /* 이미지 업로드 */
  // 이미지 업로드 버튼
  $('.uploadBtnUpload').click(function() {
    navigator.camera.getPicture(
      function (imageURI) {
        // 카메라를 불러오는데 성공했을 때
        var options = new FileUploadOptions();
        options.filekey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";

        var param = {};
        options.params = param;
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imageURI,
          "http://rico345.co-story.net/publish/ch13/lib/uploadImage.php",
          function (r) {
            var response = r.response;
            var result = JSON && JSON.parse(response) || $.parseJSON(response);

            if (result.result == "success") {
              window.alert('업로드 되었습니다.');
              $('.Upload').hide();
              $('.Gallery').show();
              loadImages();
            } else {
              window.alert('오류가 발생하였습니다.');
            }
          },
          function (error) {
            window.alert('An error has occurred: Code = ' + error.code);
            window.alert('오류가 발생하였습니다.');
          },
          options);
      },
      function (message) {
        window.alert('오류가 발생하였습니다.');
      },
      {
        quality: 40,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      }
    );
  });

  // 취소 버튼
  $('.uploadBtnCancel').click(function() {
    if (window.confirm('업로드를 취소하시겠습니까?')) {
      $('.Upload').hide();
      $('.Main').show();
    }
  });
  /* 이미지 업로드 끝 */

  /* 갤러리 */
  // 갤러리에서 메인으로 가는 버튼
  $('.galleryBtnMain').click(function() {
    $('.Gallery').hide();
    $('.Main').show();
  });

  // 갤러리에서 이미지 업로드 버튼
  $('.galleryBtnUpload').click(function() {
    $('.Gallery').hide();
    $('.Upload').show();
  });
  /* 갤러리 끝 */

  // 현재까지 업로드 된 이미지 불러오기
  var loadImages = function() {
      var target = $('.Images').empty();

        $.ajax({
            url: "http://rico345.co-story.net/publish/ch13/lib/load.php",
            data: {},
            dataType: 'jsonp',
            success: function(data) {
                // 성공
                if(data.result == "success") {
                    var cnt = data.data.length;

                    for(var i = 0; i < cnt; i++) {
                        var imageName = data.data[i].imageName;
                        $('<img />').attr('src', 'http://rico345.co-story.net/publish/ch13/lib/image/'+imageName).appendTo(target);
                    }

                    if(cnt == 0) $('<p></p>').text('업로드된 이미지가 없습니다.').appendTo(target);

                    $('.Gallery > p').text('총 '+ i + '점의 이미지가 업로드되었습니다.');
                } else {
                    window.alert('오류가 발생하였습니다.');
                }
            },
            error: function() {
                window.alert('오류가 발생하였습니다.');
            }
        });
    };
});
