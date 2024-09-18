document.addEventListener("DOMContentLoaded", function () {
    var chatForm = document.getElementById("chatForm");
    var messageInput = document.getElementById("message");
    var chatContainer = document.querySelector(".chat-container");

    // CSRFトークンをメタタグから取得
    const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
    const csrfHeaderMeta = document.querySelector('meta[name="csrf-header"]');

    if (!csrfTokenMeta || !csrfHeaderMeta) {
        console.error('CSRF meta tags not found.');
        return;
    }

    const csrfToken = csrfTokenMeta.getAttribute('content');
    const csrfHeader = csrfHeaderMeta.getAttribute('content');

    chatForm.addEventListener("submit", function (event) {
        // フォーム送信を防止
        event.preventDefault();

        const message = messageInput.value;

        // 1. ユーザーの質問をチャットに表示
        const userQuestion = document.createElement("div");
        userQuestion.classList.add("message-container", "question");
        userQuestion.innerHTML = `<p>Q: <span>${message}</span></p>`;
        chatContainer.appendChild(userQuestion);

        // 2. ローディングアニメーション（回答待ち）を表示
        const loadingDiv = document.createElement("div");
        loadingDiv.classList.add("message-container", "answer");
        loadingDiv.innerHTML = `<p>A: <span class="typing-dots"><span></span><span></span><span></span></span></p>`;
        chatContainer.appendChild(loadingDiv);

        // 3. チャットエリアを下にスクロール
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // 4. サーバーにリクエストを送信して回答を取得
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                [csrfHeader]: csrfToken // CSRFトークンをリクエストヘッダーに追加
            },
            body: JSON.stringify({ message: message })
        })
            .then(response => response.json())
            .then(chat => {
                // 5. 回答待ちのアニメーションを消す
                loadingDiv.remove();

                // 6. サーバーからの回答を受け取って表示
                const serverAnswer = document.createElement("div");
                serverAnswer.classList.add("message-container", "answer");

                // Markdown を HTML に変換
                const htmlAnswer = marked.parse(chat.answer);

                serverAnswer.innerHTML = `<p>A: <span>${htmlAnswer}</span></p>`;
                chatContainer.appendChild(serverAnswer);

                // 7. 再度スクロールを下に移動
                chatContainer.scrollTop = chatContainer.scrollHeight;
            })
            .catch(error => {
                console.error('Error:', error);
                loadingDiv.innerHTML = `<p>A: <span>Error loading response.</span></p>`;
            });

        // 8. メッセージ入力欄をクリア
        messageInput.value = "";
    });
});
