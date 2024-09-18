package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/chat")
public class ChatController {
    private final OpenAiChatModel chatModel;
    private List<Chat> chatList = new ArrayList<>();

    public ChatController(OpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @GetMapping("")
    public String index() {
        return "index";
    }

    @PostMapping("")
    @ResponseBody
    public Chat answer(@RequestBody ChatForm chatForm) {
        String answer = answer(chatForm.getMessage());
        Chat chat = new Chat();
        chat.setMessage(chatForm.getMessage());
        chat.setAnswer(answer);
        chatList.add(chat);
        return chat;
    }

    private String answer(String message) {
        try{
            return chatModel.call(message);
        }catch(Exception e){
            return "error";
        }
    }

}
