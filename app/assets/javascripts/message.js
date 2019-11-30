$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    image = (message.image.url) ? `<img class= "lower-message__image" src=${message.image.url} >` : ""; //三項演算子を使ってmessage.imageにtrueならHTML要素、faiseなら空の値を代入。
    
      var html =`<div class="message" data-message-id="${message.id}"> 
                      <div class="message__upper-info">
                          <div class="upper-message__user-name">
                            ${message.user_name}
                          </div>
                          <div class="message__upper-info__date">
                            ${message.date}
                          </div>
                        </div>
                        <div class="message__text">
                          <p class="message__text__content">
                            ${message.content}
                          </p>
                          ${image}
                    </div>
                  </div>` //メッセージに画像が含まれる場合のHTMLを作る
  
    return html;
  }
  $("#new_message").on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var insertHTML = '';
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML)
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
        $('#message_content').val('');
        $('input').prop('disabled', false);
      })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
      });
    })
  });