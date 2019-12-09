$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    image = (message.image) ? `<img class= "message__text__image" src=${message.image} >` : ""; //三項演算子を使ってmessage.imageにtrueならHTML要素、faiseなら空の値を代入。
    
      var html =`<div class="message" data-id="${message.id}"> 
                      <div class="message__upper-info">
                          <div class="upper-message__user-name">
                            ${message.user_name}
                          </div>
                          <div class="message__upper-info__date">
                            ${message.created_at}
                          </div>
                      </div>
                      </div>
                    <div class="message__text">
                      <div class="message__text__content">
                          ${message.content}
                      </div>
                        ${image}
                  </div>
                ` //メッセージに画像が含まれる場合のHTMLを作る
  
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
        $("#new_message")[0].reset();
        $('input').prop('disabled', false);
      })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
      });
    });

    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var reloadMessages = function() {
        //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        last_message_id = $('.message').last().data("id");
        $.ajax({
          //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
          url: 'api/messages',
          //ルーティングで設定した通りhttpメソッドをgetに指定
          type: 'get',
          dataType: 'json',
          //dataオプションでリクエストに値を含める
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          //メッセージが入ったHTMLに、入れ物ごと追加
          $('.messages').append(insertHTML)
            
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
        .fail(function() {
          alert('error');
        });
      };
    };
  setInterval(reloadMessages, 7000);
});