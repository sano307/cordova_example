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
  function loadImages() {

  };
});
