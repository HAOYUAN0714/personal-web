$(document).ready(function(){
  // 箭頭顏色切換動畫效果
  let arrowWhite = true;
  setInterval(function(){
    if (arrowWhite) {
      $('#arrow-down').addClass('arrow-effect-on');
      arrowWhite = false;
    } else {
      $('#arrow-down').removeClass('arrow-effect-on');
      arrowWhite = true;
    }
  }, 1500);

  // 卷軸移動
  $('#home').click(function(e) {
    e.preventDefault();
    $('html,body').animate({ scrollTop: 0 },1000);
  })

  $('.scrollTop').click(function(e) {  // 點擊 錨點選項觸發
    e.preventDefault();
    let target = $(this).attr('href'); // 取得點擊目標自身的屬性 href 的值
    let targetPos = $(target).offset().top; // 取得 目標 錨點所在的卷軸位置高度
    $('html,body').animate({ scrollTop: targetPos -55 },1000); // 讓 body 以1秒的時間移動到目標卷軸位置 ， 55是navbar高再-1
  });

  $(window).scroll(function() { // 當卷軸移動時觸發
    let scrollPos = $(window).scrollTop(); // 取得目前卷軸高度，卷軸越往下滑，值越高
    let windowHeight = $(window).height(); // 取得視窗高度
    let isAbout = false; // 判斷是否已觸發關於我的顯示動畫
    let isSkill = false;
    let isResume = false;
    // let isLevel = false;
    // let isContact = false;
    $('.scrollTop').each(function(){ // 選取所有 錨點選項
      let target = $(this).attr('href');
      let targetPos = $(target).offset().top;
      let targetHeight = $(target).outerHeight(); // 取得 目標錨點 的區塊內容高度 outer代表(含padding)
      if (targetPos -56 <= scrollPos && (targetPos + targetHeight) > scrollPos + 56) {
        // 設置 卷軸移到某錨點區塊範圍內的條件
        // 條件一: 錨點卷軸高度扣除navbar高後 不能比 當前視窗捲軸高度 還高 ，如果 錨點卷軸高度值更多 表示 卷軸還沒到錨點位置(超出的部分為navbar高度)
        // 條件二: 錨點卷軸高度 +  錨點區塊內容高度 需大於 當前視窗捲軸高度+navbar高度 ，如果相反 表示 卷軸已經超過此區塊(扣除navbar高度)了
        $(this).removeClass('active'); // 先解除所有選單效果
        $(this).addClass('active'); // 再把符合條件的選單套入效果
      } else {
        $(this).removeClass('active'); // 當卷軸不在任何區塊範圍內，先將所有選項的效果移除
      }
      // console.log('1',scrollPos + windowHeight,'2',$(document).height());
      // 判斷卷軸是否已經到底部 視窗+卷軸高+1 大於等於 整份網頁高 ， +1 是補誤差
      // 主要是針對ipad pro
      // if (scrollPos + windowHeight + 1 >= $(document).height()) {
      //   $(this).removeClass('active');
      //   $('#toResume').addClass('active');
      // }
      let aboutTop = $('#about').position().top;
      if (aboutTop <= (scrollPos + windowHeight/2 -200) && !isAbout) {
        //  不是要讓卷軸到錨點就產生效果，而是進到錨點後視窗過了一半後 再加上 200 (用減的方式)，且要讓效果在畫面重新整理前只會有一次
        //  條件一: aboutTop <= scrollPos 代表已到錨點位置 在加上在 一半視窗高度 ，然後又經過200
        //  條件二: 還沒啟動效果，如果已啟動就不會再觸發
        isAbout = true;
        $('.about-photo').addClass('about-photo-show');
        $('.contact-hide').removeClass('contact-hide');
        $('.about-content').addClass('about-content-show');
      }
      let skillTop = $('#skill').position().top;
      if (skillTop <= (scrollPos + windowHeight/2 -200 ) && !isSkill) {
        isSkill = true;
        $('.skill-icon-container').removeClass('skill-icon-init');
        $('.skill-content-text').removeClass('skill-text-hide');
      }
      let resumeTop = $('#resume').position().top;
      if (resumeTop <= (scrollPos + windowHeight/2 ) && !isResume) {
        isResume = true;
        // $('.resumes-animate').slideDown(1000);
        $('.resumes-hide').removeClass('resumes-hide');

      }
      // let levelTop = $('#skillLevel').position().top;
      // if (levelTop <= (scrollPos + windowHeight/2 -200 ) && !isLevel) {
      //   isLevel = true;
      //   $('.progress-bar').removeClass('progress-status-init');
      // }
      // let contactTop = $('#contact').position().top;
      // if (contactTop <= (scrollPos + windowHeight/2 -100 ) && !isContact) { // contact靠近footer 要比其他地方早點出現效果
      //   isContact = true;
      //   $('.contact-hide').removeClass('contact-hide');
      //   $('.form-hide').removeClass('form-hide');
      // }
    })
  })


  // skill sectioin
  $('.skill-icon-container').mouseout(function(){
    $(this).addClass('skill-icon-mouseout');
  });

  $('#html-area .skill-icon-container').hover(() => {
    $('#html-area .skillName').addClass('text-html');
  }, () => {
    $('#html-area .skillName').removeClass('text-html');
  });

  $('#boot-area .skill-icon-container').hover(() => {
    $('#boot-area .skillName').addClass('text-boot');
  }, () => {
    $('#boot-area .skillName').removeClass('text-boot');
  });

  $('#js-area .skill-icon-container').hover(() => {
    $('#js-area .skillName').addClass('text-js');
  }, () => {
    $('#js-area .skillName').removeClass('text-js');
  });

  $('#jq-area .skill-icon-container').hover(() => {
    $('#jq-area .skillName').addClass('text-jq');
  }, () => {
    $('#jq-area .skillName').removeClass('text-jq');
  });

  $('#vue-area .skill-icon-container').hover(() => {
    $('#vue-area .skillName').addClass('text-vue');
  }, () => {
    $('#vue-area .skillName').removeClass('text-vue');
  });

  $('#git-area .skill-icon-container').hover(() => {
    $('#git-area .skillName').addClass('text-git');
  }, () => {
    $('#git-area .skillName').removeClass('text-git');
  });


  // contact

  // $('#contact-form').submit((e) => {
  //   e.preventDefault();
  //   let name = $.trim($('#name-contact').val());
  //   let email = $.trim($('#email-contact').val());
  //   let subject = $.trim($('#subject-contact').val());
  //   let content = $.trim($('#textarea-contact').val());
  //   if (name != '' && email != '' && subject != '' && content != '') {
  //     const sendTarget = 'joe82714@gmail.com';
  //     // 在聯絡內容裡結尾加上 寄件姓名與Email  %0A表示跳行
  //     content += `
  //     %0A%0A%0A
  //     From: ${name}%0A
  //     Email: ${email}%0A
  //     主旨: ${subject}%0A
  //     `;
  //     // 傳送程式碼
  //     let send = $('#send-connect'); //隱藏的連結
  //     let href =`mailto:${sendTarget}?subject=${subject}&body=${content}`; // mailto 傳送郵件的網址
  //     send.attr("href",href); // 改變 href 為 傳送郵件的網址
  //     document.querySelector('#send-connect').click(); // 改用 querySelector 觸發連結 ，因為 jquery 選擇器選擇的是jquery物件，觸發click需帶入方法。而querySelector則是DOM物件可以觸發連結
  //   }
  //   else {
  //     $('#contact-modal').modal('show');
  //   }
  // });

});