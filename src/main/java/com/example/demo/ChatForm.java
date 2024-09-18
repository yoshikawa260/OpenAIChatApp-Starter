package com.example.demo;

import java.util.List;

public class ChatForm {
    private String message;
    private String answer;
    private List<Chat> chatList;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public List<Chat> getChatList() {
        return chatList;
    }

    public void setChatList(List<Chat> chatList) {
        this.chatList = chatList;
    }

    @Override
    public String toString() {
        return "ChatForm [message=" + message + ", answer=" + answer + ", chatList=" + chatList + "]";
    }

    

}
