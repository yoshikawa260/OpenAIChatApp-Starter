package com.example.demo;

public class Chat {
    private String message;
    private String answer;

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

    @Override
    public String toString() {
        return "Chat [message=" + message + ", answer=" + answer + "]";
    }

}
