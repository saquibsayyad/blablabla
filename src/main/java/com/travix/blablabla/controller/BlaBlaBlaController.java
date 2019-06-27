package com.travix.blablabla.controller;

import com.travix.blablabla.entity.Tweet;
import com.travix.blablabla.repository.TweetRepository;
import com.travix.blablabla.service.TweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BlaBlaBlaController {

    @Autowired
    TweetService tweetService;

    @Autowired
    TweetRepository tweetRepository;

    @GetMapping("/blablabla/tweets")
    public List<Tweet> findTweets(){
        return tweetRepository.findAllOrOrderByTweetTime();
    }

    @GetMapping("/blablabla/tweets/{affiliate}")
    public List<Tweet> findTweets(@PathVariable String affiliate){
        return tweetRepository.findAllOrOrderByTweetTime(affiliate);
    }
}
